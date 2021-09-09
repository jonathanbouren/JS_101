let obj = {
  b: 2,
  a: 1,
  c: 3,
};

let upperKeys = [];
let objKeys = Object.keys(obj);

objKeys.forEach(function(key) {
  upperKeys.push(key.toUpperCase())
});
console.log(upperKeys);
