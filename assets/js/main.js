/* 
TODO
    - Add top 5 scores to high scores
*/

const questions = [
    {question: "Commonly used data types do NOT include which", correctAnswer: "Books", answers: ["Books", "Integers", "Strings", "Numbers"]},
    {question: "To be defined, strings must be enclosed by what?", correctAnswer: "Quotes", answers: ["Quotes", "Brackets", "Curly Brackets", "Integers"]},
    {question: "What do arrays NOT store in JavaScript?", correctAnswer: "Mice", answers: ["Mice", "Numbers", "Arrays", "Strings"]},
    {question: "This is a useful tool for debugging in JavaScript", correctAnswer: "Console.log", answers: ["Console.log", "Console.sheep", "Console.stone", "Console.brick"]}
];

let timeRemaining = 20;
let currentQuestion = 0;
let score = 0;
let startButton = document.getElementById("startButton");
let finished = false;

let quizSectionEl = document.getElementById("quizSection");
let startSectionEl = document.getElementById("startSection");
let scoreSectionEl = document.getElementById("scoreSection");

function startTimer(){
    let timer = setInterval(function (){
        timeRemaining --;
        if (timeRemaining <= 0 || finished){
            timeRemaining = 0;
            finishQuiz();
            clearInterval(timer);
        }
        let timerEl = document.getElementById("timer");
        timerEl.textContent = timeRemaining;
    }, 1000);
}

function startQuiz(){
    quizSectionEl.setAttribute("style", "display: block");
    startSectionEl.setAttribute("style", "display: none");

    startTimer();
    writeQuestion();
}

function finishQuiz(){
    quizSectionEl.setAttribute("style", "display: none");
    scoreSectionEl.setAttribute("style", "display: block");
    finished = true;
    displayFinalScore();
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
    if (!currentHighScore || player.score > currentHighScore.score){
        localStorage.setItem("highscore", JSON.stringify(player));
        highScoreEl.textContent = `${player.score} NEW HIGH SCORE!`;
    }else{
        highScoreEl.textContent = currentHighScore.score;
    }
}

function writeQuestion(){
    let questionEl = document.getElementById("question");
    
    if (currentQuestion < questions.length){
        let questionObj = questions[currentQuestion];
        questionEl.textContent = questionObj.question;

        let answersEl = document.getElementById("answers");
        answersEl.innerHTML = "";
        for (let i = 0; i < questionObj.answers.length; i++){
            let answerEl = document.createElement("li");
            answerEl.textContent = questionObj.answers[i];
            answerEl.addEventListener("click", ()=>{
                selectAnswer(questionObj.answers[i], currentQuestion);
                currentQuestion ++;
                writeQuestion();
            });
            answersEl.appendChild(answerEl);
        }
    }else {
        finishQuiz();
    }
}

function selectAnswer(answer, questionIndex){
    if (questions[questionIndex].correctAnswer === answer){
        score ++;
    }else{
        timeRemaining -= 10;
    }
}

startButton.addEventListener("click", startQuiz);
