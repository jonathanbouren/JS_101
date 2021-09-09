let advice = "Few things in life are as important as house training your pet dinosaur.";

// Expected return value:
// => 'Few things in life are as important as '
advice.slice(advice.indexOf('house'));

console.log(advice.slice(advice.indexOf('Few'), advice.indexOf('house')));
