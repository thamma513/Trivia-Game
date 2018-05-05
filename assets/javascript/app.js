var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "");

$(document).ready(function () {


    document.addEventListener("load", playMusic());
});


function playMusic() {
    audioElement.play();
}
$(".start-btn").on("click", function(){
    audioElement.pause();
    audioElement.setAttribute("src", "");
    audioElement.setAttribute("src","");
    playMusic();
});

var intervalID;
var audio = document.createElement("audio");
var trivia = {
    rounds: [{
            questions: ["Which of these skateboarders was the first person to ollie the El Toro High School stairs?",
                "What member of the skateboarding company Shortys was also featured in Tony Hawks Pro Skater?",
                "Who invented the kickflip?", "Who invented the ollie?", "What is the name of the Flip video release in 2002?",
            ],
            //round answer options
            options: [{
                    choices: ["Rodney Mullen", "Don Nguyen", "Jamie Thomas", "Chris Cole"]
                }, //question 1 choices
                {
                    choices: ["Rodney Mullen", "Jamie Thomas", "Paul Rodriguez", "Chad Muska"]
                }, //question 2 choices
                {
                    choices: ["Rodney Mullen", "Tony Hawk", "Mike McGill", "Rob Dyrdek"]
                }, //question 3 choices
                {
                    choices: ["Mike McGill", "Tony Alva", "Alan Gelfand", "Kenon Sangalang"]
                },
                {
                    choices: ["Really Sorry", "This is Skateboarding", "In Bloom", "Sorry"]
                },
            ],
            answers: ["Don Nguyen", "Chad Muska", "Rodney Mullen", "Alan Gelfand", "Sorry"],
            answerImages: ["ollie_elToro.gif", "Chad.jpg", "mullen_kickflip.jpg", "ollijpg", "Flip_sorry.jpg"],
            answerAudio: [".mp3", ".mp3", ".mp3"]

        },
        //round 2
        { //Tricks
            questions: ["?",
                "? ",
                "?"
            ],

            options: [{
                    choices: ["", "", "", ""]
                },
                {
                    choices: ["", "", "", ""]
                },
                {
                    choices: ["", "", "", ""]
                }
            ],
            answers: ["", "", ""],
            answerImages: [".jpg", ".jpg", ".jpg"]
        },

    ],
    //set initial values
    currentRound: 0,
    roundTopics: ["Skateboarding Pop Trivia", "Tricks"],
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeRemaining: 30,
}

function clear() {
    $(".round").empty();
    $(".question").empty();
    $(".time-remaining").empty();
    $(".answer-response").empty();
    $(".question-options").empty();
    $(".response-image").empty();
}
//function that links to html
function beginTrivia() {

    //reset rounds to 0
    // trivia.currentRound = 2;
    // trivia.currentQuestion = 2;
    addCss();
    showQuestion();
    $(".jumbotron").fadeOut("slow", function () {});
    $(".trivia-container").fadeTo(2500, 1);

}

function addCss() {
    $(".trivia-container").css("opacity", 0);
    $(".trivia-container").addClass("panel panel-default");
    $(".section-head").addClass("panel-header");
    $(".section-body").addClass("panel-body");
}
$(".start-btn").on("click", function () {
    audioElement.pause();
    audioElement.setAttribute("src", "");

    //set new song clip
    audioElement.setAttribute("src", "mp3");
    playMusic();
});

//function to display question
function showQuestion() {

    $(".round").html("Round " + (trivia.currentRound + 1) + ": " + trivia.roundTopics[trivia.currentRound]);
    $(".question").html(trivia.rounds[trivia.currentRound].questions[trivia.currentQuestion]);
    $(".time-remaining").html("Time Remaining: ");


    for (var i = 0; i < 4; i++) {
        let optionElement = $("<button>");

        optionElement.addClass("btn btn-warning option-btn");
        optionElement.html(trivia.rounds[trivia.currentRound].options[trivia.currentQuestion].choices[i]);
        $(".question-options").append(optionElement)
    }

    intervalID = setInterval(stopWatch, 1000);
}

function stopWatch() {

    let timeLeft = trivia.timeRemaining--;


    if (timeLeft > 0) {
        $(".time-remaining").html("Time Remaining: " + timeLeft);
    } else {
        $(".time-remaining").html("Time is Up!");
        clearInterval(intervalID);
        trivia.incorrectAnswers++;
        let answer = trivia.rounds[trivia.currentRound].answers[trivia.currentQuestion];
        showResponse("Nothing", answer);
    }
}

//USER GUESSES A QUESTION
$(".question-options").on("click", ".option-btn", function () {

    let guess = ($(this).html());
    let answer = trivia.rounds[trivia.currentRound].answers[trivia.currentQuestion];
    let result;

    if (guess === answer) {
        trivia.correctAnswers++;
        result = "correctly";
    } else {
        trivia.incorrectAnswers++;
        result = "incorrectly";
    }
    clearInterval(intervalID);
    showResponse(result, answer);
});

