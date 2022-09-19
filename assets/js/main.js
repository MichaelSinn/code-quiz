const questions = [
    {question: "Commonly used data types do NOT include which", correctAnswer: "Books", answers: ["Books", "Integers", "Strings", "Numbers"]},
    {question: "To be defined, strings must be enclosed by what?", correctAnswer: "Quotes", answers: ["Quotes", "Brackets", "Curly Brackets", "Integers"]},
    {question: "What do arrays NOT store in JavaScript?", correctAnswer: "Mice", answers: ["Mice", "Numbers", "Arrays", "Strings"]},
    {question: "________ is a useful tool for debugging in JavaScript", correctAnswer: "Console.log", answers: ["Console.log", "Console.sheep", "Console.stone", "Console.brick"]}
];

let timeRemaining = 60;
let currentQuestion = 0;
let score = 0;
let startButton = document.getElementById("startButton");

function startTimer(){
    let timer = setInterval(function (){
        timeRemaining --;
        if (timeRemaining === 0){
            clearInterval(timer);
        }
        let timerEl = document.getElementById("timer");
        timerEl.textContent = timeRemaining;
    }, 1000);
}

function displayFinalScore(){
    let player = {
        name: "ms",
        score: score
    };
    let yourScoreEl = document.getElementById("yourScore");
    let highScoreEl = document.getElementById("highScore");
    currentHighScore = JSON.parse(localStorage.getItem("highscore"));
    yourScoreEl.textContent = player.score;
    highScoreEl.textContent = currentHighScore.score;
    if (!currentHighScore || player.score > currentHighScore.score){
        localStorage.setItem("highscore", JSON.stringify(player));
        highScoreEl.textContent = `${player.score} NEW HIGH SCORE!`;
    } 
}

function writeQuestion(){
    let questionEl = document.getElementById("question");
    let quizSectionEl = document.getElementById("quizSection");
    let startSectionEl = document.getElementById("startSection");
    quizSectionEl.setAttribute("style", "display: block");
    startSectionEl.setAttribute("style", "display: none");
    if (currentQuestion < questions.length){
        questionEl.textContent = questions[currentQuestion].question;
        currentQuestion ++;
    }else {
        let scoreSectionEl = document.getElementById("scoreSection");
        scoreSectionEl.setAttribute("style", "display: block");
        displayFinalScore();
    }
}

startButton.addEventListener("click", writeQuestion);
//startTimer();
