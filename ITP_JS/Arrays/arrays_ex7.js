let array = [3, 5, 7];

function sumOfSquares(number) {
  return number.reduce((accumulator, number) => {
    return accumulator + number * number;
  }, 0);
}






console.log(sumOfSquares(array)); // => 83
