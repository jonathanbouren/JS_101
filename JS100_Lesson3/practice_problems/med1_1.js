let statement = "The flintstones rock!";

// let space = ' ';
// for (let i = 10; i >= 1; i -= 1) {
//   console.log(space + `The flintstones rock!`);
//   space += ' ';
// }

for (let padding = 1; padding <= 10; padding++) {
  console.log(" ".repeat(padding) + statement);
}