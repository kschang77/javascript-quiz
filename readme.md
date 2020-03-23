# Javascript Quiz

Project "Javascript Quiz" is a quick quiz of up to several questions
that is made through Javascript DOM manipulation. Site is responsive
and will react to different screen widths (within limits). 

## Project Repo

http://github.com/kschang77/javascript-quiz

## Prerequisites

Any Javascript-capable browser

## Installation

No installation required

# Built With

[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Code Snippet

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

## Screenshots

[Title Screen and Start](./Assets/QuizCap01.png)

[One of the Questions](./Assets/QuizCap02.png)


## Potential enhancements

* Random order of questions
* Random order of answers
* Sort High Score Table
* Other cosmetic touches


# Deployed Link

https://kschang77.github.io/javascript-quiz


## Author

**Kasey Chang** 

- [Link to Github](https://github.com/kschang77)
- [Link to LinkedIn](https://www.linkedin.com/in/kasey-chang)


## License

This project is licensed under the MIT License 

## Acknowledgments

* Hat tip to Jerome, Kerwin, Mahi, and the UCBEx Coding Bootcamp March 2020 cohort
