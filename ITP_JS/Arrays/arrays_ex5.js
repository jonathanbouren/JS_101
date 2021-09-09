let things = [1, 'a', '1', 3, NaN, 3.1415, -4, null, false];

// function findIntegers(collection) {
//   let tempCollection = []
//   for(let i = 0; i < collection.length; i += 1 ) {
//     if (Number.isInteger(collection[i])) {
//       tempCollection.push(collection[i])
//     }
//
//   }
// return tempCollection
// }

function findIntegers(array) {
  return array.filter(obj => Number.isInteger(obj));
}

let integers = findIntegers(things);

console.log(integers); // => [1, 3, -4]
