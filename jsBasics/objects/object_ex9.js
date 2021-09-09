let nestedArray = [['title', 'Duke'], ['name', 'Nukem'], ['age', 33]];

// Expected output:
// { title: 'Duke', name: 'Nukem', age: 33 }

// let person = Object.fromEntries(nestedArray);
// console.log(person);

let dukeObject = {};

for (let i = 0; i < nestedArray.length; i += 1) {
  dukeObject[nestedArray[i][0]] = nestedArray[i][1]
}

console.log(dukeObject)
