let obj = {
  number: 1,
  string: 'abc',
  array: [1, 2, 3],
};

function clone(object) {
  let newObject = clone(object);
  console.log(newObject)
}

clone(obj)
