// How would you order the following array of number
// strings by descending numeric value(largest number value to smallest) ?

let arr = ['10', '11', '9', '7', '8']; //=> [ '11', '10', '9', '8', '7' ]

// let newArr = arr.sort((a, b) => a - b).reverse();
//solution 1 => [ '11', '10', '9', '8', '7' ]

let newArr = arr.sort((a, b) => Number(b) - Number(a));
// solution 2 => ['11', '10', '9', '8', '7']

console.log(newArr);