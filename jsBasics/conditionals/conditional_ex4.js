let weather = ['Sunny', 'Cloudy', 'Rainy'];



for (let i = 0; i < 100; i += 1){
let todaysWeather = weather[Math.round(Math.random() * 3 )];

 if (todaysWeather === 'Sunny') {
   console.log(`It's ${todaysWeather},  let's go outside!`)
 } else if (todaysWeather === 'Cloudy') {
   console.log(`It's ${todaysWeather}, maybe bring a jacket!`)
 } else if (todaysWeather === 'Rainy'){
   console.log(`It's ${todaysWeather}, probably better to stay inside. `)
 }

}
