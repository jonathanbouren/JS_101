let numbers = [1, 2, 3, 4];
//remove all the elements from the array, 3 ways.

// numbers.length = 0;
// numbers.splice(0, numbers.length);
while (numbers.length) {
  numbers.pop();
}

console.log(numbers);