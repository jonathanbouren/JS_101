let weather = ['Sunny', 'Cloudy', 'Rainy'];



for (let i = 0; i < 10; i += 1){
let todaysWeather = weather[Math.round(Math.random() * 3 )];

switch (todaysWeather) {
  case 'Sunny':
  console.log(`It's ${todaysWeather},  let's go outside!`);
  break;
  case 'Cloudy':
  console.log(`It's ${todaysWeather}, maybe bring a jacket!`);
  break;
  case 'Rainy':
  console.log(`It's ${todaysWeather}, probably better to stay inside. `);
  break;
  }
}

// switch (todaysWeather) {
//   case 'Sunny';
//   console.log(`It's ${todaysWeather},  let's go outside!`);
//   break;
//   case 'Cloudy';
//   console.log(`It's ${todaysWeather}, maybe bring a jacket!`);
//   break;
//   case 'Rainy';
//   console.log(`It's ${todaysWeather}, probably better to stay inside. `);
//   break;
// }
