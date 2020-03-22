//  questions /done

//  init and greet   /done
//     show startQuiz button that call initAndGreet /done

//  upon "view highscores" button press / done
//  !! do showScores /done
//  display score table     / done
//     + "return to main" + erase high score /done

//  return to main goes back to init and greet /done

//  erase high score erases local storage  /done
//  goto do showScores again /done

//  upon "start quiz" button press /done
//  loop until timer <=0 or end of questions   /done
//    init timer and start timer countdown /done
//    display question /done
//    if wrong answer  /done
//        timer dec penalty /done
//    end 
//        
//  next question

//  upon end loop
//  display score which is number of seconds remaining on the clock
//  display form to add score with miniform

//  do showScore (see !!)

// utility function, implements sleep
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


var myTimer; // global timer variable

arrTrivia = [
    { question:"In the episode 'The Man Trap' what did the creature crave?",
      choices: ["Blood", "Dilithium", "Salt", "Man"],
      answer: "Salt"
    },
    { question: "What is Spock's mother's first name?",
      choices: ["T'Pau", "T'Pol", "Amanda", "Uhura"],
      answer: "Amanda"
    },
    { question: "On what ship does the series take place?",
      choices: ["USS Yorktown", "USS Enterprise", "USS Lexington", "USS Constellation"],
      answer: "USS Enterprise"
    },
    { question: "What is Ensign Chekov's first name?",
      choices: ["Andrei", "Boris", "Vasily", "Pavel"],
      answer: "Pavel"
    },
    { question: "In which episode did the crew encounter Alice and a white rabbit?",
      choices: ["Friday's Child", "Shore Leave", "This Side of Paradise", "The Squire of Gothos"],
      answer: "Shore Leave"
    }
]


//
var timeEl = document.querySelector(".txtTime");
var mainEl = document.getElementById("main");
var highScoreEl = document.querySelector(".txtViewHighScore")

    // initialize the display with seconds remaining
var secondsLeft = 100;
var secondsPenalty = 5;
var curTriviaQuestion = 0;
var globalPadding = "padding: 15px"
var globalMargin = "margin: 25px 20%"

// debug highscore table
// var arrHighScores = [{ name: "KSC",
//                        seconds: 50},
//                      { name: "ABC",
//                        seconds : 40},
//                      { name: "XYZ",
//                        seconds : 30} ]

var arrHighScores = []; // create Global array

function clearMain () {
    mainEl.innerHTML = "";
}

//These are the functions that deal with score table and local storage

// function to actually save the arrHighScores to local storage
function saveHighScores() {
    var myJsonString = JSON.stringify(arrHighScores);
    localStorage.highScores = myJsonString;
    // console.log(myJsonString)
}

//save arrHighScores for testing purposes
//saveHighScores();



// read back the arrHighScores from local storage
function retrieveHighScores() {
    var rawData = localStorage.highScores;
    // console.log(rawData);
    if (rawData != null) {
        var highScoresStored = JSON.parse(rawData);
        // console.log(highScoresStored)
        arrHighScores = [];
        for (var i = 0, len = highScoresStored.length; i< len ; i++) {
            var highScoreSingle = new Object();
            highScoreSingle.name = highScoresStored[i].name;
            highScoreSingle.seconds = highScoresStored[i].seconds;
            arrHighScores.push(highScoreSingle);
//            console.log(highScoreSingle)
        } 
    }
    // console.log(arrHighScores)
}

// display arrHighScores onto Main
function showHighScoreValues () {
    //display high score table
    clearMain();
    mainEl.innerHTML = "<h3>High score table</h3>"
    retrieveHighScores();
    // console.log(arrHighScores);
    
    for (var i = 0; i< arrHighScores.length ; i++) {
        var txtStart = document.createElement("p");
        txtStart.innerHTML = arrHighScores[i].name +" --- "+ arrHighScores[i].seconds;
        mainEl.appendChild(txtStart);
    }
    // also displays 2 buttons: back to initandGreet, or clearHighScore
    // button codes go here
    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = "Back to Main";
    btn.setAttribute('style', globalPadding)          // Insert text
    btn.setAttribute('onclick', "initAndGreet()")
    mainEl.appendChild(btn);

    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = "Reset High Scores";
    btn.setAttribute('style', globalPadding)          // Insert text
    btn.setAttribute('onclick', "clearHighScoreValues()")
    mainEl.appendChild(btn);

}


function addHighScore(name, seconds) {
    retrieveHighScores();
    //add new entry and append it
    var highScoreSingle = new Object();
    highScoreSingle.name = name;
    highScoreSingle.seconds = seconds;
    arrHighScores.push(highScoreSingle);

    // note: just append now, sort later
    saveHighScores();

//    showHighScoreValues();
}

function clearHighScoreValues() {
    localStorage.clear();
    arrHighScores = []; // reset incase the page isn't refreshed
    showHighScoreValues();
}

function doAddHighScore(score) {

    //  must now attach method

    initialsValue = document.getElementById("initials").value;
    if (initialsValue != "") {
        // only if it wasn't left blank
        if (initialsValue.length>3) {
            initialsValue = initialsValue.substring(0,3);
        }
        addHighScore(initialsValue,score);
    }

    showHighScoreValues();

}


function showformAddHighScore(score) {
 //   display the form that adds the latest high score
 
    var txtScore = document.createElement("p");
    txtScore.innerHTML = "Your score is "+score;
    txtScore.setAttribute('style', globalPadding)
    txtScore.setAttribute('style', globalMargin)
    mainEl.appendChild(txtScore);

    var txtStart = document.createElement("p");
    txtStart.innerHTML = "Great job! Enter your initials (max of 3 characters) to save your score ";
    txtStart.innerHTML += "or leave blank to continue without saving."
    txtStart.setAttribute('style', globalPadding)
    txtStart.setAttribute('style', globalMargin)
    mainEl.appendChild(txtStart);

 //   Initials: 
    var txtForm = document.createElement("p");
    txtForm.innerHTML = '<input type="text" name="initials" id="initials" value="" />';
    txtForm.innerHTML += '<input type="button" value="Add" onclick="doAddHighScore('+score+')");" />';
    mainEl.appendChild(txtForm);

}

