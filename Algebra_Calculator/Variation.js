const readline = require('readline-sync');
let calculationChoice = '';
// let formula = '';
function prompt(message) {
  console.log(`=> ${message}`);
}
let y = 'y';
let k = 'k';
let x = 'x';
let z = 'z';

//DVV is direct variation variables
const DVV = {
  y: 'y',
  x: 'x',
  z: 'z'
}

function directVariationFormula(y, k, x) {
  +k = +y / +x;
  console.log(`k is equal to ${k}`);
  +y = +k * +x;
  console.log(`If x = ${x} y = ${y}`);
}
function chooseFormula(calculationChoice) {
  switch (calculationChoice) {
    case '1': directVariationFormula(y, x, z);
  }
}

prompt('Welcome to the calculator.\n Choose the calculation to perform. \n1) Direct Variation');
calculationChoice = readline.question();

chooseFormula(calculationChoice);
prompt('The Formula is y = kx, Enter a value for y');
y = readline.question();
prompt('Enter a value for x');
x = readline.question();
directVariationFormula();
