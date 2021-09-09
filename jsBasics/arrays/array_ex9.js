let destinations = ['Prague', 'London', 'Sydney', 'Belfast', 'Rome',
  'Aruba', 'Paris', 'Bora Bora', 'Barcelona', 'Rio de Janeiro',
  'Marrakesh', 'New York City'];


function contains(city, places) {
  let answer = false
  for(let i = 0; i < places.length; i += 1) {
    if (city === places[i]) {
      answer = true
    }
  }
  console.log(answer)
}



contains('Barcelona', destinations); // true
contains('Nashville', destinations); // false