function displayQuestion () {
    clearMain();
    var curTrivia = arrTrivia[curTriviaQuestion];
    // display current trivia and answers
    //{ question:"In the episode 'The Man Trap' what did the creature crave?",
    //   choices: ["Blood", "Dilithium", "Salt", "Man"],
    //     answer: "Salt"}
    var txtQuestion = document.createElement("h3")

    txtQuestion.innerHTML = curTrivia.question;
    txtQuestion.setAttribute('style', globalPadding)
    txtQuestion.setAttribute('style', globalMargin)
    mainEl.appendChild(txtQuestion);


    var txtDiv = document.createElement("div")
    for (var j = 0; j < curTrivia.choices.length; j++) {
        var btn = document.createElement("BUTTON");   // Create a <button> element
        btn.innerHTML = curTrivia.choices[j];
        btn.setAttribute('style', "padding: 5px")          // Insert text
        btn.setAttribute('onclick', "checkAnswer('"+curTrivia.choices[j]+"')")
        txtDiv.appendChild(btn);
        var br = document.createElement("br")
        txtDiv.appendChild(br)
    }

    mainEl.appendChild(txtDiv);
}

function checkAnswer (myAnswer) {
    var correctAnswer = arrTrivia[curTriviaQuestion].answer;
    var txtResult = document.createElement("h3")

    txtResult.setAttribute('style', globalPadding)
    txtResult.setAttribute('style', globalMargin)
    if (myAnswer!=correctAnswer) {
        // flash error message
        txtResult.innerHTML = "Wrong!";

        // extract penalty
        secondsLeft = secondsLeft - secondsPenalty;
    } else {
        txtResult.innerHTML = "Correct!";

    }
    console.log(txtResult)
    // clearMain();
    mainEl.appendChild(txtResult);
    // alert ("pause")
    // sleep 1 second
    sleep(1000);
    console.log("curTriviaQuestion = "+curTriviaQuestion)
    if (curTriviaQuestion<arrTrivia.length-1) {
        curTriviaQuestion++;
        displayQuestion();
    } else {
        endQuiz();
    }

}

// now the rest of the code... 

function doMainQuizLoop () {
    mainEl.innerHTML = "<P>Do the main quiz loop</P>";
    bQuizEnded = false;
    // initialize timer

    myTimer = setInterval(function () {
        timeEl.textContent = "Time: " + (secondsLeft - 1);
        secondsLeft--;

        if (secondsLeft === 0) {
            // stop timer
            clearInterval(myTimer);
            endQuiz(0);
        }
    }, 1000);

    // placeholder to test getting answer correct
    // var btn = document.createElement("BUTTON");   // Create a <button> element
    // btn.innerHTML = "Win Now";
    // btn.setAttribute('style', globalPadding)          // Insert text
    // btn.setAttribute('onclick', "endQuiz()")
    // mainEl.appendChild(btn);

    displayQuestion();
    // we're done, stop the timer!
    //    endQuiz();
    // stop timer
    //clearInterval(timerInterval);


}


function startQuiz() {
    // remove everything inside mainEl
    clearMain();

    // reset pointers and time to proper values
    curTriviaQuestion = 0;
    secondsLeft = 100;

    // display the "View Highscores link"
    highScoreEl.textContent = "View Highscores" + highScoreEl.textContent;
    
    // initialize timer display
    timeEl.textContent = "Time: "+secondsLeft;
    //startTimer();

    doMainQuizLoop();
}


function endQuiz() {
    //Stop the clock
    clearInterval(myTimer);
    // erase the "view highscore link" and the timer
    timeEl.textContent = "";
    highScoreEl.textContent = "";
    // erase Main
    mainEl.innerHTML = "";
    // reset question pointer to 0
    showformAddHighScore(secondsLeft);
}

function initAndGreet() {

        clearMain();
    // display the initial screen and wait for user to
    // to push the start quiz button
    var txtTitle = document.createElement("h1");
        txtTitle.innerHTML = "'Trekker Knows' Challenge";
        mainEl.appendChild(txtTitle);

    var txtStart = document.createElement("p");
        txtStart.innerHTML = "Answer "+arrTrivia.length+" questions about Star Trek (the Original Series) ";
        txtStart.innerHTML += "as fast as you can. You have "+secondsLeft+" seconds, but every WRONG answer ";
        txtStart.innerHTML += "will cost you "+secondsPenalty+" seconds. Your score is the number of seconds ";
        txtStart.innerHTML += "remaining when you answered all questions.\n";
        txtStart.setAttribute('style',globalPadding)
        txtStart.setAttribute('style',globalMargin)
        mainEl.appendChild(txtStart);

    var btn = document.createElement("BUTTON");   // Create a <button> element
        btn.innerHTML = "Start Quiz";   
        btn.setAttribute('style',globalPadding)          // Insert text
        btn.setAttribute('onclick',"startQuiz()")
        mainEl.appendChild(btn);  

    var btn = document.createElement("BUTTON");   // Create a <button> element
        btn.innerHTML = "Show High Scores";
        btn.setAttribute('style', globalPadding)          // Insert text
        btn.setAttribute('onclick', "showHighScoreValues()")
        mainEl.appendChild(btn);

}





// main loop starts here
    // init and greet
    initAndGreet();


//startQuiz();
//startTimer();