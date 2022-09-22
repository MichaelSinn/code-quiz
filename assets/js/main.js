// Define the questions to be asked in the quiz
const questions = [
  {
    question: "Commonly used data types do NOT include which", // The question that will be asked
    correctAnswer: "Books", // The correct answer
    answers: ["Books", "Integers", "Strings", "Numbers"].sort(function () { // All possible answers
      return 0.5 - Math.random(); // Randomizes the order of the questions each time the page is refreshed
    }),
  },
  {
    question: "To be defined, strings must be enclosed by what?",
    correctAnswer: "Quotes",
    answers: ["Quotes", "Brackets", "Curly Brackets", "Integers"].sort(function () {
        return 0.5 - Math.random();
      }
    ),
  },
  {
    question: "What do arrays NOT store in JavaScript?",
    correctAnswer: "Mice",
    answers: ["Mice", "Numbers", "Arrays", "Strings"].sort(function () {
      return 0.5 - Math.random();
    }),
  },
  {
    question: "This is a useful tool for debugging in JavaScript",
    correctAnswer: "Console.log",
    answers: ["Console.log", "Console.sheep", "Console.stone", "Console.brick",].sort(function () {
      return 0.5 - Math.random();
    }),
  },
];

// Set constants for each of the elements that we will be using in this code
const startButtonEl = document.getElementById("startButton");
const quizSectionEl = document.getElementById("quizSection");
const startSectionEl = document.getElementById("startSection");
const scoreSectionEl = document.getElementById("scoreSection");
const saveButtonEl = document.getElementById("saveButton");
const highscoreSectionEl = document.getElementById("highscoreSection");
const homeButtonEl = document.getElementById("homeButton");
const highscoresEl = document.getElementById("highscoresAnchor");
const highscoreButtonEl = document.getElementById("highscoreButton");
const resultEl = document.getElementById("result"); // Gets the element where the result will be displayed

let timeRemaining = 60; // Set the remaining time in the quiz in seconds
let currentQuestion = 0; // The current question that the quiz is showing
let score = 0; // The players current score
let currentHighScore = JSON.parse(localStorage.getItem("highscores")); // Get the current highscores

// If the highscores are empty then populate the local storage with an empty highscores JSON object
if (!currentHighScore) {
  currentHighScore = {
    scores: [],
  };
  localStorage.setItem("highscores", JSON.stringify(currentHighScore));
}

// Starts the timer
function startTimer(maxTime) {
  timeRemaining = maxTime; // Set the time to the maximum time parameter
  const timer = setInterval(function () {
    const timerEl = document.getElementById("timer");
    timeRemaining--; // Reduce time by 1 second
    if (timeRemaining <= 0) { // If time has run out
      clearInterval(timer); // End the timer
      timeRemaining = 0; // Set the time to 0 incase it has been reduced to a negative number
      finishQuiz(); // Call the finish quiz function
    }
    timerEl.textContent = timeRemaining;
  }, 1000); // Run this function every 1000ms
}

// Starts the quiz
function startQuiz() {
  clearSections(); // Hide all sections
  quizSectionEl.setAttribute("style", "display: block"); // Show the quiz section
  resultEl.textContent = ""; // Reset the last result of the quiz
  score = 0; // Reset the players score
  startTimer(60); // Start the timer
  writeQuestion(); // Write the first question
}

// Finishes the quiz
function finishQuiz() {
  const yourScoreEl = document.getElementById("yourScore"); // Get the element where we will displaying the players score
  clearSections();
  scoreSectionEl.setAttribute("style", "display: flex"); // Show the score section
  yourScoreEl.textContent = score; // Display the score
}

// Hide all sections
function clearSections() {
  startSectionEl.setAttribute("style", "display: none");
  scoreSectionEl.setAttribute("style", "display: none");
  quizSectionEl.setAttribute("style", "display: none");
  highscoreSectionEl.setAttribute("style", "display: none");
}

