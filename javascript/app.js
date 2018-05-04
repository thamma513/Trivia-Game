
var userPick=0;

var correctAnswer = 0;

var incorrectAnswer = 0;

var unAnswer = 0;

var question = 0;

var count=30;

var skateQuestion = [{

    question: "Which of these skateboarders was the first person to ollie the El Toro High School stairs?",
    possibleAnswers: ["Don Nguyen", "Arto Sari", "Chad Muska", "Jamie Thomas"],
    answer: 0
},
{
    question: "Who invented the ollie?",
    possibleAnswers: ["Alan Gelfand", "Rodney Mullen", "Bob Burnquist", "Tony Hawk"],
    answer: 1
},
{
    question: "Who invented the kickflip?",
    possibleAnswers: ["Arto Sari", "Rodney Mullen", "Jim Greco", "Mark Appleyard"],
    answer:1 
},
{
    question: "What is the name of the Flip video release in 2002?",
    correctAnswer: "Sorry",
    possibleAnswers: ["Really Sorry", "This Is Skateboarding", "Sorry", "In Bloom"],
    answer: 2
},
{
    question: "What member of the skateboarding company Shortys was also featured in Tony Hawks Pro Skater?",
    possibleAnswers: ["Andrew Reynolds", "Mark Appleyard", "Bastien Salabanzi", "Chad Muska"],
    answer:3
}

];

$("#start-button").click(function(){
$(this).hide();
counter = setInterval(timer, 1000); 
displayTrivia();
}); 


function timer(){
count--;
if (count <= 0) {
 clearInterval(counter);
 return;
}

 $("#timer").html("Time remaining: " + "00:" + count + " secs");
}


function displayTrivia() {
$("#questionDiv").html(skateQuestion[0].question);
question++;

  var choicesArr = skateQuestion[0].possibleAnswers;
  var buttonsArr = [];

  for (let i = 0; i < choicesArr.length; i++) {
    var button = $("<button>");
    button.text(choicesArr[i]);
    button.attr("data-id", i);
    $('#choicesDiv').append(button);
   }

  } 

 $('#choicesDiv').on('click', 'button', function(e){
 userPick = $(this).data("id");
 skateQuestion[0].answer;
 if(userPick != skateQuestion[0].answer) {

 $('#choicesDiv').text("Wrong Answer!.");
 incorrectAnswer++;

} else if (userPick === skateQuestion[0].answer) {
$('#choicesDiv').text("Correct!!");
correctAnswer++;

}

});