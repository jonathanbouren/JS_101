const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMP_MARKER = 'O';
const PLAYER = ' Player ';
const COMPUTER = 'Computer';
const EVERYONE = 'Everyone';
const PLAYER_OPTIONS = [PLAYER, COMPUTER,];
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]];
const YES_NO = [['y', 'yes', 'yep', 'yeah', 'yup'], ['n', 'no', 'nope', 'no way']];
let player1;

function prompt(message) {
  console.log(`=> ${message}`);
}

function randomFirstPlayer() {
  let randomNum = Math.round(Math.random());
  return randomNum;
}

function chooseFirstTurn(PLAYER_OPTIONS) {
  let firstTurnChoice;
  console.clear();
  console.log('Who goes first? [1] Player [2] Computer [3] Random');
  firstTurnChoice = readline.question();
  while (true) {
    if ([1, 2, 3].includes(Number(firstTurnChoice))) break;
    console.log('Please enter 1 for Player, 2 for Computer or 3 to choose randomly');
    firstTurnChoice = readline.question();
  }
  switch (firstTurnChoice) {
    case '1': player1 = PLAYER_OPTIONS[0];
      break;
    case '2': player1 = PLAYER_OPTIONS[1];
      break;
    case '3': player1 = PLAYER_OPTIONS[randomFirstPlayer()];
  }
  return player1;
}

const SCORES = [
  ['Player :', 0],
  [' Computer :', 0],
  [' Tie :', 0]
];

function makeReadableScores(array) {
  return array.flat().join('');
}

function champion(SCORES) {
  let haveChampion = false;
  if ((SCORES[0][1] === 1) ||
    (SCORES[1][1] === 1)) {
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
  } else if (boardFull(board)) {
    SCORES[2][1] += 1;
  }
  return SCORES;
}

function displayGameInfo() {
  console.clear();
  prompt(`You are ${HUMAN_MARKER} Computer is ${COMP_MARKER}`);
  prompt(`The current score is ${makeReadableScores(SCORES)}`);
  console.log('');
}

function displayChampion(theChampion) {
  console.clear();
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
  console.clear();
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
  } else if (boardFull(board)) {
    prompt(`It was a tie!`);
    prompt('Press ENTER to continue!');
    letsContinue = readline.question();
  }
  return letsContinue;
}

function incorrectAnswerLoop(answer) {
  while (!YES_NO.flat().includes(answer)) {
    // console.clear();

    if (answer.startsWith('y') && !YES_NO[0].includes(answer)) {
      prompt(`It seems like you might mean 'yes'? Hit 'y' to confirm and play again.`);
      answer = readline.question().toLowerCase();
    } else if (answer.startsWith('n') && !YES_NO[1].includes(answer)) {
      prompt(`It seems like you might mean 'no' ? Hit 'n' to confirm and end the game.`);
      answer = readline.question().toLowerCase();
    } else {
      prompt(`I'm sorry, I'm not sure what you mean. Please try again.`);
      answer = readline.question().toLowerCase();
    }
  }
  return answer;
}
function playAgain() {
  let answer;
  let theBool = false;

  prompt('Would you like to play again? (y or n)');
  answer = readline.question().trim().toLowerCase();
  answer = incorrectAnswerLoop(answer);
  console.log(answer);
  if (answer[0] === 'y') {
    theBool = true;
  } else if (answer[0] === 'n') {
    theBool = false;
  }

  return theBool;
}

// function playerGoesFirst(board) {
//   while (true) {
//     displayBoard(board);

//     playerChoosesSquare(board);
//     champion(SCORES);
//     if (someoneWon(board) || boardFull(board)) break;

//     computerChoosesSquare(board);
//     champion(SCORES);
//     if (someoneWon(board) || boardFull(board)) break;

//   }
// }

// function computerGoesFirst(board) {
//   while (true) {

//     computerChoosesSquare(board);
//     champion(SCORES);
//     displayBoard(board);
//     if (someoneWon(board) || boardFull(board)) break;

//     playerChoosesSquare(board);
//     champion(SCORES);
//     if (someoneWon(board) || boardFull(board)) break;

//   }
// }

function chooseSquare(board, player1) {
  if (player1 === PLAYER) {
    displayBoard(board);
    playerChoosesSquare(board);
    champion(SCORES);
    computerChoosesSquare(board);
  } else {
    displayBoard(board);
    computerChoosesSquare(board);
    champion(SCORES);
    displayBoard(board);
    playerChoosesSquare(board);
  }
  return board;
}

function alternatePlayer(player1) {
  if (player1 === PLAYER) {
    player1 = COMPUTER;
  } else {
    player1 = PLAYER;
  }
  return player1;
}
while (true) {

  chooseFirstTurn(PLAYER_OPTIONS);

  while (!champion(SCORES)) {
    let board = initializeBoard();
    while (true) {
      chooseSquare(board, player1);
      alternatePlayer(player1);
      countScores(board);
      displayBoard(board);
      displayWinner(board);
      if (someoneWon(board) || boardFull(board)) break;

    }
  }
  let theChampion = whoIsTheChampion(SCORES);
  displayChampion(theChampion);
  if (!playAgain()) {
    console.clear();
    prompt('Ok! See you next time!');
    break;
  } else {
    player1 = '';
    SCORES[0][1] = 0;
    SCORES[1][1] = 0;
    SCORES[2][1] = 0;
  }
}


