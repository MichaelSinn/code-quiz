/* 
TODO
    - Add top 5 scores to high scores
*/

const questions = [
  {
    question: "Commonly used data types do NOT include which",
    correctAnswer: "Books",
    answers: ["Books", "Integers", "Strings", "Numbers"],
  },
  {
    question: "To be defined, strings must be enclosed by what?",
    correctAnswer: "Quotes",
    answers: ["Quotes", "Brackets", "Curly Brackets", "Integers"],
  },
  {
    question: "What do arrays NOT store in JavaScript?",
    correctAnswer: "Mice",
    answers: ["Mice", "Numbers", "Arrays", "Strings"],
  },
  {
    question: "This is a useful tool for debugging in JavaScript",
    correctAnswer: "Console.log",
    answers: ["Console.log", "Console.sheep", "Console.stone", "Console.brick"],
  },
];
const startButton = document.getElementById("startButton");
const quizSectionEl = document.getElementById("quizSection");
const startSectionEl = document.getElementById("startSection");
const scoreSectionEl = document.getElementById("scoreSection");

let timeRemaining = 20;
let currentQuestion = 0;
let score = 0;

function startTimer() {
  const timer = setInterval(function () {
    timeRemaining--;
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      finishQuiz();
      clearInterval(timer);
    }
    const timerEl = document.getElementById("timer");
    timerEl.textContent = timeRemaining;
  }, 1000);
}

function startQuiz() {
  quizSectionEl.setAttribute("style", "display: block");
  startSectionEl.setAttribute("style", "display: none");

  score = 0;
  startTimer();
  writeQuestion();
}

function finishQuiz() {
  quizSectionEl.setAttribute("style", "display: none");
  scoreSectionEl.setAttribute("style", "display: block");
  displayFinalScore();
}

function displayFinalScore() {
  let player = {
    name: "ms",
    score: score,
  };
  const yourScoreEl = document.getElementById("yourScore");
  const highScoreEl = document.getElementById("highScore");
  currentHighScore = JSON.parse(localStorage.getItem("highscore"));
  yourScoreEl.textContent = player.score;
  if (!currentHighScore || player.score > currentHighScore.score) {
    localStorage.setItem("highscore", JSON.stringify(player));
    highScoreEl.textContent = `${player.score} NEW HIGH SCORE!`;
  } else {
    highScoreEl.textContent = currentHighScore.score;
  }
}

function writeQuestion() {
  const questionEl = document.getElementById("question");

  if (currentQuestion < questions.length) {
    let questionObj = questions[currentQuestion];
    questionEl.textContent = questionObj.question;

    const answersEl = document.getElementById("answers");
    answersEl.innerHTML = "";
    for (let i = 0; i < questionObj.answers.length; i++) {
      let answerEl = document.createElement("li");
      answerEl.textContent = questionObj.answers[i];
      answerEl.addEventListener("click", () => {
        selectAnswer(questionObj.answers[i], currentQuestion);
        currentQuestion++;
        writeQuestion();
      });
      answersEl.appendChild(answerEl);
    }
  } else {
    timeRemaining = 0;
  }
}

function selectAnswer(answer, questionIndex) {
  let resultEl = document.getElementById("result");
  if (questions[questionIndex].correctAnswer === answer) {
    resultEl.textContent = `${answer} - Correct`;
    score++;
  } else {
    resultEl.textContent = `${answer} - Incorrect`;
    timeRemaining -= 10;
  }
}

startButton.addEventListener("click", startQuiz);
