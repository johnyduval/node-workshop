var prompt = require('prompt');

var randomNumber = Math.floor(Math.random() * 100) + 1;

var guess = 0;

function guessNumber() {

    prompt.get(['userNumber'], function(err, result) {

        var userInput = result.userNumber;

        if (randomNumber === userInput) {
            console.log("You have won!");
        }
        else {
            console.log("Of course you lost!");
            guess++;
            if (guess < 5) {
                guessNumber();
            }
        }
    });
}

guessNumber();

/* var i = 0;
while (i < 5) {
    console.log(i);
    i = i + 1;
}

var i = 0;

function manytimes() {
    console.log(i);
    i = i + 1;
    if (i < 5) {
        manytimes();
    }
} */