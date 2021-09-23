// Each UUID consists of 32 hexadecimal characters(the digits 0 - 9 and
//  the letters a - f)
// represented as a string.The value is typically broken into 5 sections in an
//  8 - 4 - 4 - 4 - 12
// pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.
/*
create a string of characters that meet the criteria.
The string shall be separated into 5 sections by -
Each section of the string will contain the specified number of characters
8 - 4 - 4 - 4 - 12
the code will be in the form of a function
the function will take no arguments
the pattern must be built from a random selected of numbers
and letters, numbers between 0-9, letters a-f
The function can use string concatenation while the length of the string
is less than 36 characters
*/

function createUUID() {
  let string = 'abcdef';
  let newUUID = '';
  const dashCount = [8, 13, 18, 23];
  let randomNum;

  for (let count = 0; count <= 35; count += 1) {
    randomNum = Math.floor(Math.random() * 2);
    if (dashCount.includes(count)) {
      newUUID += '-';
      continue;
    } else if (randomNum === 1) {
      newUUID += String(string[Math.floor(Math.random() * 6)]);
    } else {
      newUUID += Number(Math.floor(Math.random() * 10));
    }
  }
  return newUUID;
}

console.log(createUUID());
/*
8dedcef7-961c-7af4-6d71-8f50f8a9ebbf
3ccefd87-2fde-12f5-b901-3e717e1bfdc8
7fee1bde-8e5c-37ab-ea9b-ee8eba78d577
79cc4ec2-cfe6-092f-d24e-86e2daaa8ed7
1c5ff7e8-e5d9-d2fe-97a3-abf9012f921e
e4f77e1f-874a-fa45-f127-0a4b227c0a64
2edc54ac-d1cf-b9ea-945b-0cff80ab493c

*/