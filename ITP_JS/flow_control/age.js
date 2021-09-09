let rlSync = require('readline-sync')

let yourAge = Number(rlSync.question("How old are you?  "))


  console.log(`You are ${yourAge} years old. `)

  for(let count = 1; count <= 5; count +=1){ console.log(`In ${count * 10} years you will be ${yourAge + (count * 10)} years old. `)
}
