const readline = require('readline-sync');

let cards = {
  Dealer: [],
  Player: [],
  reveal: false
};
let answers = {
  yes: ['y', 'yes', 'yep', 'yeah', 'yup'],
  no: ['n', 'no', 'nope', 'no way']
};
let allCards = {
  suits: ['H', 'D', 'C', 'S'],
  values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
};
let totals = {
  player: 0,
  dealer: 0
};
let scores = {
  Player: 0,
  Dealer: 0,
  Tie: 0
};
let match = {
  Match: 5
};
let gameType = {
  gameTypeNum: 21
};

function prompt(message) {
  console.log(`=> ${message}`);
}
// functions for asking and displaying rules

function askPlayerAboutRules() {
  helloPrompt();
  prompt('Would you like to see the rules (y or n)');
  let playOrNo = readline.question().trim().toLowerCase();
  playOrNo = validateRulesAnswer(playOrNo);
  if (playOrNo[0] === 'y') {
    displayRules();
  }
}

function validateRulesAnswer(playOrNo) {
  while (!Object.values(answers).flat().includes(playOrNo)) {
    helloPrompt();

    if (playOrNo.startsWith('y')) {
      prompt(`It seems like you might mean 'yes'? Hit 'y' to confirm display rules.`);
      playOrNo = readline.question().toLowerCase();
    } else if (playOrNo.startsWith('n')) {
      prompt(`It seems like you might mean 'no' ? Hit 'n' to confirm and continue.`);
      playOrNo = readline.question().toLowerCase();
    } else {
      prompt(`I'm sorry, I'm not sure what you mean. Please try again.`);
      prompt('Would you like to see the rules (y or n)');
      playOrNo = readline.question().toLowerCase();
    }
  }
  return playOrNo;
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
  for (let suitIndex = 0; suitIndex < allCards['suits'].length; suitIndex++) {
    let suit = allCards['suits'][suitIndex];
    for (let valueIndex = 0; valueIndex < allCards['values'].length; valueIndex++) {
      let value = allCards['values'][valueIndex];
      deck.push([suit, value]);
    }
  }
  return shuffle(deck);
}
function beforeDealDisplay() {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(`$  $  $  $  $  $  Let's Play ${gameType['gameTypeNum']}!  $  $  $  $  $  $`);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(` Match: ${match['count']} Player: ${scores['Player']}  Dealer: ${scores['Dealer']} `);
  console.log('');
  if (match['count'] > 0) {
    prompt('Current Cards: Player:  [ ] [ ]   Dealer: [ ]  [ ] ');
    console.log('');
  }
}
function dealCards(deck) {
  beforeDealDisplay();
  let cardsToDeal, typeOfDeal;
  if (gameType['gameTypeNum'] === 21) {
    prompt('Press [ENTER] to deal.');
    for (let count = 0; count < 2; count++) {
      cards['Player'].push(deck.pop(Math.floor(Math.random() * 52)));
      cards['Dealer'].push(deck.pop(Math.floor(Math.random() * 52)));
    }
  } else {
    prompt('Enter [1] for regular deal [2] for bonus deal.');
    typeOfDeal = Number(readline.question());
    typeOfDeal = validateDealType(typeOfDeal);
    dealByType(typeOfDeal, cardsToDeal, deck);
  }
}
function dealByType(typeOfDeal, cardsToDeal, deck) {
  if (typeOfDeal === 1) {
    cardsToDeal = 2;
    for (cardsToDeal; cardsToDeal > 0; cardsToDeal--) {
      cards['Player'].push(deck.pop(Math.floor(Math.random() * 52)));
      cards['Dealer'].push(deck.pop(Math.floor(Math.random() * 52)));
    }
  } else if (typeOfDeal === 2) {
    cardsToDeal = Math.floor(gameType['gameTypeNum'] / 10);
    for (cardsToDeal; cardsToDeal > 0; cardsToDeal--) {
      cards['Player'].push(deck.pop(Math.floor(Math.random() * 52)));
      cards['Dealer'].push(deck.pop(Math.floor(Math.random() * 52)));
    }
  }
}

function validateDealType(typeOfDeal) {
  while (true) {
    if ([1, 2].includes(typeOfDeal)) break;
    console.clear();
    beforeDealDisplay();
    prompt(`Please enter [1] for regular deal [2] for bonus deal (More Cards)`);
    typeOfDeal = Number(readline.question());
  }
  return typeOfDeal;
}
function displayCards() {
  console.clear();
  displayHiddenStats();
  displayDealersCards();
  displayPlayerCards();
  prompt('Press [ENTER] to continue.');
  readline.question();
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
    if (sum > gameType['gameTypeNum']) sum -= 10;
  });

  return sum;
}


