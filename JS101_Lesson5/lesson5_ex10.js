// Perform the same transformation
// of sorting the subarrays we did in the previous exercise
// with one difference; sort the elements in descending order.

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let newArr = arr.map(subArr => {
  if (typeof subArr[0] === 'string') {
    return subArr.sort().reverse();
  } else {
    return subArr.sort((a,b) => Number(b) - Number(a));
  }
});

console.log(newArr);