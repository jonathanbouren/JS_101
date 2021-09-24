const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMP_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]];
const YES_NO = ['y', 'n'];

function prompt(message) {
  console.log(`=> ${message}`);
}

const SCORES = [
  ['Player :', 0],
  [' Computer :', 0]
];

function displayScores(array) {
  return array.flat().join('');
}
function champion(SCORES) {
  let champion = false;
  if (SCORES[0][1] === 5) {
    console.clear();
    prompt(`Player is the champion!`);
    champion = true;
  } else if (SCORES[1][1] === 5) {
    console.clear();
    prompt(`Computer is the champion!`);
    return true;
  }
  return champion;
}

function countScores(board) {
  if (detectWinner(board) === 'Player') {
    SCORES[0][1] += 1;
  } else if (detectWinner(board) === 'Computer') {
    SCORES[1][1] += 1;
  }
  return SCORES;
}

function displayGameInfo() {
  console.clear();
  prompt(`You are ${HUMAN_MARKER} Computer is ${COMP_MARKER}`);
  prompt(`The current score is ${displayScores(SCORES)}`);
  console.log('');
}

function displayBoard(board) {
  displayGameInfo();
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
    // if (emptySquares(board).length === 1) {
    //   square = emptySquares(board);
    //   prompt(`The only choice is ${emptySquares(board)}`);
    //   break;
    // }
    prompt(`Choose a square. ${joinOr(emptySquares(board))}`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Not a valid choice, please try again.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {

  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[randomIndex];
  computerDefense(board);
  board[square] = COMP_MARKER;

}
function computerDefense(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];
    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === INITIAL_MARKER
    ) {
      board[sq3] = COMP_MARKER;
    } else if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === COMP_MARKER &&
      board[5] === INITIAL_MARKER
    ) {
      board[5] = COMP_MARKER;
    }
  }
  return null;
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

function joinOr(array, sym = ', ', conj = ' or ') {
  if (array.length > 1) {
    return array.slice(0, -1)
      .join(sym)
      .concat(conj)
      .concat(array.slice(-1)
        .join());
  } else {
    return array.slice()
      .join();
  }
}

function displayWinner(board) {
  let letsContinue;
  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
    prompt('Press ENTER to continue!');
    letsContinue = readline.question();
  } else {
    prompt(`It was a tie!`);
    prompt('Press ENTER to continue!');
    letsContinue = readline.question();
  }
  return letsContinue;
}

function playAgain() {
  let answer;
  let count = 0;
  do {
    if (count > 0) {
      console.clear();
      prompt("You must enter 'y' to play again or 'n' to end the game.");
    }
    prompt('Would you like to play again? (y or n)');
    answer = readline.question().trim().toLowerCase()[0];
    count++;
  } while (!YES_NO.includes(answer));
  if (answer === 'n') {
    answer = false;
  } else {
    answer = 'true';
  }
  return answer;
}

function sayGoodbye() {
  console.clear();
  if (SCORES[0][1] === 5) {
    console.clear();
    prompt("Congratulations to our Champion >>> ::PLAYER::!!!");
  } else if (SCORES[1][1] === 5) {
    console.clear();
    prompt("Congratulations to myself, the champion >>> ::COMPUTER::!!!");
    return true;
  }
  prompt(`Thank you for playing Tic Tac Toe!`);
  return null;
}


while (true) {

  while (!champion(SCORES)) {

    let board = initializeBoard();

    while (true) {
      displayBoard(board);

      playerChoosesSquare(board);
      champion(SCORES);
      if (someoneWon(board) || boardFull(board)) break;

      computerChoosesSquare(board);
      champion(SCORES);
      if (someoneWon(board) || boardFull(board)) break;

    }
    displayBoard(board);
    displayWinner(board);
    countScores(board);
  }
  if (!playAgain()) {
    sayGoodbye();
    break;
  } else {
    SCORES[0][1] = 0;
    SCORES[1][1] = 0;
  }
}

