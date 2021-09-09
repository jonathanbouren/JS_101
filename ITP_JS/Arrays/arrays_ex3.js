let myArray = [
  [1, 3, 6, 11],
  [4, 2, 4],
  [9, 17, 16, 0],
];
//
// for (let i = 0;i < myArray.length; i += 1) {
//   for (let j = 0; j < myArray[i].length; j += 1) {
//     if (myArray[i][j] % 2 === 0) {
//       console.log(myArray[i][j]);
//     }
//   }
// };

myArray.forEach(function(value) {
  value.forEach(function(lilValue) {
    if (lilValue % 2 === 0) {
      console.log(lilValue);
    }
  })
})
