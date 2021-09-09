const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];
let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
let computerChoice = VALID_CHOICES[randomIndex];

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if ((choice === 'rock' && computerChoice === 'scissors') ||
    (choice === 'paper' && computerChoice === 'rock') ||
    (choice === 'scissors' && computerChoice === 'paper')) {
    prompt('You win!');
  } else if ((choice === 'rock' && computerChoice === 'paper') ||
    (choice === 'paper' && computerChoice === 'scissors') ||
    (choice === 'scissors' && computerChoice === 'rock')) {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie!");
  }
}

while (true) {
  prompt(`Choose one : ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt('That is not a valid choice');
    choice = readline.question();
  }
  displayWinner(choice, computerChoice);

  prompt("Do you want to play again?");
  let replayAnswer = readline.question();

  while (replayAnswer[0] !== 'n' && replayAnswer[0] !== 'y') {
    prompt("Please simply enter 'y' to play again or 'n' to exit the game.");
    replayAnswer = readline.question();
  }
  if (replayAnswer[0] !== 'y') break;

}