function dealerHits(deck) {
  let count = 1;
  while ((totals.dealer < totals.player) || totals.dealer < (gameType['gameTypeNum'] - 4)) {
    if ((busted(cards['Dealer']) || busted(cards['Player']))) break;
    count += 1;
    cards['Dealer'].push(deck.pop(Math.floor(Math.random() * 52)));
    totals.dealer = total(cards['Dealer']);
    dealerTotalsOutput(count, match['count']);
    if (busted(cards['Dealer'])) break;
  }
}

function dealerTotalsOutput(count) {
  if (busted(cards['Dealer'])) {
    displayGameStats();
    prompt(`Dealer draws ${cards['Dealer'][count][1]}`);
    prompt(`Dealers total is ${totals.dealer} , Busted!`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  } else {
    displayGameStats();
    prompt(`Dealer draws ${cards['Dealer'][count][1]}`);
    prompt(`Dealer total is ${totals.dealer}`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  }
}

function revealCards() {
  displayGameStats();
  cards['reveal'] = true;
  if (busted(cards['Player'])) {
    prompt("Player: Busted!");
    displayDealersCards();
    readline.question();
  } else {
    displayDealersCards();
    prompt('Press [ENTER] to continue.');
    readline.question();
  }
}

function displayDealersCards() {
  let string = '[?]';
  if (cards['reveal'] === false) {
    for (let count = 1; count < cards['Dealer'].length; count++) {
      string += ` [${cards['Dealer'][count][1]}]`;
    }
    prompt(`Dealer has ${string}`);
  } else if (cards['reveal'] === true) {
    let string = '';
    for (let count = 0; count < cards['Dealer'].length; count++) {
      string += ` [${cards['Dealer'][count][1]}]`;
    }
    if (busted(cards['Player'])) {
      prompt(`Dealer had ${string}`);
    } else {
      prompt(`Dealer has ${string}`);
    }
  }
}

function displayPlayerCards() {
  let string = ' ';
  for (let count = 0; count < cards['Player'].length; count++) {
    string += ` [${cards['Player'][count][1]}]`;
  }
  prompt(`You have ${string}`);
}

function correctAnswerHitOrStay(hitOrStay) {
  prompt(`Your current hand totals ${totals.player}.`);
  prompt('Press [h] to hit, [s] to stay :');
  hitOrStay = readline.question().toLowerCase();
  while (!['h', 's'].includes(hitOrStay)) {
    displayHiddenStats();
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

function playerHits(deck) {
  let hitOrStay;
  let count = 1;
  while (hitOrStay !== 's' && !busted(cards['Player'])) {
    displayHiddenStats();
    hitOrStay = correctAnswerHitOrStay(hitOrStay);
    if (hitOrStay.toLowerCase() === 'h') {
      count += 1;
      cards['Player'].push(deck.pop(Math.floor(Math.random() * 52)));
      totals.player = total(cards['Player']);
      playersTotalOutput(count);
      hitOrStay = '';
    }
    if (busted(cards['Player'])) break;
  }
}

function playersTotalOutput(count) {
  if (busted(cards['Player'])) {
    displayHiddenStats();
    prompt(`Your total is ${totals.player} , Busted!`);
    prompt('Press [ENTER] to continue.');
    readline.question();
  } else {
    displayHiddenStats();
    prompt(`You drew ${cards['Player'][count][1]}`);
    prompt(`Your current hand totals ${totals.player}.`);
  }

}

function busted(cards) {
  let busted = false;
  if (total(cards) > gameType['gameTypeNum']) {
    busted = true;
  }
  return busted;
}

function playerWins() {
  let playerWin = false;
  if ((!busted(cards['Player']) && busted(cards['Dealer'])) ||
    ((totals.player > totals.dealer) && !busted(cards['Player']))) {
    playerWin = true;
  }
  return playerWin;
}
function dealerWins() {
  let dealerWin = false;
  if ((busted(cards['Player']) && !busted(cards['Dealer'])) ||
    ((totals.player < totals.dealer) && !busted(cards['Dealer']))) {
    dealerWin = true;
  }
  return dealerWin;
}
function itsATie() {
  let tie = false;
  if ((!busted(cards['Player']) && !busted(cards['Dealer'])) &&
    (totals.player === totals.dealer)) {
    tie = true;
  } else if (busted(cards['Player']) && busted(cards['Dealer'])) {
    tie = true;
  }
  return tie;
}

function nameWinner() {
  let theWinner;
  if (playerWins()) {
    theWinner = 'Player';
  } else if (dealerWins()) {
    theWinner = 'Dealer';
  } else if (itsATie()) {
    theWinner = 'Tie';
  }
  return theWinner;
}

function congratulateWinner(winner) {
  console.clear();
  winningDisplay(winner);
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
  let playOrNo;
  let theBool = false;
  console.clear();
  simpleDisplay();
  prompt('Would you like to play again? (y or n)');
  playOrNo = readline.question().trim().toLowerCase();
  playOrNo = validatePlayAgainAnswer(playOrNo);
  if (playOrNo[0] === 'y') {
    theBool = true;
  } else if (playOrNo[0] === 'n') {
    theBool = false;
  }

  return theBool;
}

function validatePlayAgainAnswer(playOrNo) {
  while (!Object.values(answers).flat().includes(playOrNo)) {
    // console.clear();
    console.clear();
    simpleDisplay();
    if (playOrNo.startsWith('y')) {
      prompt(`It seems like you might mean 'yes'? Hit 'y' to confirm and play again.`);
      playOrNo = readline.question().toLowerCase();
    } else if (playOrNo.startsWith('n')) {
      prompt(`It seems like you might mean 'no' ? Hit 'n' to confirm and end the game.`);
      playOrNo = readline.question().toLowerCase();
    } else {
      prompt(`I'm sorry, I'm not sure what you mean. Please try again.`);
      playOrNo = readline.question().toLowerCase();
    }
  }
  return playOrNo;
}

function resetGame() {
  cards['Dealer'].length = 0;
  cards['Player'].length = 0;
  totals['player'] = 0;
  totals['dealer'] = 0;
  match['count'] = 5;
  gameType['gameTypeNum'] = 21;
}
function resetMatch() {
  cards['Dealer'].length = 0;
  cards['Player'].length = 0;
  cards['reveal'] = false;
}

function updateTotals() {
  totals.player = total(cards['Player']);
  totals.dealer = total(cards['Dealer']);
}

// display functions
function displayHiddenStats() {
  console.clear();
  let playerDisplay = `Player:  `;
  let dealerDisplay = `Dealer: `;
  playerDisplay = playerCardDisplay(playerDisplay, cards['Player']);
  dealerDisplay = dealerHiddenCardDisplay(dealerDisplay, cards['Dealer']);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log("$  $  $  $  $  $    Good Luck!   $  $  $  $  $  $");
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(` Match: ${match['count']} Player: ${scores['Player']}  Dealer: ${scores['Dealer']} `);
  console.log(`Current Cards: ${playerDisplay}  ${dealerDisplay}`);
  console.log('');
}
function displayGameStats() {
  console.clear();
  let playerDisplay = `Player:  `;
  let dealerDisplay = `Dealer: `;
  playerDisplay = playerCardDisplay(playerDisplay, cards['Player']);
  dealerDisplay = dealerCardDisplay(dealerDisplay, cards['Dealer']);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log("$  $  $  $  $  $    Good Luck!   $  $  $  $  $  $");
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(` Match: ${match['count']} Player: ${scores['Player']}  Dealer: ${scores['Dealer']} `);
  console.log(`Current Cards: ${playerDisplay}  ${dealerDisplay}`);
  console.log('');
}

function winningDisplay(winner) {
  if (winner !== 'Tie') {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`$  $  $  $  ${winner} Wins Match ${match['count'] + 1}  $  $  $  $`);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(` Match: ${match['count']} Player: ${scores['Player']}  Dealer: ${scores['Dealer']} `);
  } else {
    {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log(`$  $  $  $  $  $  $   PUSH!   $  $  $  $  $  $  $`);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log(` Match: ${match['count']} Player: ${scores['Player']}  Dealer: ${scores['Dealer']} `);
    }
  }
}

function simpleDisplay() {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(`$  $  $  $  $  $  Let's Play ${gameType['gameTypeNum']}!  $  $  $  $  $  $`);
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
  console.log(`          /////       ${gameType['gameTypeNum']}!     |||| `);
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
  console.log(`            /// Closest to ${gameType['gameTypeNum']} |||| `);
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
function rulePrompt5() {
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
function rulePrompt4() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\           ///||| ");
  console.log('       |||   \\\\\\\\\\         ////||| ');
  console.log("       |||   |////        ////|||| ");
  console.log("             //// Bonus deals |||| ");
  console.log("            ////   will give  |||| ");
  console.log("          ////  more cards for ||| ");
  console.log("        /////| the first hand |||| ");
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
  rulePrompt5();
}
function goodbyePrompts() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\ Thank you ///||| ");
  console.log('       |||   \\\\\\\\\\         ////||| ');
  console.log("       |||   |////    for ////|||| ");
  console.log("             ////   Playing   |||| ");
  console.log("            ////              |||| ");
  console.log(`          /////       ${gameType['gameTypeNum']}!     |||| `);
  console.log("        /////|                |||| ");
  console.log("       |||||||||||||      ||||||||||||| ");
  console.log('');
  console.log(` Feel like you don't know when to stop? Visit https://www.ncpgambling.org for help.`);
  console.log('');
}

function matchWinnerPrompt(matchWinner) {
  if (matchWinner !== 'Tie' && match['count'] === 0) {
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
  } else if (matchWinner === 'Tie' && match['count'] === 0) {
    displayTie();
  }
}
function displayTie() {
  console.clear();
  console.log("         _______             _____ ");
  console.log("        //||||||\\           ///||| ");
  console.log('       |||   \\\\\\\\\\         ////||| ');
  console.log("       |||   |////    /\\  ////|||| ");
  console.log(`              ////    \\/      |||| `);
  console.log(`            ////      /\\      |||| `);
  console.log("          /////      |  |     |||| ");
  console.log("        /////|       |  |     |||| ");
  console.log("       |||||||||||||  \\/   ||||||||||||| ");
  console.log('');
  console.log(`It's a... tie...`);
  console.log("Press [Enter] to continue.");
  readline.question();

}
// choose 21, 31, 41, 51
function chooseGameType() {
  let gameTypeChoice;
  helloPrompt();
  prompt(`If you would like to play something other than 21`);
  prompt(`enter 31, 41, 51.`);
  prompt(`Press [ENTER] for default`);
  gameTypeChoice = readline.question();
  validateGameType(gameTypeChoice);

  return gameTypeChoice;
}

function validateGameType(gameTypeChoice) {
  if (gameTypeChoice === '') {
    gameTypeChoice = 21;
  }
  while (![21, 31, 41, 51].includes(Number(gameTypeChoice))) {
    helloPrompt();
    if (gameTypeChoice === '') {
      gameTypeChoice = 21;
      break;
    }
    prompt(`Please enter 31, 41 or 51 for your game type.`);
    prompt('Press [ENTER] for default');
    gameTypeChoice = readline.question();
  }
  gameType['gameTypeNum'] = Number(gameTypeChoice);
  return gameTypeChoice;
}


// match count and play again functions
function countScores(winner) {
  if (winner === 'Player') {
    scores['Player'] += 1;
  } else if (winner === 'Dealer') {
    scores['Dealer'] += 1;
  } else {
    scores['Player'] += 1;
    scores['Dealer'] += 1;
  }
}
function checkMatchWin() {
  let matchOver = false;
  if (match['count'] === 0) {
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
    match['count'] = readline.question();
    if (!Number.isInteger(Number(match['count']))) {
      match['count'] = 5;
      prompt('Match count is set to 5, press enter to continue.');
      readline.question();
      break;
    }
    if (Number(match['count']) > 0) break;
  }
}

function whoIsTheMatchWinner(matchWinner) {
  if (scores['Player'] > scores['Dealer']) {
    matchWinner = 'Player';
  } else if (scores['Player'] < scores['Dealer']) {
    matchWinner = 'Dealer';
  } else {
    matchWinner = 'Tie';
  }
  return matchWinner;
}

function winnerCalcAndDisplay() {
  let winner = nameWinner();
  let matchWinner;
  match['count'] -= 1;
  countScores(winner);
  winningDisplay(winner);
  congratulateWinner(winner);
  checkMatchWin();
  matchWinner = whoIsTheMatchWinner(matchWinner);
  matchWinnerPrompt(matchWinner);
  resetMatch();
}

function chooseGameDisplayRules() {
  chooseGameType();
  askPlayerAboutRules();
  setMatchCount();
}
function singleGameLoop() {
  while (match['count'] > 0) {
    let deck = initializeDeck();
    console.clear();
    dealCards(deck);
    updateTotals();
    displayCards();
    playerHits(deck);
    revealCards();
    updateTotals();
    dealerHits(deck);
    winnerCalcAndDisplay();
  }
}
function playTotalGame() {
  while (true) {
    chooseGameDisplayRules();
    singleGameLoop();
    if (!playAgain()) {
      goodbyePrompts();
      break;
    } else {
      resetGame();
    }
  }
}

playTotalGame();