let arr = ['a', 'abcd', 'abcde', 'abc', 'ab'];

function oddLengths(container) {
  return container.reduce((newArray, object) => {
    let length = object.length;
    if (length % 2 === 1) {
      newArray.push(length);
    }
    return newArray
  }, [])
}

console.log(oddLengths(arr));
