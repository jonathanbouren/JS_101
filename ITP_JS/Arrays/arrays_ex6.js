let arr = ['a', 'abcd', 'abcde', 'abc', 'ab'];

let arrayLengths = arr.map(obj => obj.length)

function oddLengths(array) {
  let arrayLengths = array.map(obj => obj.length);
  let oddArray = arrayLengths.filter(obj => obj % 2 !== 0);
  return oddArray
}

console.log(oddLengths(arr)); // => [1, 5, 3]
