const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMP_MARKER = 'O';
const PLAYER = ' Player ';
const COMPUTER = 'Computer';
const EVERYONE = 'Everyone';
const SCORES = [
  ['Player :', 0],
  [' Computer :', 0],
  [' Tie :', 0]
];

const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7], [7, 5, 3]];
const YES_NO = ['y', 'n'];
const PLAYER_OR_COMPUTER = [
  playerGoesFirst(),
  computerGoesFirst()];

function prompt(message) {
  console.log(`=> ${message}`);
}

function makeReadableScores(array) {
  return array.flat().join('');
}

function champion(SCORES) {
  let haveChampion = false;
  if ((SCORES[0][1] === 1) ||
    (SCORES[1][1] === 1) ||
    (SCORES[2][1] === 1)) {
    haveChampion = true;
  }
  return haveChampion;
}

function whoIsTheChampion(SCORES) {
  let champ;
  if (SCORES[0][1] === 1) {
    champ = PLAYER;
  } else if (SCORES[1][1] === 1) {
    champ = COMPUTER;
  } else if (SCORES[2][1] === 1) {
    champ = EVERYONE;
  }
  return champ;
}

function countScores(board) {
  if (detectWinner(board) === PLAYER) {
    SCORES[0][1] += 1;
  } else if (detectWinner(board) === COMPUTER) {
    SCORES[1][1] += 1;
  } else {
    SCORES[2][1] += 1;
  }
  return SCORES;
}

function displayGameInfo() {
  //console.clear();
  prompt(`You are ${HUMAN_MARKER} Computer is ${COMP_MARKER}`);
  prompt(`The current score is ${makeReadableScores(SCORES)}`);
  console.log('');
}

function displayChampion(theChampion) {
  //console.clear();
  console.log('*******************************');
  console.log('<         |         |         >');
  console.log(`<  Congratulations ${theChampion}!! >`);
  console.log('<_________|_________|_________>');
  console.log('<         |         |         >');
  console.log(`<  Thanks |   for   | playing >`);
  console.log('<_________|_________|_________>');
  console.log('<         |         |         >');
  console.log(`<   TIC   |  TAC    |  TOE    >`);
  console.log('<         |         |         >');
  console.log('*******************************');
  console.log('');
}

function displayBoard(board) {
  //console.clear();
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
function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}
function getRandomSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[randomIndex];
  return square;
}

function computerChoosesSquare(board) {
  let square;
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, COMP_MARKER);
    if (square) break;
    if (!square) {
      square = findAtRiskSquare(line, board, HUMAN_MARKER);
      if (square) break;
    }
  }
  if (!square && board[5] === INITIAL_MARKER) {
    square = 5;
  } else if (!square && board[5] !== INITIAL_MARKER) {
    square = getRandomSquare(board);
  }
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
      board[sq1] === HUMAN_MARKER && board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return PLAYER;
    } else if (
      board[sq1] === COMP_MARKER && board[sq2] === COMP_MARKER &&
      board[sq3] === COMP_MARKER
    ) {
      return COMPUTER;
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

function whoGoesFirst(GO_FIRST) {
  console.log('who goes first');
  let answer;
  do {
    //console.clear();
    prompt(`Who should go first? \n =>[1] Player [2] Computer [3] Random`);
    answer = readline.question();
    if ([1, 2, 3].includes(answer)) {
      break;
    } else {
      prompt(`Please enter 1 for player, 2 for computer, 3 to let fate decide.`);
    }
  } while (true);
  return GO_FIRST[answer - 1];
}

function playAgain() {
  let answer;
  let count = 0;
  do {
    if (count > 0) {
      //console.clear();
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

function playerGoesFirst() {
  console.log('player goes first');
  do {
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
  } while (!champion(SCORES));
}

function computerGoesFirst() {
  console.log('computer goes first');
  do {
    let board = initializeBoard();

    while (true) {
      displayBoard(board);

      computerChoosesSquare(board);
      champion(SCORES);
      if (someoneWon(board) || boardFull(board)) break;

      playerChoosesSquare(board);
      champion(SCORES);
      if (someoneWon(board) || boardFull(board)) break;

    }
    displayBoard(board);
    displayWinner(board);
    countScores(board);
  } while (!champion(SCORES));
}
function playGame() {
  console.log('THIS IS THE REAL GAME2');
  whoGoesFirst();
  if (whoGoesFirst() === PLAYER) {
    playerGoesFirst();
  } else if (whoGoesFirst() === COMPUTER) {
    computerGoesFirst();
  } else if (whoGoesFirst() === PLAYER_OR_COMPUTER) {
    return PLAYER_OR_COMPUTER[Math.floor(Math.random())];
  }
  return SCORES;
}
while (true) {
  console.log('THIS IS THE REAL GAME1');
  playGame();
  let theChampion = whoIsTheChampion(SCORES);
  console.log(theChampion);
  readline.question();
  displayChampion(theChampion);
  if (!playAgain()) {
    break;
  } else {
    //console.clear();
    SCORES[0][1] = 0;
    SCORES[1][1] = 0;
    SCORES[2][1] = 0;
  }
}

