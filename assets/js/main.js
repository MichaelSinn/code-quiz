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
    currentHighScore = JSON.parse(localStorage.getItem("highscore"));
    if (!currentHighScore || player.score > currentHighScore.score) localStorage.setItem("highscore", JSON.stringify(player));
}

function writeQuestion(){
    let questionEl = document.getElementById("question");
    if (currentQuestion < questions.length){
        questionEl.textContent = questions[currentQuestion].question;
        currentQuestion ++;
    }else {
        displayFinalScore();
    }
}

startButton.addEventListener("click", writeQuestion);
startTimer();
