const MSG = require('./calculator_messages.json');

const readline = require('readline-sync');

function yesOrNo(response) {
  while (['y', 'n'].includes(response) === false) {
    prompt(MSG['en']['yesOrNo']);
    response = readline.question();
  }
  return response;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

while (true) {

  console.clear();
  prompt(MSG['en']['greet']);

  prompt(MSG['en']['number1']);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(MSG['en']['numNotValid']);
    number1 = readline.question();
  }

  prompt(MSG['en']['number2']);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(MSG['en']['numNotValid']);
    number2 = readline.question();
  }

  prompt(MSG['en']['chooseOperator']);
  let operation = readline.question();

  console.clear();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MSG['en']['correctOperator']);
    operation = readline.question();
  }

  let output;

  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(MSG['en']['result'] + output);
  prompt(MSG['en']['anotherCalculation']);

  let answer = readline.question();

  answer = yesOrNo(answer);

  if (answer !== 'y') break;
}

console.clear();
prompt(MSG['en']['thanks']);