// Show the highscore page
function showHighscore() {
  const highscoreListEl = document.getElementById("highscoreList"); // Get the highscores list
  let highscores = JSON.parse(localStorage.getItem("highscores")); // Get the most recent highscores
  clearSections();
  highscoreSectionEl.setAttribute("style", "display: flex");
  highscoreListEl.innerHTML = ""; // Reset the highscores list

  // Append each of the highscores in the JSON object to the highscores list as an <li> element
  for (let i = 0; i < highscores.scores.length; i++) {
    let highscoreListItem = document.createElement("li");
    highscoreListItem.textContent = `${highscores.scores[i].initials} - ${highscores.scores[i].score}`; // Format the highscores
    highscoreListEl.appendChild(highscoreListItem); // Append the highscore to the list
  }

  if (highscores.scores.length === 0) { // If there are no high scores yet, tell the user that there are no highscores
    let highscoreListItem = document.createElement("li");
    highscoreListItem.textContent = "No Highscores yet.";
    highscoreListEl.appendChild(highscoreListItem);
  }
}

// Writes a question to the screen
function writeQuestion() {
  const questionEl = document.getElementById("question"); // Get the element for the questions

  if (currentQuestion < questions.length) { // If there are still questions in the quiz
    let questionObj = questions[currentQuestion]; // Set the question object to the current question from the list of questions
    questionEl.textContent = questionObj.question; // Display the question

    const answersEl = document.getElementById("answers"); // Get the answers element
    answersEl.innerHTML = ""; // Reset the list of answers
    // For each possible answer, create a <li> element with the answer on it and append it to the list of answers
    for (let i = 0; i < questionObj.answers.length; i++) {
      let answerEl = document.createElement("li");
      answerEl.textContent = questionObj.answers[i];
      answerEl.addEventListener("click", () => { // Add an event listener that will both check their answer against the correct answer and write the next question when clicked
        selectAnswer(questionObj.answers[i], currentQuestion);
        currentQuestion++;
        writeQuestion();
      });
      answersEl.appendChild(answerEl); // Add the answer to the list of answers
    }
  } else { // There are no questions remaining
    timeRemaining = 0; // Stop the clock in order to end the quiz
    currentQuestion = 0; // Reset the current question in case the player wants to take the quiz again
  }
}

// Checks whether the selected answer is correct or not
function selectAnswer(answer, questionIndex) {
  if (questions[questionIndex].correctAnswer === answer) { // If the answer is correct
    resultEl.textContent = `${answer} - Correct`; // Display the answer is correct
    score++; // Add to the score
  } else {
    resultEl.textContent = `${answer} - Incorrect`; // Display the answer is incorrect
    timeRemaining -= 10; // Remove from the time remaining
  }
}

startButtonEl.addEventListener("click", startQuiz); // Lets the start button call the startQuiz function to start the quiz
highscoreButtonEl.addEventListener("click", showHighscore); // Lets the highscore button call the showHighscore function to show highscores

// Saves the players score and initials to local storage and displays the highscore on click of the save button
saveButtonEl.addEventListener("click", function (e) { 
  e.preventDefault(); // Prevents the default action of a button
  let highscores = JSON.parse(localStorage.getItem("highscores")); // Get the most recent highscores
  let player = { // Define a player object with the initials and score
    initials: document.getElementById("initials").value,
    score: score,
  };
  highscores.scores.push(player); // Add the player object to the list of highscores
  highscores.scores.sort(function (a, b) { // Sort the list of highscores by score
    return b.score - a.score;
  });
  if (highscores.scores.length >= 6) highscores.scores.pop(); // If there are more than 5 highscores, remove the lowest
  localStorage.setItem("highscores", JSON.stringify(highscores)); // Sets the new highscores to local storage
  showHighscore(); // Display the highscores page
});
homeButtonEl.addEventListener("click", function (e) { // Lets the home button return to the home page
  e.preventDefault(); // Stops the default action
  clearSections();
  startSectionEl.setAttribute("style", "display: flex"); // Display the home page
});
