
function isBlank(string) {
  console.log(string.trim().length === 0)
}



isBlank('mars'); // false
isBlank('  ');   // false
isBlank('');     // true
