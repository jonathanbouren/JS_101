let string = 'launch school tech & talk';

let capitalize = str => {
  return str.split(' ')
            .map(ele => ele[0].toUpperCase() + ele.slice(1))
            .join(' ')
}

console.log(capitalize(string))
