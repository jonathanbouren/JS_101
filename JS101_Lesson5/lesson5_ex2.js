// How would you order the following array of objects
// based on the year of publication of each book,
// from the earliest to the latest ?

let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];

let sortedBooks = books.sort((objA, objB) => {
  return Number(objA['published']) - Number(objB['published']);
});
console.log(sortedBooks);
// solution 1 =>
// [
//   {
//     title: 'The Book of Kells',
//     author: 'Multiple Authors',
//     published: '800'
//   },
//   { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
//   { title: 'Ulysses', author: 'James Joyce', published: '1922' },
//   {
//     title: 'The Great Gatsby',
//     author: 'F. Scott Fitzgerald',
//     published: '1925'
//   },
//   {
//     title: 'One Hundred Years of Solitude',
//     author: 'Gabriel Garcia Marquez',
//     published: '1967'
//   }
// ]

