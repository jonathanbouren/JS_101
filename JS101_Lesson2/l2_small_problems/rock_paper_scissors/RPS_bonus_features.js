// Constants and variables needed for the program loop declared here.
const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 's', 'l', 'm'];
let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
let computerChoice = VALID_CHOICES[randomIndex];
let gameCount = 0;
let playerScore = 0;
let computerScore = 0;
let replayAnswer = '';
let choice = '';

const RULES = `Welcome to Rock, Paper, Scissors, Spock. The rules are as follows :
=> Scissors cuts Paper
=> Paper covers Rock
=> Rock crushes Lizard
=> Lizard poisons Mister Spock
=> Mister Spock smashes Scissors
=> Scissors decapitates Lizard
=> Lizard eats Paper
=> Paper disproves Spock
=> Spock vaporizes Rock
=> Rock crushes Scissors
`;

const COMMANDS = `You can use the following commands :
=> Press r for Rock
=> Press p for Paper
=> Press s for Scissors
=> Press l for Lizard
=> Press M for Mister Spock
`;
// Winning combos object  and functions , used from launchschool.com
const WINNING_COMBOS = {
  'rock': ['scissors', 'lizard'],
  'paper': ['rock', 'Mister Spock'],
  'scissors': ['paper', 'lizard'],
  'lizard': ['paper', 'Mister Spock'],
  'Mister Spock': ['rock', 'scissors']
};

function playerWins(choice, computerChoice) {
  return WINNING_COMBOS[choice].includes(computerChoice);
}

function computerWins(computerChoice, choice) {
  return WINNING_COMBOS[computerChoice].includes(choice);
}
//Prompt function for messages declared.
function prompt(message) {
  console.log(`=> ${message}`);
}
// Initial functions which are to be displayed only at the beginning of the
// first game, for displaying rules and commands.
function displayRules() {
  console.clear();
  prompt(RULES);
  prompt('Press Enter to continue');
  readline.question();
}

function displayCommands() {
  console.clear();
  prompt(COMMANDS);
  prompt('Press Enter to continue');
  readline.question();
}

function firstGameDisplay() {
  if (gameCount === 0) {
    displayRules();
    displayCommands();
    gameCount += 1;
    console.clear();
  }
}
// These functions are for getting the user and computer choice for comparison.
function getChoice() {
  prompt(`Choose one :(r)ock , (p)aper, (s)issors, (l)izard, (m)ister spock }`);
  choice = readline.question();
  choice = choice.toLowerCase();
  while (!VALID_CHOICES.includes(choice.toLowerCase())) {
    prompt('That is not a valid choice');
    choice = readline.question();
    choice = choice.toLowerCase();
  }
  return choice;
}

function getComputerChoice() {
  randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  computerChoice = VALID_CHOICES[randomIndex];
  return computerChoice;
}
// These switch cases convert the users input to the variables used
// in the program.
function convertChoice() {
  switch (choice.toLowerCase()) {
    case 'r': choice = 'rock';
      break;
    case 'p': choice = 'paper';
      break;
    case 's': choice = 'scissors';
      break;
    case 'l': choice = 'lizard';
      break;
    case 'm': choice = 'Mister Spock';
      break;
  }
  return choice;
}
function convertComputerChoice() {
  switch (computerChoice) {
    case 'r': computerChoice = 'rock';
      break;
    case 'p': computerChoice = 'paper';
      break;
    case 's': computerChoice = 'scissors';
      break;
    case 'l': computerChoice = 'lizard';
      break;
    case 'm': computerChoice = 'Mister Spock';
      break;
  }
  return computerChoice;
}
function getPlayerAndComputerChoices() {
  getChoice();
  convertChoice(choice);
  getComputerChoice();
  convertComputerChoice(computerChoice);
}
// This function tallys the score and announces the winnder of each round.
function roundWinner(choice, computerChoice) {
  console.clear();
  prompt(`You chose ${choice}, computer chose ${computerChoice} `);
  if (playerWins(choice, computerChoice)) {
    playerScore += 1;
    prompt(`You Won round ${gameCount} |||| SCORE => computer[${computerScore}] player[${playerScore}]`);
  } else if (computerWins(computerChoice, choice)) {
    computerScore += 1;
    prompt(`Computer wins round ${gameCount} |||| SCORE => computer[${computerScore}] player[${playerScore}]`);
  } else {
    prompt(`Round ${gameCount} was a tie! |||| SCORE => computer[${computerScore}] player[${playerScore}]`);
  }
}
// The no winner function is used to control the loop until 5 is reached.
function noWinner() {
  if (playerScore === 5) {
    return false;
  } else if (computerScore === 5) {
    return false;
  }
  return true;
}
// The final winner function simply displays the final score and
// a message for the winner.
function finalWinner() {
  console.clear();
  if (playerScore > computerScore) {
    prompt(`Player Wins! Final Score => computer[${computerScore}] player[${playerScore}]`);
    prompt(`\n"All those moments will be lost in time... like tears in the rain."
                                                                  - Roy Batty`);
  } else if (playerScore < computerScore) {
    prompt(`Computer Wins! Final Score => computer[${computerScore}] player[${playerScore}]`);
    prompt(`\n"It can only be attributable to human error..."
                                                  -HAL 9000       `);
  } else {
    prompt(`It's a tie! Final Score => computer[${computerScore}] player[${playerScore}]`);
    prompt(`\n"I also have a discretion setting Cooper...
                                                  -TARS `);
  }
}
// The play again function asks the user if they would like another game.
function playAgain() {
  prompt("Do you want to play again?");
  replayAnswer = readline.question();
  while (replayAnswer[0] !== 'n' && replayAnswer[0] !== 'y') {
    console.clear();
    prompt("Please simply enter 'y' to play again or 'n' to exit the game.");
    replayAnswer = readline.question();
  }
  return replayAnswer;
}
// The end game function is used to reset the variables for another round
// it also clears the screen and thanks the player if they choose not to
// continue.
function endGame() {
  if (replayAnswer[0] !== 'y') {
    console.clear();
    console.log('Thank you for playing Rock, Paper, Scissors, Lizard, Spock! See you next time!');
    return true;
  } else {
    console.clear();
    gameCount = 1;
    playerScore = 0;
    computerScore = 0;
    return false;
  }
}
/*
It looks so nice and small! I love functions. I do feel like there are a lot of
variable declarations, I will be experimenting to see if I can limit some of
them. But so far all seems to function well.
*/
while (true) {
  do {
    firstGameDisplay();
    getPlayerAndComputerChoices();
    roundWinner(choice, computerChoice);
  } while (noWinner());
  finalWinner();
  playAgain();
  if (endGame()) {
    break;
  }
}