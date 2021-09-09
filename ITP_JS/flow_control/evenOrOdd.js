let rlSync = require('readline-sync')

let num = Number(rlSync.question("What is the number? :"))

if (Number.isInteger(num) === false) {
  console.log("That's not an integer.")
}
else if  (num % 2 === 0) {
  console.log(`${num} is even! `);
}
else {
  console.log(`${num} is odd! `);
}
