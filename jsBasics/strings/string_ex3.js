
function repeat(n, string) {
  let newString = ''
  while (n > 0) {
    newString += string;
    n -= 1;
  }
  return newString
}
console.log(repeat(3, 'ha')); // 'hahaha'
