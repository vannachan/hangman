// Initializing the hangMan object
const hangMan = {};

// TODO: populate more words or look into API to generate words.
hangMan.wordArray = ['daniel', 'lion', 'prayer', 'darius', 'babylon', 'law'];
hangMan.charArray = [];
hangMan.guessCnt = 10;
hangMan.totalLetterCorrect = 0;

// =================================================================== //
// == Function Name: init()                                         == //
// =================================================================== //
// ==   Description: Randomly selects word from predetermined array == //
// ==                and populate dynamic DIVs on page.             == //
// =================================================================== //
hangMan.init = function() {
    console.log("WE IN THE INIT FUNCTION");
    hangMan.setup();
    hangMan.playGame();
    hangMan.playAgain();
};

// =================================================================== //
// == Function Name: setup()                                        == //
// =================================================================== //
// ==   Description: Randomly selects word from predetermined array == //
// ==                and populate dynamic HTML on page, setting up  == //
// ==                global variables.                              == //
// =================================================================== //
hangMan.setup = function() {
    const wordIndex = Math.floor( Math.random() * this.wordArray.length );
    this.charArray = this.wordArray[wordIndex].split('');

    for (let i = 0; i < this.charArray.length; i++) {
        $('section.guessWord').append(`<div class="letterContainer"><span class="${this.charArray[i]} guessLetter hideLetter">${this.charArray[i]}</span></div>`);
    }

    hangMan.resetCounters();
    $('span.guessCount').text(hangMan.guessCnt);
    $('.lastGuess').html('placeholder');
    $('body').removeClass('happy dead');
    // hangMan.loseGame();
};

// =================================================================== //
// == Function Name: resetCounters()                                == //
// =================================================================== //
// ==   Description: Reset counters for a fresh game.               == //
// =================================================================== //
hangMan.resetCounters = function() {
    hangMan.guessCnt = 2;
    hangMan.totalLetterCorrect = 0;
};

// =================================================================== //
// == Function Name: winGame()                                      == //
// =================================================================== //
// ==   Description: Output winner text and reset counters for      == // 
// ==                  the next game!                               == //
// =================================================================== //
hangMan.winGame = function() {
    $('body').removeClass('crying');
    $('body').addClass('happy');

    $('h3').text("YOU WIN!!!");
    $('h3').addClass('h3AddPadding');

    // Hiding things
    $('.keyboard').addClass('hideKeyboard');
    $('.lastGuess').html('');
    $('.lastGuess').removeClass('pAnimate');
    
    hangMan.resetCounters();
};

// =================================================================== //
// == Function Name: loseGame()                                     == //
// =================================================================== //
// ==   Description: Output loser text and reset counters for       == // 
// ==                  the next game!                               == //
// =================================================================== //
hangMan.loseGame = function() {
    $('body').removeClass('crying');
    $('body').addClass('dead');

    $('h3').text("YOU LOSEEEeeEEeEEE!!!");
    $('h3').addClass('h3AddPadding');

    // Reveal the word
    $('span.guessLetter').removeClass('hideLetter');
    $('span.guessLetter').addClass('showLetter');

    // Hiding things
    $('.keyboard').addClass('hideKeyboard');
    $('.lastGuess').html('');
    $('.lastGuess').removeClass('pAnimate');

    hangMan.resetCounters();
};

 // =================================================================== //
// == Function Name: checkMatches()                                 == //
// =================================================================== //
// ==     Arguments: 1 - selectedLetter                             == //
// ==   Description: Checks how many letters in the array match     == //
// ==                  the selected letter.                         == //
// =================================================================== //
hangMan.checkMatches = function(selectedLetter) {
    let letterCorrect = 0;
        
    for (let i = 0; i < hangMan.charArray.length; i++) {
        if (selectedLetter === hangMan.charArray[i]) {
            hangMan.totalLetterCorrect++;
            letterCorrect++;
            
            $(`span.${selectedLetter}`).removeClass('hideLetter');
            $(`span.${selectedLetter}`).addClass('showLetter');
            
            if (hangMan.totalLetterCorrect === hangMan.charArray.length) {
                hangMan.winGame();
            }
        }
    }

    return letterCorrect;
};

// =================================================================== //
// == Function Name: playGame()                                     == //
// =================================================================== //
// ==   Description: Let's play the game, shall we?                 == //
// =================================================================== //
hangMan.playGame = function() {

    // A LETTER WAS CLICKED, WOOT WOOT!
    $('.letterButton').on('click', function(){
        $('span').remove('.guessCount');
        $('.guessContainer').append(`<span class='guessCount'></span>`);

        // Save the letter and disable the button
        const selectedValue = $(this).attr('value');
        console.log(selectedValue);
        $(this).attr('disabled', 'disabled');
    
        // OKAY, WE GOT GUESSES LEFT, PROCEED!
        if (hangMan.guessCnt > 0) {

            // CHECK IF WE GOT ANYTHING RIGHT!
            const letterCorrect = hangMan.checkMatches(selectedValue);

            if (letterCorrect === 0) {
                hangMan.guessCnt--;
                $(this).addClass('incorrect');
                
                $('span.guessCount').text(hangMan.guessCnt);
                $('span.guessCount').addClass('countZoom');
                console.log(`Guesses left: ${hangMan.guessCnt}`);

                if (hangMan.guessCnt === 1) {
                    $('body').addClass('crying');

                    $('.lastGuess').remove();
                    $('h3').after(`<p class="lastGuess pAnimate">Uh oh, looks like you only have 1 guess left!</p>`);
                }

            } else {
                $('span.guessCount').text(hangMan.guessCnt);
                $('span.guessCount').removeClass('countZoom');
                $(this).addClass('correct');
            }

            // Finished searching through the character array and no guesses left
            if (hangMan.totalLetterCorrect < hangMan.charArray.length && hangMan.guessCnt === 0) {
                hangMan.loseGame();
            }
        }
    })
};

// =================================================================== //
// == Function Name: playAgain()                                    == //
// =================================================================== //
// ==   Description: Clean up HTML and repopulate the page for a    == //
// ==                new game of hangman!                           == //
// =================================================================== //
hangMan.playAgain = function() {
    $('.playAgain').on('click', function(){
        // Clean up all the stuff we disabled and changed in the HTML
        $('section.guessWord').html('');
        $('.letterButton').removeAttr('disabled');
        $('.letterButton').removeClass('incorrect');
        $('.letterButton').removeClass('correct');
        $('.keyboard').removeClass('hideKeyboard');
        $('h3').html('');
        $('h3').removeClass('h3AddPadding');
        $('.lastGuess').html('');

        // Now repopulate and set it up as a new game
        hangMan.setup();
    })
};

// =================================================================== //
// ======================== DOCUMENT IS READY ======================== //
// =================================================================== //
$(document).ready(function(){
    hangMan.init();
});