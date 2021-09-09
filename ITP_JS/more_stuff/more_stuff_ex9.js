
// function isNegZero(obj) {
//   if (1 / obj === -Infinity) {
//     console.log('true')
//   } else {
//     console.log('not true')
//   }
// }

function isNegZero(value) {
  return 1 / value === -Infinity;
}
console.log(isNegZero(-0))
