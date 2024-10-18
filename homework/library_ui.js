const library = new Library();
let outputDiv = document.getElementById('output');

// Function to set up initial library state
function setupInitialLibraryState() {
    const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 2);
    const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780446310789", 3);
    const book3 = new Book("1984", "George Orwell", "9780451524935", 1);

    library.addBook(book1);
    library.addBook(book2);
    library.addBook(book3);

    const student1 = new Student("Alice");
    const student2 = new Student("Bob");
    const teacher1 = new Teacher("Mr. Smith");
    const teacher2 = new Teacher("Ms. Johnson");

    library.addUser(student1);
    library.addUser(student2);
    library.addUser(teacher1);
    library.addUser(teacher2);

    output("Initial library setup complete.");
    listBooks();
    listUsers();
}

function runLibrarySimulation() {
    setupInitialLibraryState();
    
    try {
        const student = library.users.find(u => u.name === "Alice");
        const book1 = library.books.find(b => b.title === "The Great Gatsby");
        const book2 = library.books.find(b => b.title === "To Kill a Mockingbird");
        const book3 = library.books.find(b => b.title === "1984");

        library.borrowBook(student, book1);
        output("Student borrowed: " + book1.title);
        library.borrowBook(student, book2);
        output("Student borrowed: " + book2.title);
        library.borrowBook(student, book3);
        output("Student borrowed: " + book3.title);
        
        // This should throw an error:
        library.borrowBook(student, book1);
    } catch (error) {
        output("Error: " + error.message);
    }

    output("Available books after student borrowing:");
    listBooks();

    const student = library.users.find(u => u.name === "Alice");
    const book1 = library.books.find(b => b.title === "The Great Gatsby");
    library.returnBook(student, book1);
    output("Student returned: " + book1.title);

    output("Available books after return:");
    listBooks();

    try {
        const teacher = library.users.find(u => u.name === "Mr. Smith");
        const book3 = library.books.find(b => b.title === "1984");
        // This should throw an error:
        library.borrowBook(teacher, book3);
        library.borrowBook(teacher, book3);
    } catch (error) {
        output("Error: " + error.message);
    }

    output("Final available books:");
    listBooks();
}

function addBook() {
    const title = prompt("Enter book title:");
    const author = prompt("Enter book author:");
    const isbn = prompt("Enter book ISBN:");
    const copies = parseInt(prompt("Enter number of copies:"));
    
    const book = new Book(title, author, isbn, copies);
    library.addBook(book);
    output(`Added book: ${title}`);
}

function listBooks() {
    const books = library.listAvailableBooks();
    if (books.length === 0) {
        output("No books available.");
    } else {
        const bookList = books.map(book => `${book.title} (${book.availableCopies} available)`).join(", ");
        output("Available books: " + bookList);
    }
}

function addStudent() {
    const name = prompt("Enter student name:");
    const student = new Student(name);
    library.addUser(student);
    output(`Added student: ${name}`);
}

function addTeacher() {
    const name = prompt("Enter teacher name:");
    const teacher = new Teacher(name);
    library.addUser(teacher);
    output(`Added teacher: ${name}`);
}

function borrowBook() {
    const userName = prompt("Enter user name:");
    const bookTitle = prompt("Enter book title:");
    
    const user = library.users.find(u => u.name === userName);
    const book = library.books.find(b => b.title === bookTitle);
    
    if (!user || !book) {
        output("User or book not found.");
        return;
    }
    
    try {
        library.borrowBook(user, book);
        output(`${userName} borrowed ${bookTitle}`);
        listUsers(); // Add this line
    } catch (error) {
        output("Error: " + error.message);
    }
}

function returnBook() {
    const userName = prompt("Enter user name:");
    const bookTitle = prompt("Enter book title:");
    
    const user = library.users.find(u => u.name === userName);
    const book = library.books.find(b => b.title === bookTitle);
    
    if (!user || !book) {
        output("User or book not found.");
        return;
    }
    
    try {
        library.returnBook(user, book);
        output(`${userName} returned ${bookTitle}`);
        listUsers(); // Add this line
    } catch (error) {
        output("Error: " + error.message);
    }
}

function output(message) {
    outputDiv.innerHTML += message + "<br>";
}

// Add this new function
function listUsers() {
    if (library.users.length === 0) {
        output("No users registered in the library.");
    } else {
        const userList = library.users.map(user => `${user.name} (${user.userType})`).join(", ");
        output("Registered users: " + userList);
        
        // Display borrowed books for each user
        library.users.forEach(user => {
            if (user.borrowedBooks.length > 0) {
                const borrowedBooks = user.borrowedBooks.map(book => book.title).join(", ");
                output(`${user.name}'s borrowed books: ${borrowedBooks}`);
            } else {
                output(`${user.name} has no borrowed books.`);
            }
        });
    }
}

// Call setupInitialLibraryState when the page loads
window.onload = setupInitialLibraryState;
