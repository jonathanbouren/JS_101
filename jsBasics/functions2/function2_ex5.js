

function removeLastChar(string) {
  splitString = string.split('')
  splitString.pop()
  console.log(splitString.join(''))
}



removeLastChar('ciao!'); // 'ciao'
removeLastChar('hello'); // 'hell'
