

const readline = require('readline-sync');
const DEALER_CARDS = [];
const HUMAN_CARDS = [];
const YES_NO = [['y', 'yes', 'yep', 'yeah', 'yup'], ['n', 'no', 'nope', 'no way']];
const SUITS = ['H', 'D', 'C', 'S'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const PLAYER_TOT = [[0], [1]];
const DEALER_TOT = [[0], [1]];
const SCORES = [
  ['Player :', 0],
  [' Dealer :', 0],
  [' Tie :', 0]
];
const DEALER = 'Dealer';
const PLAYER = 'Player';
const NONE = ' Tie ';
const MATCH_COUNT = [[], [1]];

function prompt(message) {
  console.log(`=> ${message}`);
}
// functions for asking and displaying rules

function askPlayerAboutRules() {
  helloPrompt();
  prompt('Would you like to see the rules (y or n)');
  let answer = readline.question().trim().toLowerCase();
  answer = incorrectRulesAnswerLoop(answer);
  if (answer[0] === 'y') {
    displayRules();
  }
}

function incorrectRulesAnswerLoop(answer) {
  while (!YES_NO.flat().includes(answer)) {
    helloPrompt();

    if (answer.startsWith('y') && !YES_NO[0].includes(answer)) {
      prompt(`It seems like you might mean 'yes'? Hit 'y' to confirm display rules.`);
      answer = readline.question().toLowerCase();
    } else if (answer.startsWith('n') && !YES_NO[1].includes(answer)) {
      prompt(`It seems like you might mean 'no' ? Hit 'n' to confirm and continue.`);
      answer = readline.question().toLowerCase();
    } else {
      prompt(`I'm sorry, I'm not sure what you mean. Please try again.`);
      prompt('Would you like to see the rules (y or n)');
      answer = readline.question().toLowerCase();
    }
  }
  return answer;
}

function shuffle(array) {
  for (let first = array.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1));
    [array[first], array[second]] = [array[second], array[first]];
  }
  return array;
}

function initializeDeck() {
  let deck = [];
  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];
    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }
  return shuffle(deck);
}

function dealCards(deck, MATCH_COUNT) {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log("$  $  $  $  $  $  Let's Play 21!  $  $  $  $  $  $");
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(` Match: ${MATCH_COUNT[0]} Player: ${SCORES[0][1]}  Dealer: ${SCORES[1][1]} `);
  console.log('');
  if (MATCH_COUNT[0] > 0) {
    prompt('Current Cards: Player:  [ ] [ ]   Dealer: [ ]  [ ] ');
    console.log('');
    prompt('Press [ENTER] to deal.');
    readline.question();
  }
  for (let cardsToDeal = 2; cardsToDeal > 0; cardsToDeal--) {
    HUMAN_CARDS.push(deck.pop(Math.floor(Math.random() * 52)));
    DEALER_CARDS.push(deck.pop(Math.floor(Math.random() * 52)));
  }
}

function displayCards(deck, MATCH_COUNT) {
  console.clear();
  displayHiddenStats(MATCH_COUNT);

  prompt(`Dealer has [?] and [${DEALER_CARDS[1][1]}].`);
  prompt(`You have [${HUMAN_CARDS[0][1]}] and [${HUMAN_CARDS[1][1]}]`);
  prompt('Press [ENTER] to continue.');
  readline.question();
  return deck;
}

