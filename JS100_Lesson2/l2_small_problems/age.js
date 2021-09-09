let rlSync = require('readline-sync')

let yourAge = Number(rlSync.question("How old are you?  "))

function ageAdder(age) {
  count = 1
  while (count < 5) {
    console.log(`You are ${age}, in ${count * 10} years you will be ${age + (count * 10)}`);
    count++;

  }
}
ageAdder(yourAge)
