// need to 
// a) initialize everything, load questions, setup timer
//    but not start it until start quiz button pressed
// b) start loop to ask 10 questions based on JSON file
//    with timeout end, and keep score.
// c) present final score, save score, play again
//
var timeEl = document.querySelector(".txtTime");
var mainEl = document.getElementById("main");
var highScoreEl = document.querySelector(".txtViewHighScore")

    // initialize the display with seconds remaining
var secondsLeft = 5;




function doScoring () {
    // this function does all the scoring stuff
    mainEl.innerHTML = "<P>Your score is X out of 10</P>"

    // later we will add code to accept initials and display 
    // table of saved stuff
}

function startTimer() {
    var timerInterval = setInterval(function () {
        timeEl.textContent = "Time: "+(secondsLeft-1);
        secondsLeft--;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }

    }, 1000);
}

function doMainQuizLoop () {
    mainEl.innerHTML = "<P>Do the main quiz loop</P>";
}


function startQuiz() {
    // remove everything inside mainEl
    mainEl.innerHTML = "";

    // display the "View Highscores link"

    highScoreEl.textContent = "View Highscores" + highScoreEl.textContent
    
    // initialize timer display
    timeEl.textContent = "Time: "+secondsLeft;

    startTimer();

    doMainQuizLoop();
}

function endQuiz() {
    // erase the "view highscore link" and the timer
    timeEl.textContent = "";
    highScoreEl.textContent = "";
    // erase Main
    mainEl.innerHTML = "";

    doScoring();
}

function readyQuiz() {
    // display the initial screen and wait for user to
    // to push the start quiz button
    var txtTitle = document.createElement("h1");
        txtTitle.innerHTML = "Coding Quiz Challenge";
        mainEl.appendChild(txtTitle);

    var txtStart = document.createElement("p");
        txtStart.innerHTML = "Try to answer as many questions as you can";
        mainEl.appendChild(txtStart);

    var btn = document.createElement("BUTTON");   // Create a <button> element
        btn.innerHTML = "Start Quiz";   
        btn.setAttribute('style',"padding:15px")          // Insert text
        btn.setAttribute('onclick',"startQuiz()")
        mainEl.appendChild(btn);  

}

readyQuiz();

//startQuiz();
//startTimer();