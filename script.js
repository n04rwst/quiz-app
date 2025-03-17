import { loadQuestions } from "/utils/loadQuestions.js";
import { shuffleArray } from "/utils/shuffleArray.js";

const QUESTIONS_COUNT = 7;

const data = await loadQuestions("/questions.json");

const questionElement = document.querySelector(".question");
const answersContainer = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;
let questions;

function startQuiz() {
    questions = shuffleArray(data).slice(0, QUESTIONS_COUNT);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Дальше";

    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.innerText = answer.text;

        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else selectedButton.classList.add("incorrect");

    Array.from(answersContainer.children).forEach(button => {
       if (button.dataset.correct === "true") button.classList.add("correct");
       button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Ваш счет: ${score} из ${questions.length}!`
    nextButton.innerHTML = "Играть снова";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else showScore();
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }

});

startQuiz();