function total(currentCards) {
  let values = currentCards.map(card => card[1]);
  let sum = 0;

  values.forEach(value => {
    if (value === "Ace") {
      sum += 11;
    } else if (['Jack', 'Queen', 'King'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });
  values.filter(value => value === "Ace").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function dealerHits(deck) {
  let count = 1;
  while ((DEALER_TOT[0] <= PLAYER_TOT[0]) && DEALER_TOT[0] < 21) {
    if ((busted(DEALER_CARDS) || busted(HUMAN_CARDS))) break;
    count += 1;
    DEALER_CARDS.push(deck.pop(Math.floor(Math.random() * 52)));
    DEALER_TOT[0] = total(DEALER_CARDS);
    dealerTotalsOutput(count, MATCH_COUNT[0]);
    if (busted(DEALER_CARDS)) break;
  }
}

function dealerTotalsOutput(count, MATCH_COUNT) {
  if (busted(DEALER_CARDS)) {
    displayGameStats(MATCH_COUNT);
    prompt(`Dealer draws ${DEALER_CARDS[count][1]}`);
    prompt(`Dealers total is ${DEALER_TOT[0]} , Busted!`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  } else {
    displayGameStats(MATCH_COUNT);
    prompt(`Dealer draws ${DEALER_CARDS[count][1]}`);
    prompt(`Dealer total is ${DEALER_TOT[0]}`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  }
}

function revealCards(MATCH_COUNT) {
  displayGameStats(MATCH_COUNT);
  if (busted(HUMAN_CARDS)) {
    prompt("Player: Busted!");
    prompt(`Dealer had ${DEALER_CARDS[0][1]} and ${DEALER_CARDS[1][1]}`);
    readline.question();
  } else {
    prompt(`Dealer has ${DEALER_CARDS[0][1]} and ${DEALER_CARDS[1][1]}`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  }
}

function correctAnswerHitOrStay(hitOrStay, MATCH_COUNT) {
  prompt(`Your current hand totals ${PLAYER_TOT[0]}.`);
  prompt('Press [h] to hit, [s] to stay :');
  hitOrStay = readline.question().toLowerCase();
  while (!['h', 's'].includes(hitOrStay)) {
    displayHiddenStats(MATCH_COUNT);
    if (hitOrStay.startsWith('h')) {
      prompt(`It seems like you might mean 'hit'? Hit 'h' to confirm.`);
      hitOrStay = readline.question().toLowerCase();
    } else if (hitOrStay.startsWith('s')) {
      prompt(`It seems like you might mean 'stay' ? Hit 's' to confirm.`);
      hitOrStay = readline.question().toLowerCase();
    } else {
      prompt(`I'm sorry, I'm not sure what you mean. Please try again.`);
      prompt('Press [h] to hit, [s] to stay :');
      hitOrStay = readline.question().toLowerCase();
    }
  }
  return hitOrStay.toLowerCase();
}

function playerHits(deck, MATCH_COUNT) {
  let hitOrStay;
  let count = 1;
  while (hitOrStay !== 's' && !busted(HUMAN_CARDS)) {
    displayHiddenStats(MATCH_COUNT);
    hitOrStay = correctAnswerHitOrStay(hitOrStay, MATCH_COUNT);
    if (hitOrStay.toLowerCase() === 'h') {
      count += 1;
      HUMAN_CARDS.push(deck.pop(Math.floor(Math.random() * 52)));
      PLAYER_TOT[0] = total(HUMAN_CARDS);
      playersTotalOutput(count, MATCH_COUNT);
      hitOrStay = '';
    }
    if (busted(HUMAN_CARDS)) break;
  }
}

function playersTotalOutput(count, MATCH_COUNT) {
  if (busted(HUMAN_CARDS)) {
    displayHiddenStats(MATCH_COUNT);
    prompt(`Your total is ${PLAYER_TOT[0]} , Busted!`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  } else {
    displayHiddenStats(MATCH_COUNT);
    prompt(`You drew ${HUMAN_CARDS[count][1]}`);
    prompt(`Your current hand totals ${PLAYER_TOT[0]}.`);
  }

}

function busted(cards) {
  let busted = false;
  if (total(cards) > 21) {
    busted = true;
  }
  return busted;
}

function playerWins() {
  let player = false;
  if ((!busted(HUMAN_CARDS) && busted(DEALER_CARDS)) ||
    ((PLAYER_TOT[0] > DEALER_TOT[0]) && !busted(HUMAN_CARDS))) {
    player = true;
  }
  return player;
}
function dealerWins() {
  let dealer = false;
  if ((busted(HUMAN_CARDS) && !busted(DEALER_CARDS)) ||
    ((PLAYER_TOT[0] < DEALER_TOT[0]) && !busted(DEALER_CARDS))) {
    dealer = true;
  }
  return dealer;
}
function itsATie() {
  let tie = false;
  if ((!busted(HUMAN_CARDS) && !busted(DEALER_CARDS)) &&
    (PLAYER_TOT[0] === DEALER_TOT[0])) {
    tie = true;
  } else if (busted(HUMAN_CARDS) && busted(DEALER_CARDS)) {
    tie = true;
  }
  return tie;
}

function nameWinner(winner) {
  if (playerWins()) {
    winner = 'Player';
  } else if (dealerWins()) {
    winner = 'Dealer';
  } else if (itsATie()) {
    winner = 'Tie';
  }
  return winner;
}

function congratulateWinner(winner, MATCH_COUNT) {
  console.clear();
  winningDisplay(winner, MATCH_COUNT);
  if (winner === 'Tie') {
    console.log('');
    prompt(`It was a tie, better luck next time.`);
    prompt('Press [Enter] to continue');
    readline.question();
  } else {
    console.log('');
    prompt(`Congratulations ${winner}!`);
    prompt('Press [Enter] to continue.');
    readline.question();
  }
  return winner;
}

function playerCardDisplay(playerDisplay, cardsToDisplay) {
  cardsToDisplay.forEach(card => {
    playerDisplay += ` [${card[1]}]`;
  });
  return playerDisplay;
}

function dealerCardDisplay(dealerDisplay, cardsToDisplay) {
  cardsToDisplay.forEach(card => {
    dealerDisplay += ` [${card[1]}]`;
  });
  return dealerDisplay;
}

function dealerHiddenCardDisplay(dealerDisplay, cardsToDisplay) {
  dealerDisplay = `Dealer: [?]  `;
  cardsToDisplay.forEach(card => {
    if (cardsToDisplay.indexOf(card) !== 0) {
      dealerDisplay += ` [${card[1]}]`;
    }
  });
  return dealerDisplay;
}


function playAgain() {
  let answer;
  let theBool = false;
  console.clear();
  simpleDisplay();
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

function incorrectAnswerLoop(answer, MATCH_COUNT) {
  while (!YES_NO.flat().includes(answer)) {
    // console.clear();
    console.clear();
    simpleDisplay(MATCH_COUNT);
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

function resetGame() {
  DEALER_CARDS.length = 0;
  HUMAN_CARDS.length = 0;
  PLAYER_TOT[0] = [];
  DEALER_TOT[0] = [];
  MATCH_COUNT[0] -= 1;
}

function updateTotals() {
  PLAYER_TOT[0] = total(HUMAN_CARDS);
  DEALER_TOT[0] = total(DEALER_CARDS);
}

// display functions
function displayHiddenStats(MATCH_COUNT) {
  console.clear();
  let playerDisplay = `Player:  `;
  let dealerDisplay = `Dealer: `;
  playerDisplay = playerCardDisplay(playerDisplay, HUMAN_CARDS);
  dealerDisplay = dealerHiddenCardDisplay(dealerDisplay, DEALER_CARDS);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log("$  $  $  $  $  $    Good Luck!   $  $  $  $  $  $");
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(` Match: ${MATCH_COUNT[0]} Player: ${SCORES[0][1]}  Dealer: ${SCORES[1][1]} `);
  console.log(`Current Cards: ${playerDisplay}  ${dealerDisplay}`);
  console.log('');
}
function displayGameStats(MATCH_COUNT) {
  console.clear();
  let playerDisplay = `Player:  `;
  let dealerDisplay = `Dealer: `;
  playerDisplay = playerCardDisplay(playerDisplay, HUMAN_CARDS);
  dealerDisplay = dealerCardDisplay(dealerDisplay, DEALER_CARDS);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log("$  $  $  $  $  $    Good Luck!   $  $  $  $  $  $");
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(` Match: ${MATCH_COUNT[0]} Player: ${SCORES[0][1]}  Dealer: ${SCORES[1][1]} `);
  console.log(`Current Cards: ${playerDisplay}  ${dealerDisplay}`);
  console.log('');
}

function winningDisplay(winner, MATCH_COUNT) {
  if (winner !== 'Tie') {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`$  $  $  $  ${winner} Wins Match ${MATCH_COUNT[0]}  $  $  $  $`);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(` Match: ${MATCH_COUNT[0]} Player: ${SCORES[0][1]}  Dealer: ${SCORES[1][1]} `);
  }
}

function simpleDisplay() {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log("$  $  $  $  $  $  Let's Play 21!  $  $  $  $  $  $");
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('');
}


function helloPrompt() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\           ///||| ");
  console.log('       |||   \\\\\\\\\\         ////||| ');
  console.log("       |||   |////        ////|||| ");
  console.log("             ////  WELCOME    |||| ");
  console.log("            ////     TO       |||| ");
  console.log("          /////       21!     |||| ");
  console.log("        /////|                |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
}

function rulePrompt1() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\    The    ///||| ");
  console.log('       |||   \\\\\\\\\\  rules  ////||| ');
  console.log("       |||   |////   are  ////|||| ");
  console.log("             ////  simple.    |||| ");
  console.log("            /// Closest to 21 |||| ");
  console.log("          //// without Busting ||| ");
  console.log("        /////   (going over)  |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
  console.log(`          Press [Enter] to continue`);
  readline.question();
}
function rulePrompt2() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\  Kings    ///||| ");
  console.log('       |||   \\\\\\\\\\ Queens  ////||| ');
  console.log("       |||   |////  and   ////|||| ");
  console.log("             ////  Jacks      |||| ");
  console.log("            ////  are worth   |||| ");
  console.log("          /////   10 points   |||| ");
  console.log("        /////  Aces = 1 or 11 |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
  console.log(`          Press [Enter] to continue`);
  readline.question();
}
function rulePrompt3() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\           ///||| ");
  console.log('       |||   \\\\\\\\\\         ////||| ');
  console.log("       |||   |////        ////|||| ");
  console.log("             //// All other   |||| ");
  console.log("            //// cards equal  |||| ");
  console.log("          ///// their numeric |||| ");
  console.log("        /////|      value     |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
  console.log(`          Press [Enter] to continue`);
  readline.question();
}
function rulePrompt4() {
  console.clear();
  console.log("         _______May          _____ ");
  console.log("        //||||||\\the        ///||| ");
  console.log('       |||   \\\\\\\\\\odds     ////||| ');
  console.log("       |||   |//// be     ////|||| ");
  console.log("             ////   ever      |||| ");
  console.log("            ////      in      |||| ");
  console.log("          /////        your   |||| ");
  console.log("        /////|          favor |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
  console.log(`          Press [Enter] to continue`);
  readline.question();
}

function displayRules() {
  rulePrompt1();
  rulePrompt2();
  rulePrompt3();
  rulePrompt4();
}
function goodbyePrompts() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\ Thank you ///||| ");
  console.log('       |||   \\\\\\\\\\         ////||| ');
  console.log("       |||   |////    for ////|||| ");
  console.log("             ////   Playing   |||| ");
  console.log("            ////              |||| ");
  console.log("          /////       21!     |||| ");
  console.log("        /////|                |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
  console.log(` Feel like you don't know when to stop? Visit https://www.ncpgambling.org for help.`);
  console.log('');
}

function matchWinnerPrompt(matchWinner) {
  if (matchWinner !== 'Tie' && MATCH_COUNT[0] === 1) {
    console.clear();
    console.log("         _______             _____ ");
    console.log("        //||||||\\           ///||| ");
    console.log('       |||   \\\\\\\\\\         ////||| ');
    console.log("       |||   |////        ////|||| ");
    console.log(`              ////            |||| `);
    console.log(`            ////   ${matchWinner}     |||| `);
    console.log("          /////      WINS!    |||| ");
    console.log("        /////|                |||| ");
    console.log("       |||||||||||||      ||||||||||||| ");
    console.log('');
    console.log("Press [Enter] to continue.");
    readline.question();
  }
}


// match count and play again functions
function countScores(winner) {
  if (winner === PLAYER) {
    SCORES[0][1] += 1;
  } else if (winner === DEALER) {
    SCORES[1][1] += 1;
  } else {
    SCORES[2][1] += 1;
  }
  return SCORES;
}
function checkMatchWin(MATCH_COUNT) {
  let matchOver = false;
  if (MATCH_COUNT[0] === 0) {
    matchOver = true;
  }
  return matchOver;
}

function setMatchCount() {
  while (true) {
    console.clear();
    simpleDisplay();
    prompt('The default winning match score is 5.\n => You can choose to play fewer or more.');
    prompt('What score would you like to play to?');
    MATCH_COUNT[0] = readline.question();
    if (!Number.isInteger(Number(MATCH_COUNT[0]))) {
      MATCH_COUNT[0] = 5;
      prompt('Match count is set to 5, press enter to continue.');
      readline.question();
      break;
    }
    if (Number(MATCH_COUNT[0]) > 0) break;
    console.log(MATCH_COUNT);
    readline.question();
  }
}

function whoIsTheMatchWinner(SCORES, matchWinner) {
  if (SCORES[0][1] > SCORES[1][1]) {
    matchWinner = PLAYER;
  } else if (SCORES[0][1] < SCORES[1][1]) {
    matchWinner = DEALER;
  } else {
    matchWinner = NONE;
  }
  return matchWinner;
}

function winnerCalcAndDisplay(MATCH_COUNT) {
  let winner = nameWinner();
  let matchWinner;
  countScores(winner);
  winningDisplay(winner, MATCH_COUNT);
  congratulateWinner(winner, MATCH_COUNT);
  checkMatchWin(SCORES, MATCH_COUNT);
  matchWinner = whoIsTheMatchWinner(SCORES,matchWinner);
  matchWinnerPrompt(matchWinner);
}

function singleGameLoop(MATCH_COUNT) {
  while (MATCH_COUNT[0] > 0) {
    let deck = initializeDeck();
    console.clear();
    dealCards(deck, MATCH_COUNT);
    updateTotals();
    displayCards(MATCH_COUNT);
    playerHits(deck, MATCH_COUNT);
    revealCards(MATCH_COUNT);
    updateTotals();
    dealerHits(deck);
    winnerCalcAndDisplay(MATCH_COUNT);
    resetGame();
  }
}
function playTotalGame() {
  while (true) {
    askPlayerAboutRules();
    setMatchCount();
    singleGameLoop(MATCH_COUNT);
    if (!playAgain()) {
      goodbyePrompts();
      break;
    } else {
      resetGame();
      MATCH_COUNT[0] = [];
    }
  }
}

playTotalGame();
