let vocabulary = [
  ['happy', 'cheerful', 'merry', 'glad'],
  ['tired', 'sleepy', 'fatigued', 'drained'],
  ['excited', 'eager', 'enthused', 'animated']
];


function print(array) {
  for(let i = 0; i < array.length; i += 1) {
    for(let j = 0; j < array[i].length; j += 1) {
      console.log(array[i][j]);
    }
  }
}
// vocabulary.forEach(array => {
//   array.forEach(word => console.log(word));
// })
print(vocabulary)
// Expected output:
// happy
// cheerful
// merry
// etc...
