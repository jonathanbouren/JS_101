1. Create a for loop that logs every other value of the counter starting from 0.

2. Create a program that counts down from 10 and then prints "Launch" to the console.

3. Create a loop that outputs "Aloha!" 3 times.

4. Write a for loop that iterates over all numbers from 1 to 100, and outputs the result of multiplying each element by 2.

5. Using the code below as a starting point, write a while loop that logs the elements of array at each index, and terminates after logging the last element of the array.
```javascript
  let array = [1, 2, 3, 4];
  let index = 0;
  ```

6. Write a for loop that loops over the elements of the array cities and logs the length of each string to the console. If the element is null, skip forward to the next iteration without logging anything to the console.
``` javascript 
let cities = ['Istanbul', 'Los Angeles', 'Tokyo', null, 'Vienna', null, 'London', 'Beijing', null]; 
```

7. Write a while loop that logs all odd natural numbers between 1 and 40.

8. Loop over the elements of the array fish, logging each one. Terminate the loop immediately after logging the string 'Nemo'.
```javascript
let fish = ['Dory', 'Marlin', 'Gill', 'Nemo', 'Bruce'];
```

9. Write an if statement that logs 'Yes!' if randomNumber is 1, and 'No.' if randomNumber is 0.
```javascript
let randomNumber = Math.round(Math.random());
```

10. Repeat the last exercise using the ternary operator.

11. Write a program that uses this array to create an object where the names are the keys and the values are the positions in the array:
```javascript
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
```

12. Add up all the ages from the Munster family. 
```javascript
let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};
```

13. Write a program that asks the user to enter an integer greater than 0, then asks whether the user wants to determine the sum or the product of all numbers between 1 and the entered integer, inclusive.

14. Pick out the minimum age from our current Munster family object:

15. Create an object that expresses the frequency with which each letter occurs in this string: 
```javascript
let statement = "The Flintstones Rock"
```

16. Write the code function that can sort an array of numbers numerically. 

17. Sort the following array by descending numeric value.
```javascript
let arr = ['10', '11', '9', '7', '8'];
```

18. How would you order the following array of objects based on the year of publication of each book, from the earliest to the latest?
```javascript
let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];
```

19. Compute and display the total age of the male members of the family.
```javascript
let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};
```

20. Using the forEach method, write some code to output all vowels from the strings in the arrays. Don't use a for or while loop.
```javascript
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};
```

21. Given the following data structure, return a new array with the same structure, but with the values in each subarray ordered -- alphabetically or numerically as appropriate -- in ascending order.
```javascript
let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
```

22. Given the following data structure, use a combination of methods, including filter, to return a new array identical in structure to the original, but containing only the numbers that are multiples of 3.
```javascript
let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];
```

23. Given the following data structure write some code to return an array containing the colors of the fruits and the sizes of the vegetables. The sizes should be uppercase, and the colors should be capitalized.

```javascript
let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};
```
24. Given the following data structure, write some code to return an array which contains only the objects where all the numbers are even.
```javascript
let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];
```
25. Given the following data structure, write some code that returns an object where the key is the first item in each subarray, and the value is the second.
```javascript
let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
```
// expected return value of function call
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

26. Write a function that takes no arguments and returns a string that contains a UUID.
// Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the letters a-f) represented as a string. The value is typically broken into 5 sections in an 8-4-4-4-12 pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.