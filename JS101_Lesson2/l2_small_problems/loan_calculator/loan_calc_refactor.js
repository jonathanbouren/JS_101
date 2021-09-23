const readline = require('readline-sync');

const MSG = require('./loan_calculator_messages.json');

function prompt(message) {
  console.log("=> " + message);
}
let answer = '';
let principle = '';
let durationMonths = '';
let durationYears = '';
let totalDurationMonths = '';
let interest = 0;
let interestAns = '';
let monthlyInterest = '';
let payment = '';

// Number validations
function validAmount(amount) {
  if (!isNaN(amount)
    && (amount > 0)) {
    return amount;
  } else {
    return null;
  }
}

function validMonths(timeM) {
  if (!isNaN(timeM)
    && Number.isInteger(+timeM)
    && (timeM >= 0)) {
    return timeM;
  } else {
    return null;
  }
}

function validYears(timeY) {
  if (!isNaN(timeY)
    && Number.isInteger(+timeY)
    && (timeY >= 0)) {
    return timeY;
  } else {
    return null;
  }
}

function validInterest(percent) {
  if (!isNaN(percent)
    && (percent >= 0)) {
    return percent;
  } else {
    return null;
  }
}
//zero parameters for second calculation
// function zeroParameters() {
//   let answer = '';
//   let principle = '';
//   let durationMonths = '';
//   let durationYears = '';
//   let totalDurationMonths = '';
//   let interest = '';
//   let interestAns = '';
//   let monthlyInterest = '';
//   let payment = '';
// }
//number functions
function getLoan() {
  prompt(MSG['principle']);
  principle = readline.question();

  while (!validAmount(principle)) {
    console.clear();
    prompt(MSG['invalidAmount']);
    principle = readline.question();
  }
  console.clear();
  return principle;
}

function getYears() {
  prompt(MSG['enterYears']);
  durationYears = readline.question();

  while (!validYears(durationYears)) {
    console.clear();
    prompt(MSG['invalidYears']);
    durationYears = readline.question();
  }
  return durationYears;
}

function getMonths() {
  prompt(MSG['enterMonths']);
  durationMonths = readline.question();

  while (!validMonths(durationMonths)) {
    console.clear();
    prompt(MSG['invalidMonths']);
    durationMonths = readline.question();
  }
  return durationMonths;
}

function getTotalMonths() {
  do {
    durationYears = getYears();
    durationMonths = getMonths();
    if ((+durationMonths + (+durationYears) === 0)) {
      console.clear();
      prompt(MSG['zeroTime']);
    } else {
      totalDurationMonths = +durationMonths + (durationYears * 12);
    }
  } while (+totalDurationMonths === 0);
  return totalDurationMonths;
}

function getInterest() {
  console.clear();
  prompt(MSG['getInterest']);
  interest = readline.question();

  while (!validInterest(interest)) {
    console.clear();
    prompt(MSG['invalidInterest']);
    interest = readline.question();
  }
  return interest;
}

function getMonthlyInterest() {
  do {
    if (+interest === 0) {
      fixZeroInterest();
    } else {
      interest /= 100;
      monthlyInterest = interest / 12;
      console.clear();
      interestAns = 'y';
      break;
    }
  } while (interestAns === 'n');
  console.clear();
  return monthlyInterest;
}

function askToCalculateAgain() {
  prompt(MSG['anotherLoan']);
  answer = readline.question();

  while (!['y', 'n'].includes(answer)) {
    console.clear();
    prompt(MSG['yesOrNo']);
    answer = readline.question();
  }
  return answer;
}

function calculate(principle, totalDurationMonths, monthlyInterest) {
  payment = principle * (
    monthlyInterest / (1 - Math.pow((1
      + monthlyInterest), (-totalDurationMonths))));
  return payment;
}

function zeroInterestCalculate() {
  payment = principle / totalDurationMonths;
  return payment;
}

function getPayment() {
  if (+interest === 0) {
    payment = zeroInterestCalculate();
  } else {
    payment = calculate(principle, totalDurationMonths, monthlyInterest);
  }
  return payment;
}

function fixZeroInterest() {
  prompt(MSG['interestZero']);
  interestAns = readline.question();

  while (!['y', 'n'].includes(interestAns)) {
    console.clear();
    prompt(MSG['yesOrNoInterest']);
    interestAns = readline.question();
  }

  if (interestAns === 'n') {
    return getInterest();
  } else {
    interest = 0;
  }

  return interestAns;
}


// main loop
console.clear();
prompt(MSG['welcome']);
do {
  principle = getLoan();
  totalDurationMonths = getTotalMonths();
  interest = getInterest();
  monthlyInterest = getMonthlyInterest();
  payment = getPayment();
  prompt(MSG['paymentMessage'] + payment.toFixed(2));
  answer = askToCalculateAgain();
} while (answer === 'y');
console.clear();
prompt(MSG['thankYou']);
