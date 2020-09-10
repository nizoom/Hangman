var guessCounter = 5;
let turnCounter = -1;

function entry(){
  var input;
  //1. display prompt
  domStrings.inputDiv.style.display = 'block'

  //2. enter prompt and hit ok
  ok.addEventListener('click', function(){
    input = domStrings.entryField.value;
    word.textContent = input;
    domStrings.inputDiv.style.display = 'none';
    word.style.display = 'block';
    welcome.textContent = 'Player 1 has entered a word. Player two may begin guessing';
    //word.textContent = input;
    setTimeout(invisibleOpener, 13000);
    gameController();

  });
};



function newGame(){
  domStrings.startGame.addEventListener('click', function(){
    win.style.display = 'none';
    over.style.display = 'none';
    entryField.value = '';
    word.style.display = 'none';
    wholeField.style.display = 'none';
    rad.style.display = 'none';
    freshGuess();
    entry();
  })
}

function retry(){
  domStrings.retry.addEventListener('click', function(){
    setup();
    word.style.display = 'block';
    over.style.display = 'none';
    win.style.display = 'none';
    freshGuess();
  })
}

function freshGuess (){
  guessCounter = 5;
  chances.textContent = `Guesses remaining: 5`;
}

function invisibleOpener(){
  welcome.style.display = 'none'

}

function invisibleWrong(){
  wrong.style.visibility = 'hidden'
  console.log('test1');
}
//Start Controller

var setup = function (){
  var dashes, input;
  input = entryField.value;
  //let dashes = input.length;
  dashes = '_ '.repeat(input.length);
  word.textContent = dashes;
}

var domStrings = {
  word : document.querySelector('#word'),
  guess : document.querySelector('#guess'),
  og : document.querySelector('#og'),
  chances : document.querySelector('#chances'),
  welcome : document.querySelector('#welcome'),
  wrong : document.querySelector('#wrong'),
  over : document.querySelector('#over'),
  win : document.querySelector('#win'),
  whole : document.querySelector('#wholeButton'),
  wholeField : document.querySelector('#wholeField'),
  rad : document.querySelector('#rad'),
  startGame : document.querySelector('#new'),
  inputDiv : document.querySelector('#inputDiv'),
  ok : document.querySelector('#ok'),
  entryField : document.querySelector('#entryField'),
  retry : document.querySelector('#retry'),
  submit : document.querySelector('#submit')
}
//GAME CONTROLLER
var gameController = function(){
  //1. create number of dashes according to input.length
  setup();
  newGame();
  retry();
  wholeWord();
  //2. create function where if input includes guess the dash turns to that letter
  checker();
  //3. check for win
  winchecker();
}
//WHOLE WORD GUESS
var wholeWord = function(){
  whole.addEventListener('click', function(){
    console.log('hello');
    //display input field  (press enter to submit)
    wholeField.style.display = 'inline'
    rad.style.display = 'block'
    })
    rad.addEventListener('click', function(){
      console.log('wholeField.value ', wholeField.value);
      console.log('entryField.value ', entryField.value);
      if(wholeField.value === entryField.value){
        won()
        console.log('you won!');
          }else{
            console.log('u lose too');
            over.style.display = 'inline'
            chances.textContent = `Guesses remaining: 0`;
            word.style.display = 'none';
          }
  })
}
//Check Controller
 function checker(){
  var lcase;
  domStrings.submit.addEventListener("click", function(){
    //e.preventDefault();
    console.log('form submitted');
    lCase = guess.value.toLowerCase();

   if(entryField.value.includes(lCase)) {
      for (i = 0; i < entryField.value.length; i++){
        if(lCase === entryField.value[i]){
          retainAndReplace(domStrings.word.textContent, i , lCase)

          }
        }
      }
        else{
          //tell user they're wrong
          chances.textContent = `Guesses remaining: ${guessCounter}`;
          console.log('wrong');
          wrong.style.visibility = 'visible';
          wrong.style.display = 'block';
          wrong.classList.add('.fade-out-wrong')
          setTimeout(invisibleWrong, 4000);

          guessCounter--;
          if(guessCounter < 1){
            //display game over
            over.style.display = 'inline'
            chances.textContent = `Guesses remaining: 0`;
            wrong.style.display = 'none';

            //hide dashes
            word.style.display = 'none'
          }else{
            chances.textContent = `Guesses remaining: ${guessCounter}`;
          }
        }
      })
    }


var retainAndReplace = function(retained, i, letter){
  //need to despacify the retained str, then add the new letter, then respacify, then display
  var newerString, despaced, spaced
  //despacify
  despaced = retained.replace(/\s/g, '');
  //new letter
  newerString = `${despaced.substr(0, i)}${letter}${despaced.substr(i+1)}`
  //
  spaced = newerString.split('').join(' ');
  updateDisplay(spaced);

  winchecker()

}

var updateDisplay = function (update){
  word.textContent = update
}

var winchecker = function(){
  var revert;
  revert = word.textContent.replace(/\s/g, '');
  if(revert === entryField.value){
    won()
  }
  //display winning message
}

var won = function(){
  word.style.display = 'none';
  win.style.display = 'block';
  wrong.style.display = 'none';
  guess.value = '';
  wholeField.value = '';
}
entry();
