let cities = ['Istanbul', 'Los Angeles', 'Tokyo', null, 'Vienna', null, 'London', 'Beijing', null];
let i = 0
while (i < cities.length) {
  if (cities[i] !== null) {
    console.log(cities[i].length);
  }
  i += 1;
}
