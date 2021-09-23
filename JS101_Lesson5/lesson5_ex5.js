//Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female' }
};

let maleAges = 0;
// Object.values(munsters).map(obj => {
//   if (obj.gender === 'male') {
//     maleAges += obj.age;
//   }
//   return maleAges;
// });
// console.log(maleAges);
//solution 1 , => 444

// for (let member in munsters) {
//   if (munsters[member]['gender'] === 'male') {
//     maleAges += munsters[member]['age'];
//   }
// }
// console.log(maleAges);
//ls solution => 444

Object.values(munsters).forEach(munster => {
  if (munster.gender === 'male') {
    maleAges += munster.age;
  }
});
console.log(maleAges);
//ls solution => 444