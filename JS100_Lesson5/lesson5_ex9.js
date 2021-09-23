// Given the following data structure,
// return a new array with the same structure,
// but with the values in each subarray ordered--
// alphabetically or numerically as appropriate -- in ascending order.

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let newArr = arr.map(subArr => {
  if (typeof subArr[0] === 'string') {
    return subArr.sort();
  } else {
    return subArr.sort((a, b) => a - b);
  }
});

console.log(newArr);