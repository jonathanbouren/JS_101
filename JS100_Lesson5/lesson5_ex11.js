// Given the following data structure,
//  use the map method to return a new array
//  identical in structure to the original but,
//  with each number incremented by 1.
//  Do not modify the original data structure.

let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let newArray = arr.map(obj => {
  let incrementObj = {};
  for (let key in obj) {
    incrementObj[key] = obj[key] + 1;
  }
  return incrementObj;
});
console.log(arr);
console.log(newArray);
// solution 1 , launch school solution
// returns
// [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }]
// [{ a: 2 }, { b: 3, c: 4 }, { d: 5, e: 6, f: 7 }]