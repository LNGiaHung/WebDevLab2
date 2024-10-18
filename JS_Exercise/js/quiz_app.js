const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizData.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('mb-4');
        questionElement.innerHTML = `
            <h5>${index + 1}. ${question.question}</h5>
            ${question.options.map((option, optionIndex) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${index}" id="q${index}o${optionIndex}" value="${optionIndex}">
                    <label class="form-check-label" for="q${index}o${optionIndex}">
                        ${option}
                    </label>
                </div>
            `).join('')}
        `;
        quizContainer.appendChild(questionElement);
    });
}

function submitQuiz() {
    score = 0;
    quizData.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (parseInt(selectedOption.value) === question.correctAnswer) {
                score++;
            }
        }
    });

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<h4>Your score: ${score} out of ${quizData.length}</h4>`;

    // Disable submit button after quiz submission
    document.getElementById('submit-btn').disabled = true;
}

// Load the quiz when the page loads
loadQuiz();

// Add event listener to the submit button
document.getElementById('submit-btn').addEventListener('click', submitQuiz);
