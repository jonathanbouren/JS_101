// Each UUID consists of 32 hexadecimal characters
//(the digits 0 - 9 and the letters a - f)
// represented as a string.The value is typically
//broken into 5 sections in an 8 - 4 - 4 - 4 - 12
// pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.
// Write a function that takes no arguments and returns
//a string that contains a UUID.

let chars = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function createUUID() {
  let uuid = '';
  let dashes = [8, 13, 18, 23];
  for (let count = 0; count < 36; count += 1 ) {
    if (dashes.includes(count)) {
      uuid += '-';
    } else {
      uuid += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return uuid;
}

console.log(createUUID());
// let myuuid = '608b5080-84a3-5e0c-57ae-4fb7a8ea9173';
// let count = 0;
// let newuuid;

// while (myuuid !== newuuid) {
//   console.log(count);
//   newuuid = createUUID();
//   console.log(newuuid);
//   count++;
// } do not run this lol

/*
608b5080-84a3-5e0c-57ae-4fb7a8ea9173
9448744c-85fd-5182-e9f9-ae69002ee0fb
77b44f7e-b11e-179c-efe2-1abe1f3e6aa1
63e289fc-ba32-ca33-8705-eb60ad9e8f90
c5e13785-e559-c1c2-d911-334202ffd90d
*/