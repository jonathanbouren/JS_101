let array = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];
// flintstones = flintstones.concat(['Barney', 'Betty'], ["Bambam, Pebbles"]);



// array = [].concat(...array);

// array = array.reduce((accum, element) => {
//   return accum.concat(element);
// },[]);

// let newArray = [];
// array.forEach(element => {
//   newArray = newArray.concat(element);
// });

array.flat();
console.log(array.flat());