const COLORS = ["green", "red", "yellow", "blue"]; // Colors correspond to their index
var gamePattern;
var gamePatternCopy; // Copy of the pattern to compare user input
var levelNo;

$(document).on("keypress", startGame);

function startGame() {

    gamePattern = [];
    gamePatternCopy = [];
    levelNo = 0;
    toggleEventHandler();
    $(document).off();

    newRound();
}

function newRound() {
    toggleEventHandler(); // Disable clicking during animation
    
    gamePattern.push(randomNumber());
    gamePatternCopy = gamePattern.slice(0);
    $("h1").text("Level " + (++levelNo));

    // Playing the pattern animation
    for (let i = 0; i < gamePattern.length; i++) {
        // setTimeout() runs asynchronously, i.e. the loop runs first and then all the delays run at once
        // Which is why I am delaying each animation by a multiple of 700, so it plays sequentially
        setTimeout(function () {
            pressButton(COLORS[gamePattern[i]]);
        }, 700 * (i + 1));
    }
    
    // Enable clicking and delaying it till after the last element's animation
    setTimeout(function () {
        toggleEventHandler();
    }, 700 * (gamePattern.length + 1));
}

function randomNumber() { 
    return Math.floor(Math.random() * 4);
}

function checkPattern(colorIndex) {
    // Comparing user input with the first element and pop if it's correct
    if (colorIndex == gamePatternCopy[0]) {
        gamePatternCopy.shift();
    } else {
        $("h1").text("Game Over! Press Any Button to Continue");
        toggleEventHandler();
        $(document).on("keypress", startGame);
    }

    // If all elements have been popped, the pattern is complete and move to next round
    if (gamePatternCopy.length == 0) {
        newRound();
    }
}

function pressButton(idName) {
    var buttonElement = $("#" + idName);
    var colorIndex = COLORS.indexOf(idName);
    var sound = new Audio("sounds/simonSound" + (colorIndex + 1) + ".mp3");

    buttonElement.addClass("light-up");
    setTimeout(function () {
        buttonElement.removeClass("light-up");
    }, 300);
    sound.play();
}

// Toggle the ability to click buttons
function toggleEventHandler() {

    if ($._data($(".color").get(0), "events") == null) {
        $(".color").on("click", function (event) {
            var id = $(this).attr("id");
            pressButton(id);
            checkPattern(COLORS.indexOf(id));
        });
    } else {
        $(".color").off();
    }
}