function showResponse(result, answer) {

    if (result === "correctly") {
        $(".answer-response").html("You answered <b style= color:#4CB74C>" + result + "</b>!")
    } else {
        $(".answer-response").html("You answered <b style= color:#B20000>" + result + "</b>! The correct answer was " + answer + ".");
    }


    $(".question-options").empty();

    let answerImage = $("<img>");
    answerImage.addClass("answerImg");

    if (trivia.currentRound === 0) {
        let audioAddress = "audio/" + trivia.rounds[trivia.currentRound].answerAudio[trivia.currentQuestion];
        audio.setAttribute("src", audioAddress);
        audio.play();
    }


    let imageAddress = "" + trivia.rounds[trivia.currentRound].answerImages[trivia.currentQuestion];

    answerImage.attr("src", imageAddress);
    $(".response-image").append(answerImage);

    waitingForNextRound();

}

function waitingForNextRound() {
    trivia.timeRemaining = 5;

    intervalID = setInterval(timeToNextQuestion, 1000);
}

function timeToNextQuestion() {
    let timeLeft = trivia.timeRemaining--;


    if (timeLeft > 0) {
        $(".time-remaining").html("Next question in: " + timeLeft);
    } else {
        clearInterval(intervalID);
        nextQuestion();
    }
}

function nextQuestion() {

    if (trivia.currentQuestion === 4) {
        if (trivia.currentRound === 1) {
            showScores();
            return;
        } else {
            trivia.currentRound++;
            trivia.currentQuestion = 0;
        }
    } else {
        trivia.currentQuestion++;
    }

    reset();
    showQuestion();
}

function reset() {
    $(".response-image").empty();
    $(".answer-response").empty();
    trivia.timeRemaining = 30;

}
var audioEnd = document.createElement("audio");
audioEnd.setAttribute("src", ".mp3");

function showScores() {

    audioEnd.play();


    clear();

    $(".round").html("The Results Are In");
    let correctElement = $("<div>");
    let wrongElement = $("<div>");


    correctElement.html("Correct Answers: " + trivia.correctAnswers);
    wrongElement.html("Wrong Answers: " + trivia.incorrectAnswers);


    let restartButton = $('<button>', {
        class: 'replayBtn',
        on: {
            click: function () {
                replayTrivia();
            }
        }
    });

    if (trivia.incorrectAnswers > 0) {
        restartButton.html("Try Again!");
    } else {
        restartButton.html("Play Again!");
    }

    restartButton.addClass("btn btn-info start-btn");

    $(".question").append(correctElement);
    $(".question").append(wrongElement);
    $(".question-options").append(restartButton);

}

function replayTrivia() {
    trivia.currentQuestion = 0;
    trivia.currentRound = 0;
    trivia.correctAnswers = 0;
    trivia.incorrectAnswers = 0;
    trivia.timeRemaining = 30;

    audioEnd.pause();
    audioEnd.setAttribute("src", "");

    //set new song clip
    audioEnd.setAttribute("src", ".mp3");
    playMusic();

    clear();
    $(".trivia-container").css("opacity", 0);
    $(".trivia-container").fadeTo(2000, 1);
    showQuestion();
}
var trivia = {
    rounds: [{
            questions: ["Which of these skateboarders was the first person to ollie the El Toro High School stairs?",
                "What member of the skateboarding company Shortys was also featured in Tony Hawks Pro Skater?",
                "Who invented the kickflip?", "Who invented the ollie?", "What is the name of the Flip video release in 2002?",
            ],
            //round answer options
            options: [{
                    choices: ["Rodney Mullen", "Don Nguyen", "Jamie Thomas", "Chris Cole"]
                }, //question 1 choices
                {
                    choices: ["Rodney Mullen", "Jamie Thomas", "Paul Rodriguez", "Chad Muska"]
                }, //question 2 choices
                {
                    choices: ["Rodney Mullen", "Tony Hawk", "Mike McGill", "Rob Dyrdek"]
                }, //question 3 choices
                {
                    choices: ["Mike McGill", "Tony Alva", "Alan Gelfand", "Kenon Sangalang"]
                },
                {
                    choices: ["Really Sorry", "This is Skateboarding", "In Bloom", "Sorry"]
                },
            ],
            answers: ["Don Nguyen", "Chad Muska", "Rodney Mullen", "Alan Gelfand", "Sorry"],
            answerImages: ["Trivia-Game/images/ollie_elToro.gif", "Trivia-Game/images/Chad.jpg", "Trivia-Game/images/mullen_kickflip.jpg", "Trivia-Game/images/ollijpg", "Trivia-Game/images/Flip_sorry.jpg"],
            answerAudio: [".mp3", ".mp3", ".mp3"]

        },
        //round 2
        { //Tricks
            questions: ["?",
                "? ",
                "?"
            ],

            options: [{
                    choices: ["", "", "", ""]
                },
                {
                    choices: ["", "", "", ""]
                },
                {
                    choices: ["", "", "", ""]
                }
            ],
            answers: ["", "", ""],
            answerImages: [".jpg", ".jpg", ".jpg"]
        },

    ],
    //set initial values
    currentRound: 0,
    roundTopics: ["Skateboarding Pop Trivia", "Tricks"],
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeRemaining: 30,
}
