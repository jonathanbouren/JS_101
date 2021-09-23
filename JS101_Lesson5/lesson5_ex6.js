//Given this previously seen family object,
// print the name, age, and gender of each family member:
//(Name) is a (age)-year-old (male or female).

let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female' }
};

let details = Object.entries(munsters);
for (let count = 0; count < details.length; count += 1) {
  console.log(`${details[count][0]} is a ${details[count][1].age} year old ${details[count][1].gender}`);
}
// solution 1
// => herman is a 32 year old male
//    lily is a 30 year old female
//    grandpa is a 402 year old male
//    eddie is a 10 year old male
//    marilyn is a 23 year old female

Object.entries(munsters).forEach(munster => {
  let name = munster[0];
  let age = munster[1]['age'];
  let gender = munster[1]['gender'];
  console.log(`${name} is a ${age} year old ${gender}`);
});
//ls solution
