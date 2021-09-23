const readline = require('readline-sync');

const MSG = require('./loan_calculator_messages.json');
let answer = '';
let principle = '';
let durationMonths = '';
let durationYears = '';
let totalDurationMonths = '';
let interest = '';
let interestAns = 'n';
let monthlyInterest = '';
let payment = '';

function prompt(message) {
  console.log("=> " + message);
}

function validAmount(amount) {
  if (!isNaN(amount)
    && (amount > 0)) {
    return amount;
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

function validMonths(timeM) {
  if (!isNaN(timeM)
    && Number.isInteger(+timeM)
    && (timeM >= 0)) {
    return timeM;
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

function calculate(principle, totalDurationMonths, monthlyInterest) {
  payment = principle * (
    monthlyInterest / (1 - Math.pow((1
      + monthlyInterest), (-totalDurationMonths))));
  return payment;
}

console.clear();
prompt(MSG['welcome']);

do {

  prompt(MSG['principle']);
  principle = readline.question();

  while (!validAmount(principle)) {
    console.clear();
    prompt(MSG['invalidAmount']);
    principle = readline.question();
  }
  console.clear();
  do {

    prompt(MSG['enterYears']);
    durationYears = readline.question();

    while (!validYears(durationYears)) {
      console.clear();
      prompt(MSG['invalidAmount']);
      durationYears = readline.question();
    }

    console.clear();
    prompt(MSG['enterMonths']);
    durationMonths = readline.question();

    while (!validMonths(durationMonths)) {
      console.clear();
      prompt(MSG['invalidMonths']);
      durationMonths = readline.question();
    }
    if ((+durationMonths + (+durationYears) === 0)) {
      console.clear();
      prompt(MSG['zeroTime']);
    } else {
      totalDurationMonths = +durationMonths + (durationYears * 12);
    }

  }
  while (+totalDurationMonths === 0);
  do {
    console.clear();
    prompt(MSG['getInterest']);
    interest = readline.question();

    while (!validInterest(interest)) {
      console.clear();
      prompt(MSG['invalidInterest']);
      interest = readline.question();
    }
    if (+interest === 0) {
      prompt(MSG['interestZero']);
      interestAns = readline.question();
    } else {
      interest /= 100;
      monthlyInterest = interest / 12;
      console.clear();
      interestAns = 'y';
    }
  }
  while (interestAns === 'n');

  calculate(principle, totalDurationMonths, monthlyInterest);
  prompt(MSG['paymentMessage'] + payment.toFixed(2));

  prompt(MSG['anotherLoan']);
  answer = readline.question();

  while (!['y', 'n'].includes(answer)) {
    console.clear();
    prompt(MSG['yesOrNo']);
    answer = readline.question();
  }
}
while (answer === 'y');
console.clear();
prompt(MSG['thankYou']);
