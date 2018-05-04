var wrongAnswerCount = 0;
var correctAnswerCount = 0;
var questionAnswers = [{
        question: "Which of these skateboarders was the first person to ollie the El Toro High School stairs?",
        correctAnswer: "Don Nguyen",
        possibleAnswers: ["Don Nguyen", "Arto Sari", "Chad Muska", "Jamie Thomas"]
    },
    {
        question: "Who invented the ollie?",
        correctAnswer: "Alan Gelfand",
        possibleAnswers: ["Alan Gelfand", "Rodney Mullen", "Bob Burnquist", "Tony Hawk"]
    },
    {
        question: "Who invented the kickflip?",
        correctAnswers: "Rodney Mullen",
        possibleAnswers: ["Arto Sari", "Rodney Mullen", "Jim Greco", "Mark Appleyard"]
    },
    {
        question: "What is the name of the Flip video release in 2002?",
        correctAnswer: "Sorry",
        possibleAnswers: ["Really Sorry", "This Is Skateboarding", "Sorry", "In Bloom"]
    },
    {
        question: "What member of the skateboarding company Shortys was also featured in Tony Hawks Pro Skater?",
        correctAnswer: "Chad Muska",
        possibleAnswers: ["Andrew Reynolds", "Mark Appleyard", "Bastien Salabanzi", "Chad Muska"]
    }
]
 function displayQuestions() {
    for (var i = 0; i < questionAnswers.length; i++) {
        var question = $("<h2/>").html(questionAnswers[i].question);
        var possibleAnswers = questionAnswers[i].possibleAnswers
        var correctAnswer = questionAnswers[i].correctAnswer
        var questionContainer = $("<div/>");
        questionContainer.addClass("question-con");
        questionContainer.append(question);
        answers = displayAnswers(possibleAnswers, i, correctAnswer);
        $("#content").append(questionContainer);
        $("#content").append(answers);
    }
}
function displayAnswers (possibleAnswers, questionNumber, correctAnswer) {
    var answerContainer = $("<div/>");
    answerContainer.addClass("answer-con");
    for (var i = 0; i < possibleAnswers.length; i++) {
        var input = $("<input type='radio' name='" + questionNumber + "'/>")
        input.attr('data-correct-answer', correctAnswer === possibleAnswers[i])
        var label = ($("<label for=" + questionNumber + ">" + possibleAnswers[i] + "</label>"))
        answerContainer.append(input);
        answerContainer.append(label);
    }
    return answerContainer;
}
var user = {
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    skipedQuestions: 0
}
var timer = 0;
function start() {
    var intervalId = setInterval(incrementTimer, 1000);
    $(".start").on("click", function () {
        displayQuestions();
    });
} function timesup () {
    $(".time-left").append("<h2>Time's Up!</h2>");
    allInputs = $("input:checked")
    for (var i = 0; i < allInputs.length; i++) {
        if (allInputs.attr('data-correct-answer') === "true") {
            correctAnswerCount++
        } else {
            wrongAnswerCount++
        }
    }
    var correct = $("<h2>").html("Correct " + correctAnswerCount)
    var wrong = $("<h2>").html("Wrong " + wrongAnswerCount)
    $(".time-left").append(correct);
    $(".time-left").append(wrong);
}
function incrementTimer () {
    timer++
    $(".time-left").html("Elapsed Time: " + timer);
    if (timer === 100) {
        timesup();
    }
}
function reset () {
    timer = 0;
}
start();