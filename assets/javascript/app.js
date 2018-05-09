$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
    game.showImage();
})

$(document).on('click', '#reset', function () {
    game.reset();
})




var questions = [{
        question: "Which of these skateboarders was the first person to ollie the El Toro High School stairs?",
        answers: ["Rodney Mullen", "Don Nguyen", "Jamie Thomas", "Chris Cole"],
        correctAnswer: "Don Nguyen",
        image: "assets/images/ollie_elToro.gif"
    },
    {
        question: "What member of the skateboarding company Shortys was also featured in Tony Hawks Pro Skater?",
        answers: ["Rodney Mullen", "Jamie Thomas", "Paul Rodriguez", "Chad Muska"],
        correctAnswer: "Chad Muska",
        image: "assets/images/Chad.jpg"
    },
    {
        question: "Who invented the kickflip?",
        answers: ["Rodney Mullen", "Tony Hawk", "Mike McGill", "Rob Dyrdek"],
        correctAnswer: "Rodney Mullen",
        image: "assets/images/mullen_kickflip.jpg"
    },
    {
        question: "Who invented the ollie?",
        answers: ["Alan Gelfand", "Mike Mcgill", "Kenon Sangalang", "Tony Alva"],
        correctAnswer: "Alan Gelfand",
        image: "assets/images/ollie.jpg"

    },
    {
        question: "What is the name of the Flip video release in 2002?",
        answers: ["Really Sorry", "This is Skateboarding", "In Bloom", "Sorry"],
        correctAnswer: "Sorry",
        image: "assets/images/Flip_sorry.jpg"

    }
];
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2>TIME REMAINING <span id='counter'>30</span><h/2>");
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '<h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#subwrapper').append('<button class="answer-button btn btn-info" btn-lg "" id="button-' + i + '"data-name="' + questions[game.currentQuestion].answers[i] + '">' +
                questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    showImage: function (index) {

        console.log(questions);
        var img = $('<img >');
        img.attr("src", questions[index].image);

        $("#image").append(img);
    },
    nextQuestion: function () {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        $("#image").empty();
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>THE CORRECT ANSWER WAS: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        $('#subwrapper').append("<h3>CORRECT: " + game.correct + "</h3>");
        $('#subwrapper').append("<h3>INCORRECT: " + game.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + game.unanswerd + "</h3>")
        $('#subwrapper').append("<button id ='reset'>RESET</button>")
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly(game.currentQuestion);
        } else {
            game.answerdIncorrectly(game.currentQuestion);
        }
    },
    answeredCorrectly: function (index) {
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        game.showImage(index);
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answerdIncorrectly: function (index) {
        console.log("WRONG!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('#subwrapper').append('<h3>THE CORRECT ANSWER WAS: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        game.showImage(index);
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswerd = 0;
        game.loadQuestion();
    }
}