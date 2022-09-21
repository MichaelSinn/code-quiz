/* 
TODO
    - Add top 5 scores to high scores (optional)
    - Add a 0.5s delay after selecting the question before moving to the next one (optional)
    - Have the header container either "High scores" or "Time" but not both
    - Add styling to the page
    - Wireframe
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
const scoreButtonEl = document.getElementById("saveButton");
const highscoreSectionEl = document.getElementById("highscoreSection");
const homeButtonEl = document.getElementById("homeButton");
const highscoresEl = document.getElementById("highscoresAnchor");

let timeRemaining = 60;
let currentQuestion = 0;
let score = 0;
let currentHighScore = JSON.parse(localStorage.getItem("highscore"));

function startTimer(maxTime) {
  timeRemaining = maxTime;
  const timer = setInterval(function () {
    const timerEl = document.getElementById("timer");
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      timeRemaining = 0;
      finishQuiz();
    }
    timerEl.textContent = timeRemaining;
  }, 1000);
}

function startQuiz() {
  clearSections();
  quizSectionEl.setAttribute("style", "display: block");
  score = 0;
  startTimer(60);
  writeQuestion();
}

function finishQuiz() {
  clearSections();
  scoreSectionEl.setAttribute("style", "display: block");
  displayFinalScore();
}

// Need to get the player's initials
function displayFinalScore() {
  const yourScoreEl = document.getElementById("yourScore");
  const highScoreEl = document.getElementById("highscore");
  yourScoreEl.textContent = score;
  if (!currentHighScore || score > currentHighScore.score) {
    highScoreEl.textContent = `${score} NEW HIGH SCORE!`;
  } else {
    highScoreEl.textContent = currentHighScore.score;
  }
}

function clearSections(){
  startSectionEl.setAttribute("style", "display: none");
  scoreSectionEl.setAttribute("style", "display: none");
  quizSectionEl.setAttribute("style", "display: none");
  highscoreSectionEl.setAttribute("style", "display: none");
}

function showHighscore(){
  clearSections();
  highscoreSectionEl.setAttribute("style", "display: block");

  let highscoreEl = document.getElementById("highscore");
  let initialsEl = document.getElementById("highscoreInitials");
  highscoreEl.textContent = currentHighScore.score;
  initialsEl.textContent = currentHighScore.name;
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
    currentQuestion = 0;
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
scoreButtonEl.addEventListener("click", function(e){
  e.preventDefault();
  let player = {
    name: document.getElementById("initials").value,
    score: score
  };
  if (!currentHighScore || score > currentHighScore.score) {
    localStorage.setItem("highscore", JSON.stringify(player));
    currentHighScore = player;
  }
  showHighscore();
});
homeButtonEl.addEventListener("click", function(e){
  e.preventDefault();
  clearSections();
  startSectionEl.setAttribute("style", "display: block");
});

// highscoresEl.addEventListener("click", showHighscore);
