// Using the for Each method, write some code
//  to output all vowels from the strings in
//   the arrays.Don't use a for or while loop.
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(arr => {
  let vowels = 'aeiou';
  arr.forEach(element => {
    element.split('').forEach(char => {
      if (vowels.includes(char)) {
        console.log(char);
      }
    });
  });
});
//solution 1 (same as ls solution)
// e
// u
// i
// o
// o
// u
// e
// o
// e
// e
// a
// o

