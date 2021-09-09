const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 's', 'l', 'm'];
let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
let computerChoice = VALID_CHOICES[randomIndex];
let gameCount = 0;
let playerScore = 0;
let computerScore = 0;
let choice = '';
let rock = 'rock';
let paper = 'paper';
let scissors = 'scissors';
let lizard = 'lizard';
let misterSpock = 'Mister Spock';

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


let choice = '';
let rock = 'rock';
let paper = 'paper';
let scissors = 'scissors';
let lizard = 'lizard';
let misterSpock = 'Mister Spock';

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

function prompt(message) {
  console.log(`=> ${message}`);
}

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
  }
}

function getChoice() {
  prompt(`Choose one : ${VALID_CHOICES.join(', ')}`);
  choice = readline.question();
  while (!VALID_CHOICES.includes(choice)) {
    prompt('That is not a valid choice');
    choice = readline.question();
  }
  return choice;
}

function getComputerChoice() {
  randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  computerChoice = VALID_CHOICES[randomIndex];
  return computerChoice;
}
function convertChoice() {
  switch (choice) {
    case 'r': choice = rock;
      break;
    case 'p': choice = paper;
      break;
    case 's': choice = scissors;
      break;
    case 'l': choice = lizard;
      break;
    case 'm': choice = misterSpock;
      break;
  }
  return choice;
}
function convertComputerChoice() {
  switch (computerChoice) {
    case 'r': computerChoice = rock;
      break;
    case 'p': computerChoice = paper;
      break;
    case 's': computerChoice = scissors;
      break;
    case 'l': computerChoice = lizard;
      break;
    case 'm': computerChoice = misterSpock;
      break;
  }
  return computerChoice;
}

function displayWinner(choice, computerChoice) {
  console.clear();
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);
  if (playerWins(choice, computerChoice)) {
    prompt(`You Won round ${gameCount}`);
  } else if (computerWins(computerChoice, choice)) {
    prompt('Computer wins!');
  } else {
    prompt('It was a tie!');
  }
}

while (true) {
  firstGameDisplay();
  getChoice();
  convertChoice(choice);
  computerChoice = getComputerChoice();
  convertComputerChoice(computerChoice);
  console.log(choice);
  displayWinner(choice, computerChoice);

  prompt("Do you want to play again?");
  let replayAnswer = readline.question();

  while (replayAnswer[0] !== 'n' && replayAnswer[0] !== 'y') {
    prompt("Please simply enter 'y' to play again or 'n' to exit the game.");
    replayAnswer = readline.question();
  }
  if (replayAnswer[0] !== 'y') {
    break;
  } else {
    gameCount += 1;
  }
}
