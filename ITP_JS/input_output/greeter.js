// let rlSync = require('readline-sync');
//
// let number1 = (rlSync.question('Enter the first number\n'));
//
//
// console.log(`The numbers ${number1} and ${number2} add to ${sum}`);

let rlSync = require('readline-sync');

let firstName = (rlSync.question("What is your first name?  :"))
let lastName = (rlSync.question("What is your last name?  :"))

console.log(`Hello, ${firstName} ${lastName} !`)
