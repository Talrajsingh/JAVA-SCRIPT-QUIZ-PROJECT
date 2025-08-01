const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "Kolkata", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Chennai", correct: false },
    ],
  },
  {
    question: "Who was the first Prime Minister of independent India?",
    answers: [
      { text: "Mahatma Gandhi", correct: false },
      { text: "Subhas Chandra Bose", correct: false },
      { text: "Sardar Patel", correct: false },
      { text: "Jawaharlal Nehru", correct: true },
    ],
  },
  {
    question: "Which is the longest river in India?",
    answers: [
      { text: "Ganga", correct: true },
      { text: "Brahmaputra", correct: false },
      { text: "Yamuna", correct: false },
      { text: "Godavari", correct: false },
    ],
  },
  {
    question: "What is the national animal of India?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Tiger", correct: true },
      { text: "Elephant", correct: false },
      { text: "Leopard", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  resultMessage.textContent =
    score === quizQuestions.length
      ? "Outstanding! "
      : score >= quizQuestions.length / 2
      ? "Well Done! "
      : "Try Again! ";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
