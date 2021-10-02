// 3 x 3 game variables.
const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMP_MARKER = 'O';
const PLAYER = ' Player ';
const COMPUTER = 'Computer';
const EVERYONE = 'Everyone';
const PLAYER_OPTIONS = [PLAYER, COMPUTER,];
const WINNING_LINES = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]];
const YES_NO = [['y', 'yes', 'yep', 'yeah', 'yup'], ['n', 'no', 'nope', 'no way']];
let player1;
// 5 x 5 game variables
const GAME_TYPE = ['3lines', '5lines'];
let typeOfGame;
const WINNING_5X5_LINES = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  [1, 7, 13, 19, 25],
  [5, 9, 13, 17, 21],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [5, 10, 15, 20, 25],
  [2, 6, 7, 8, 12],
  [4, 8, 9, 10, 14],
  [12, 16, 17, 18, 22],
  [14, 18, 19, 20, 24],
  [8, 12, 13, 14, 18],
  // [7, 8, 9, 12, 14, 17, 18, 19],
  // [7, 13, 19, 17, 9]
];
let matchCount = 3;
let winningScore;

function prompt(message) {
  console.log(`=> ${message}`);
}
// if player1 choice is random
function randomFirstPlayer() {
  let randomNum = Math.round(Math.random());
  return randomNum;
}
//choose who goes first, runs before each game
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

