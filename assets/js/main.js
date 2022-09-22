const questions = [
  {
    question: "Commonly used data types do NOT include which",
    correctAnswer: "Books",
    answers: ["Books", "Integers", "Strings", "Numbers"].sort(function(){
      return 0.5 - Math.random()
    })
  },
  {
    question: "To be defined, strings must be enclosed by what?",
    correctAnswer: "Quotes",
    answers: ["Quotes", "Brackets", "Curly Brackets", "Integers"].sort(function(){
      return 0.5 - Math.random()
    })
  },
  {
    question: "What do arrays NOT store in JavaScript?",
    correctAnswer: "Mice",
    answers: ["Mice", "Numbers", "Arrays", "Strings"].sort(function(){
      return 0.5 - Math.random()
    })
  },
  {
    question: "This is a useful tool for debugging in JavaScript",
    correctAnswer: "Console.log",
    answers: ["Console.log", "Console.sheep", "Console.stone", "Console.brick"].sort(function(){
      return 0.5 - Math.random()
    })
  },
];

const startButton = document.getElementById("startButton");
const quizSectionEl = document.getElementById("quizSection");
const startSectionEl = document.getElementById("startSection");
const scoreSectionEl = document.getElementById("scoreSection");
const saveButtonEl = document.getElementById("saveButton");
const highscoreSectionEl = document.getElementById("highscoreSection");
const homeButtonEl = document.getElementById("homeButton");
const highscoresEl = document.getElementById("highscoresAnchor");
const highscoreButtonEl = document.getElementById("highscoreButton");

let timeRemaining = 60;
let currentQuestion = 0;
let score = 0;
let currentHighScore = JSON.parse(localStorage.getItem("highscores"));

if (!currentHighScore){
  currentHighScore = {
    scores: []
  };
  localStorage.setItem("highscores", JSON.stringify(currentHighScore));
}

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
  const yourScoreEl = document.getElementById("yourScore");
  clearSections();
  scoreSectionEl.setAttribute("style", "display: flex");
  yourScoreEl.textContent = score;
}

function clearSections(){
  startSectionEl.setAttribute("style", "display: none");
  scoreSectionEl.setAttribute("style", "display: none");
  quizSectionEl.setAttribute("style", "display: none");
  highscoreSectionEl.setAttribute("style", "display: none");
}

function showHighscore(){
  const highscoreListEl = document.getElementById("highscoreList");
  let highscores = JSON.parse(localStorage.getItem("highscores"));
  clearSections();
  highscoreSectionEl.setAttribute("style", "display: flex");
  highscoreListEl.innerHTML = "";

  for (let i = 0; i < highscores.scores.length; i++){
    let highscoreListItem = document.createElement("li");
    highscoreListItem.textContent = `${highscores.scores[i].initials} - ${highscores.scores[i].score}`;
    highscoreListEl.appendChild(highscoreListItem);
  }

  if (highscores.scores.length === 0){
    let highscoreListItem = document.createElement("li");
    highscoreListItem.textContent = "No Highscores yet.";
    highscoreListEl.appendChild(highscoreListItem);
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
highscoreButtonEl.addEventListener("click", showHighscore);

saveButtonEl.addEventListener("click", function(e){
  e.preventDefault();
  let highscores = JSON.parse(localStorage.getItem("highscores"));
  let player = {
    initials: document.getElementById("initials").value,
    score: score
  };
  highscores.scores.push(player);
  highscores.scores.sort(function(a, b){
    return b.score - a.score;
  });
  if (highscores.scores.length >= 6) highscores.scores.pop();
  localStorage.setItem("highscores", JSON.stringify(highscores));
  showHighscore();
});
homeButtonEl.addEventListener("click", function(e){
  e.preventDefault();
  clearSections();
  startSectionEl.setAttribute("style", "display: flex");
});
