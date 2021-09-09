const myProtoObj = {
  foo: 1,
  bar: 2,
};


const myObj = Object.create(myProtoObj);

myObj.qux = 3

console.log(myObj)
