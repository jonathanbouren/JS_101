const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMP_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]];

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayBoard(board) {
  console.clear();
  prompt(`You are ${HUMAN_MARKER} the computer is ${COMP_MARKER}`);
  console.log('');
  console.log('*******************************');
  console.log('<         |         |         >');
  console.log(`<    ${board[1]}    |    ${board[2]}    |    ${board[3]}    >`);
  console.log('<_________|_________|_________>');
  console.log('<         |         |         >');
  console.log(`<    ${board[4]}    |    ${board[5]}    |    ${board[6]}    >`);
  console.log('<_________|_________|_________>');
  console.log('<         |         |         >');
  console.log(`<    ${board[7]}    |    ${board[8]}    |    ${board[9]}    >`);
  console.log('<         |         |         >');
  console.log('*******************************');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }
  return board;
}
function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square. ${emptySquares(board).join(', ')}`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    console.clear();
    prompt("Not a valid choice, please try again.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {

  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[randomIndex];
  board[square] = COMP_MARKER;

}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];
    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMP_MARKER &&
      board[sq2] === COMP_MARKER &&
      board[sq3] === COMP_MARKER
    ) {
      return 'Computer';
    }
  }
  return null;
}

while (true) {
  let board = initializeBoard();

  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;

    computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;


  }
  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt(`It was a tie!`);
  }
  prompt('Would you like to play aain? (y or n)');
  let answer = readline.question().trim().toLowerCase()[0];
  if (answer !== 'y') break;
}
console.clear();
prompt(`Thank you for playing Tic Tac Toe!`);
