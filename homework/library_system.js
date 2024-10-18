// Book Class
class Book {
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    borrowBook() {
        if (this.availableCopies > 0) {
            this.availableCopies--;
            return true;
        }
        return false;
    }

    returnBook() {
        this.availableCopies++;
    }
}

// Abstract User Class
class User {
    constructor(name, userType) {
        if (new.target === User) {
            throw new Error("User class cannot be instantiated directly.");
        }
        this.name = name;
        this.userType = userType;
        this.borrowedBooks = [];
    }

    borrow(book) {
        throw new Error("Method 'borrow()' must be implemented.");
    }

    return(book) {
        const index = this.borrowedBooks.findIndex(b => b.isbn === book.isbn);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
            book.returnBook();
            return true;
        }
        return false;
    }
}

// Student Class
class Student extends User {
    constructor(name) {
        super(name, "Student");
    }

    borrow(book) {
        if (this.borrowedBooks.length < 3 && book.borrowBook()) {
            this.borrowedBooks.push(book);
            return true;
        }
        return false;
    }
}

// Teacher Class
class Teacher extends User {
    constructor(name) {
        super(name, "Teacher");
    }

    borrow(book) {
        if (this.borrowedBooks.length < 5 && book.borrowBook()) {
            this.borrowedBooks.push(book);
            return true;
        }
        return false;
    }
}

// Library Class
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    borrowBook(user, book) {
        if (!this.users.includes(user)) {
            throw new Error("User not registered in the library.");
        }
        if (!this.books.includes(book)) {
            throw new Error("Book not available in the library.");
        }
        if (book.availableCopies === 0) {
            throw new Error("No available copies of this book.");
        }
        if (!user.borrow(book)) {
            throw new Error("User has reached their borrowing limit.");
        }
    }

    returnBook(user, book) {
        if (!user.return(book)) {
            throw new Error("User did not borrow this book from the library.");
        }
    }

    listAvailableBooks() {
        return this.books.filter(book => book.availableCopies > 0);
    }
}