function champion(SCORES, winningScore) {
  let haveChampion = false;
  if ((SCORES[0][1] === winningScore) ||
    (SCORES[1][1] === winningScore)) {
    haveChampion = true;
  }
  return haveChampion;
}
// allows the game to choose a winner for best 2/3, best 4/5 etc.
function whoIsTheChampion(SCORES) {
  let champ;
  if (SCORES[0][1] > SCORES[1][1] && matchCount === 0) {
    champ = PLAYER;
  } else if (SCORES[0][1] < SCORES[1][1] && matchCount === 0) {
    champ = COMPUTER;
  } else if (SCORES[0][1] === SCORES[1][1] && matchCount === 0) {
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
//Display the markers, current score, and rounds left
function displayGameInfo() {
  console.clear();
  prompt(`You are ${HUMAN_MARKER} Computer is ${COMP_MARKER}`);
  prompt(`The current score is ${makeReadableScores(SCORES)}`);
  prompt(`There are ${matchCount} rounds to go`);
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
// display 3x3 board with current markers
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

//initialize 3x3 board
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
//player chooses square, in 5x5 squares are numbered because the 25 move list
//wasn't clear enough to indicate where a square was.
//3x3 square choice is by list of available squares.
function playerChoosesSquare(board) {
  let square;

  while (true) {
    if (typeOfGame === '5lines') {
      prompt('Choose an open square.');
      square = readline.question().trim();
    } else if (typeOfGame === '3lines') {
      prompt(`Choose a square. ${joinOr(emptySquares(board))}`);
      square = readline.question().trim();
    }
    if (emptySquares(board).includes(square)) break;

    prompt("Not a valid choice, please try again.");
  }
  board[square] = HUMAN_MARKER;
}
// find at risk squares for player or computer
//when used for computer the at risk square is a winning move
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
//the game will replay or terminate based on this function
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

function askPlayerAboutRules() {
  let answer;
  let theBool = false;

  prompt('Would you like to see the rules for a 5 x 5 game? (y or n)');
  answer = readline.question().trim().toLowerCase();
  answer = incorrectRulesAnswerLoop(answer);
  console.log(answer);
  if (answer[0] === 'y') {
    theBool = true;
  } else if (answer[0] === 'n') {
    theBool = false;
  }

  return theBool;
}
function incorrectRulesAnswerLoop(answer) {
  while (!YES_NO.flat().includes(answer)) {
    // console.clear();

    if (answer.startsWith('y') && !YES_NO[0].includes(answer)) {
      prompt(`It seems like you might mean 'yes'? Hit 'y' to confirm display rules.`);
      answer = readline.question().toLowerCase();
    } else if (answer.startsWith('n') && !YES_NO[1].includes(answer)) {
      prompt(`It seems like you might mean 'no' ? Hit 'n' to confirm and continue.`);
      answer = readline.question().toLowerCase();
    } else {
      prompt(`I'm sorry, I'm not sure what you mean. Please try again.`);
      answer = readline.question().toLowerCase();
    }
  }
  return answer;
}

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

function resetGame(player1, SCORES) {
  matchCount = 3;
  player1 = '';
  SCORES[0][1] = 0;
  SCORES[1][1] = 0;
  SCORES[2][1] = 0;
  return player1;
}

// 5 x 5 game functions
// Souther cross rule display board

function southernCross1() {
  console.log('***************************************************');
  console.log('<         |         |         |         |         >');
  console.log(`<         |    X    |         |         |         >`);
  console.log('<_________|_________|_________|_________|_________>');
  console.log('<         |.       `|        `|.       `|         >');
  console.log(`<    X    |    X    |    X    |         |         >`);
  console.log('<_________|_________|_________|_________|_________>');
}

function southernCross2() {
  console.log('<         |        `|.        |        `|         >');
  console.log(`<         |    X    |         |    O    |         >`);
  console.log('<_________|_________|_________|_________|_________>');
  console.log('<         |.       `|        `|.       `|         >');
  console.log(`<         |         |    O    |    O    |    O    >`);
  console.log('<_________|_________|_________|_________|_________>');
}

function southernCross3() {
  console.log(`<         |         |         |         |         >`);
  console.log(`<         |         |         |    O    |         >`);
  console.log(`<         |         |         |         |         >`);
  console.log('***************************************************');
}

function displaySouthernCross() {
  console.clear();
  southernCross1();
  southernCross2();
  southernCross3();
}

//5x5 board initiation
function display1To10(board) {
  console.clear();
  displayGameInfo();
  console.log('***************************************************');
  console.log('<1        |2        |3        |4        |5        >');
  console.log(`<    ${board[1]}    |    ${board[2]}    |    ${board[3]}    |    ${board[4]}    |    ${board[5]}    >`);
  console.log('<_________|_________|_________|_________|_________>');
  console.log('< 6       |7        |8        |9        |10       >');
  console.log(`<    ${board[6]}    |    ${board[7]}    |    ${board[8]}    |    ${board[9]}    |    ${board[10]}    >`);
  console.log('<_________|_________|_________|_________|_________>');

}
function display11To20(board) {
  console.log('<11       |12       |13       |14       |15       >');
  console.log(`<    ${board[11]}    |    ${board[12]}    |    ${board[13]}    |    ${board[14]}    |    ${board[15]}    >`);
  console.log('<_________|_________|_________|_________|_________>');
  console.log('<16       |17       |18       |19       |20       >');
  console.log(`<    ${board[16]}    |    ${board[17]}    |    ${board[18]}    |    ${board[19]}    |    ${board[20]}    >`);
  console.log('<_________|_________|_________|_________|_________>');
}

function display21To25(board) {
  console.log('<21       |22       |23       |24       |25       >');
  console.log(`<    ${board[21]}    |    ${board[22]}    |    ${board[23]}    |    ${board[24]}    |    ${board[25]}    >`);
  console.log('<         |         |         |         |         >');
  console.log('***************************************************');
  console.log('');
}


//replaces displayBoard for 5x5
function display5X5Board(board) {
  console.clear();
  // displayGameInfo();
  display1To10(board);
  display11To20(board);
  display21To25(board);
}

//replaces initializeBoard for 5x5
function initialize5X5Board() {
  let board = {};

  for (let square = 1; square <= 25; square++) {
    board[String(square)] = INITIAL_MARKER;
  }
  return board;
}

// replaces findAtRiskSquare and finds defensive or offensive moves
// for the computer.
function findAtRisk5X5Square(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 4) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

//replaces computerChoosesSquare
function computerChooses5X5Square(board) {
  let square;
  for (let index = 0; index < WINNING_5X5_LINES.length; index++) {
    let line = WINNING_5X5_LINES[index];
    square = findAtRisk5X5Square(line, board, COMP_MARKER);
    if (square) break;
    if (!square) {
      square = findAtRisk5X5Square(line, board, HUMAN_MARKER);
      if (square) break;
    }
  }
  if (!square && board[13] === INITIAL_MARKER) {
    square = 13;
  } else if (!square && board[13] !== INITIAL_MARKER) {
    square = getRandomSquare(board);
  }
  board[square] = COMP_MARKER;
}

//replaces detectWinner
// function detect5X5Markers(markerArray, marker) {
//   markerArray.every(square => square === marker);
// }
// special win pattern if player draws an O
function OWinningPattern(board, marker) {
  let winPattern = false;
  if (board[7] === marker &&
    board[8] === marker &&
    board[9] === marker &&
    board[12] === marker &&
    board[14] === marker &&
    board[17] === marker &&
    board[18] === marker &&
    board[19] === marker) {
    winPattern = true;
  }
  return winPattern;
}
//special win pattern if player draws an X
function XWinningPattern(board, marker) {
  let winPattern = false;
  if (board[7] === marker &&
    board[9] === marker &&
    board[13] === marker &&
    board[17] === marker &&
    board[19] === marker) {
    winPattern = true;
  }
  return winPattern;
}
//detects if player or computer has drawn an X or O
function specialPatternWin(board, HUMAN_MARKER) {
  let specialWinner = false;
  if (OWinningPattern(board, HUMAN_MARKER) ||
    XWinningPattern(board, HUMAN_MARKER)) {
    specialWinner = true;
  }
  return specialWinner;
}
//detect the winner of 5x5 using the special win patterns and
//general patterns including southernCross
function detect5X5Winner(board) {
  if (specialPatternWin(board, HUMAN_MARKER)) {
    return PLAYER;
  }
  for (let line = 0; line < WINNING_5X5_LINES.length; line++) {
    let [sq1, sq2, sq3, sq4, sq5] = WINNING_5X5_LINES[line];
    if ([sq1, sq2, sq3, sq4, sq5].every(sq => board[sq] === HUMAN_MARKER)) {
      return PLAYER;
    } else if ([sq1, sq2, sq3, sq4, sq5].every(sq => {
      return board[sq] === COMP_MARKER;
    })) {
      return COMPUTER;
    }
  }
  return null;
}
// allows the player to choose the type of game 3x3 or 5x5
function chooseGameType(GAME_TYPE) {
  let gameTypeChoice;
  console.clear();

  while (true) {
    prompt('Enter [1] to play 3 x 3\n=> Enter [2] to play 5 x 5\n=> Enter [3] for random. ');
    gameTypeChoice = readline.question();
    console.clear();
    if ([1, 2, 3].includes(Number(gameTypeChoice))) break;
    console.log('Incorrect response');
  }
  switch (gameTypeChoice) {
    case '1': typeOfGame = GAME_TYPE[0];
      break;
    case '2': typeOfGame = GAME_TYPE[1];
      break;
    case '3': typeOfGame = GAME_TYPE[randomGameType()];
  }
  return typeOfGame;
}
// when a random game type is selected
function randomGameType() {
  let randomNum = Math.round(Math.random());
  return randomNum;
}
//replaces someoneWon
function someoneWon5x5(board) {
  return !!detect5X5Winner(board);
}
//alternates play based on who's turn it is (who is player1).
function choose5x5Squares(board, player1) {
  if (player1 === PLAYER) {
    display5X5Board(board);
    playerChoosesSquare(board);
    champion(SCORES, winningScore);
    computerChooses5X5Square(board);
  } else {
    display5X5Board(board);
    computerChooses5X5Square(board);
    champion(SCORES, winningScore);
    display5X5Board(board);
    playerChoosesSquare(board);
  }
  return board;
}
//replaces countScores for 5x5 games.
function count5x5Scores(board) {
  if (detect5X5Winner(board) === PLAYER) {
    SCORES[0][1] += 1;
  } else if (detect5X5Winner(board) === COMPUTER) {
    SCORES[1][1] += 1;
  } else if (boardFull(board)) {
    SCORES[2][1] += 1;
  }
  return SCORES;
}
//5x5 game stored in function for readability of main game loop
function playGame5x5() {
  while (matchCount > 0) {
    let board = initialize5X5Board();
    while (true) {
      choose5x5Squares(board, player1);
      alternatePlayer(player1);
      count5x5Scores(board);
      display5X5Board(board);
      if (someoneWon5x5(board) || boardFull(board)) {
        matchCount -= 1;
        break;
      }
    }
  }
}
//Displayes the rules for 5x5
function firstRuleSet() {
  console.clear();
  prompt('The rules for 5 x 5 are similar to 3 x 3.');
  prompt('5 squares horizontally, diagonally or vertically will win the game.');
  prompt('Press enter to contine');
  readline.question();
}
function secondRuleSet() {
  console.clear();
  prompt('One special addition to add to the challenge is the SouthernCross winning pattern');
  prompt('A SouthernCross can be created by marking one of the following patterns');
  prompt('2, 6, 7, 8, 12');
  prompt('4, 8, 9, 10, 14');
  prompt('12, 16, 17, 18, 22');
  prompt('14, 18, 19, 20, 24');
  prompt('8, 12, 13, 14, 18');
  prompt("Remember, the SouthernCross can only be built around 7, 9, 17, 19 and 13");
  prompt('Press enter to contine');
  readline.question();
}
function display5x5Rules() {
  let displayRules = false;
  displayRules = askPlayerAboutRules();
  if (displayRules) {
    firstRuleSet();
    secondRuleSet();
    displaySouthernCross();
    prompt('There are two secret winning patters that may give you an advantage over the computer.');
    prompt('Press enter to contine');
    readline.question();
  }
  return null;
}
//Allows the player to set how many games will be played before
//a winner is declared.
function setMatchCount(matchCount) {
  while (true) {
    prompt('Default championship is 3 rounds. You can choose to play fewer or more.');
    prompt('How many wins are required to be champion?');
    matchCount = readline.question();
    if (Number.isInteger(Number(matchCount)) && matchCount === "") {
      matchCount = 3;
      prompt('Match count is set to 3, press enter to continue.');
      readline.question();
      break;
    }
    if (Number(matchCount) > 0) {
      break;
    }
  }
  return matchCount;
}
//3x3 game wrapped in function for readability of main game
function playGame3x3() {
  while (matchCount > 0) {
    let board = initializeBoard();
    while (true) {
      chooseSquare(board, player1);
      alternatePlayer(player1);
      countScores(board);
      displayBoard(board);
      displayWinner(board);
      if (someoneWon(board) || boardFull(board)) {
        matchCount -= 1;
        break;
      }
    }
  }
}

//Main game loop
while (true) {
  typeOfGame = chooseGameType(GAME_TYPE);
  matchCount = setMatchCount(matchCount);
  winningScore = matchCount;
  chooseFirstTurn(PLAYER_OPTIONS);
  if (typeOfGame === '5lines') {
    display5x5Rules();
    playGame5x5();
  } else if (typeOfGame === '3lines') {
    playGame3x3();
  }
  let theChampion = whoIsTheChampion(SCORES);
  displayChampion(theChampion);
  if (!playAgain()) {
    console.clear();
    prompt('Ok! See you next time!');
    break;
  } else {
    resetGame(player1, SCORES, matchCount);
  }
}