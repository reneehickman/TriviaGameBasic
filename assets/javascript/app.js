window.onload = function () {
    var startButton = $('#startButton');
    startButton.on("click", gamePlay.startTime);
    var playAgainButton = $('#playAgainButton');
    playAgainButton.on('click', gamePlay.restartGame);

};



var triviaQuestions = [{
        question: "A person with an April 13th birthday would have what sign?",
        answerChoices: ["Scorpio", "Pisces", "Aries", "Taurus"],
        correct: 2
    },

    {
        question: "Which of the following keywords would a Gemini most likely use to describe themselves?",
        answerChoices: ["I feel", "I am", "I desire", "I think"],
        correct: 3
    },
    {
        question: "Which of the four elements is Capricorn?",
        answerChoices: ["Air", "Earth", "Water", "Fire"],
        correct: 1
    },
    {
        question: "Which planet is symbolic of our emotional nature?",
        answerChoices: ["Sun", "Mars", "Moon", "Mercury"],
        correct: 2
    },
    {
        question: "The Moon rules which sign of the zodiac?",
        answerChoices: ["Pisces", "Cancer", "Gemini", "Sagittarius"],
        correct: 1
    },
    {
        question: "How many houses is the zodiac divided into?",
        answerChoices: ["12", "6", "10", "4"],
        correct: 0
    },
    {
        question: "The sign of Libra is ruled by which planet?",
        answerChoices: ["Mercury", "Pluto", "Venus", "Neptune"],
        correct: 2
    },
    {
        question: "Which planet controls sex drive and ambition?",
        answerChoices: ["Mars", "Venus", "Uranus", "Neptune"],
        correct: 0
    },
    {
        question: "Which keyword best represents the water element?",
        answerChoices: ["Practical", "Emotional", "Forceful", "Logical"],
        correct: 1
    },
    {
        question: "What are the 3 fire signs?",
        answerChoices: ["Aquarius, Aries, and Sagittarius", "Scorpio, Aries, and Leo", "Capricorn, Pisces, and Aries", "Aries, Sagittarius, and Leo"],
        correct: 3
    }
]


// //sets timer to 120 seconds
var timer = 120;
var interval;

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;

var gamePlay = {

    //at start of game, start timer, hide start page, hide results page
    startTime: function () {
        var timeContain = $('#directionsText');
        timeContain.append('<h3>Answer the following questions:</h3>');
        $('#gameContent').show();
        $('#timeRemaining').html(timer);
        $('#startPage').hide();
        $('#resultsPage').hide();
        interval = setInterval(gamePlay.countdown, 1000);
        triviaContent.displayTriviaQuestions();
    },


    //decrease timer and when timer gets to 0, hide time and get results
    countdown: function () {
        timer--;
        $('#timeRemaining').html(timer);
        if (timer === 0) {
            gamePlay.stopTimer();
        }
    },

    //stop time and get results
    stopTimer: function () {
        clearInterval(interval);
        $('#directionsText').empty();
        $('#gameContent').hide();
        $('#resultsPage').show();
        triviaContent.checkAnswers();
    },

    //show results page
    showResultsPage: function () {
        $('#resultsPage').show();
        $('#gameContent').hide();   
    },

    restartGame: function () {
        timer = 120;
        $('#timeRemaining').html(timer);
        $("#questionsList").empty();
        gamePlay.startTime();
        showResultsPage.empty();




    }

};


var triviaContent = {
    displayTriviaQuestions: function () {
        var container = $('#questionsList');

        for (var i = 0; i < triviaQuestions.length; i++) {
            container.append('<div id="question">' + triviaQuestions[i].question + '</div>');

            var answer1 = triviaQuestions[i].answerChoices[0];
            var answer2 = triviaQuestions[i].answerChoices[1];
            var answer3 = triviaQuestions[i].answerChoices[2];
            var answer4 = triviaQuestions[i].answerChoices[3];

            container.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-button' + i + '" id="button' + i + '"><label class="form-check-label" id="button' + i + 'label" for="radioButton' + i + '">' + answer1 + '</label></div>');
            container.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-button' + i + '" id="button' + i + '"><label class="form-check-label" id="button' + i + 'label" for="radioButton' + i + '">' + answer2 + '</label></div>');
            container.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-button' + i + '" id="button' + i + '"><label class="form-check-label" id="button' + i + 'label" for="radioButton' + i + '">' + answer3 + '</label></div>');
            container.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-button' + i + '" id="button' + i + '"><label class="form-check-label" id="button' + i + 'label" for="radioButton' + i + '">' + answer4 + '</label></div>');
        }

        var doneButton = $('#doneButton');
        doneButton.on('click', gamePlay.stopTimer);


    },

    checkAnswers: function () {

        var correctAnswer;
        var userAnswer;
        var correctAnswers = 0;
        var incorrectAnswers = 0;
        var unansweredQuestions = 0;

        for (var i = 0; i < triviaQuestions.length; i++) {


            var correct = triviaQuestions[i].correct;
            correctAnswer = triviaQuestions[i].answerChoices[correct];
            userAnswer = $('input[id=button' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                correctAnswers++;
                console.log(correctAnswers);
            } else if (userAnswer === "") {
                unansweredQuestions++;
            } else {
                incorrectAnswers++;
            }
            
        }


        // show the end page with the score tally
        gamePlay.showResultsPage(correctAnswers, incorrectAnswers, unansweredQuestions);

        $('#correctAnswers').html(correctAnswers);
        $('#incorrectAnswers').html(incorrectAnswers);
        $('#unansweredQuestions').html(unansweredQuestions);

    },


};