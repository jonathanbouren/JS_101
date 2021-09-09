let oneArray = {
  name: 'jon',
  age: 55,
  tall: 'yes',
}

let twoArray = {
  name: 'Sam',
  cow: 'Bessie',
  hair: 'lacking',
  tall: 'kinda'

}






function copyObj(sourceObject, keys = 'null', otherObject) {
  let destinationObject = {};

  if (keys) {
    key.forEach(function(key) {
      destinationObject[key] = sourceObject[key];
    });

    return destinationObject;
  } else {
    return Object.assign(destinationObject, sourceObject, otherObject);
  }
}

console.log(copyObj(oneArray,twoArray))
