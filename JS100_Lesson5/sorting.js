// let words = ['go', 'ahead', 'and', 'jump'];

// words.sort((a, b) => a.length - b.length);
// console.log(words);

// let numbers = [4, 6, 11, 15, 2, 9, 0, 3];
// numbers.sort((a , b) => a - b);
// console.log(numbers);

// const months = ['March', 'Jan', 'Feb', 'Dec'];
// months.sort();
// console.log(months);
// => [0, 2, 3, 4,
//   6, 9, 11, 15
// ]

// const students = [
//   { name: "Alex", grade: 15 },
//   { name: "Devlin", grade: 15 },
//   { name: "Eagle", grade: 13 },
//   { name: "Sam", grade: 14 },
// ];

// students.sort((a, b) => a.grade - b.grade);
// console.log(students);
// [
//   { name: 'Eagle', grade: 13 },
//   { name: 'Sam', grade: 14 },
//   { name: 'Alex', grade: 15 },
//   { name: 'Devlin', grade: 15 }
// ]

let numbers = [1, 2, 3, 4, 5];
let accumulator = '';
numbers = numbers.reduce((accumulator , num) => accumulator + num);
console.log(numbers);