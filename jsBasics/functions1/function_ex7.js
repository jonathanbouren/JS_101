
// function greet(code) {
//   switch (code) {
//     case 'en': console.log('Hi!'); break;
//     case 'fr': console.log('Salut!'); break;
//     case 'pt': console.log('Ola`!'); break;
//     case 'de': console.log('Hallo!'); break;
//     case 'sv': console.log('Hej!'); break;
//     case 'af': console.log('Haai!'); break;
//   }
// }

function greet(languageCode) {
  switch (languageCode) {
    case 'en': return 'Hi!';
    case 'fr': return 'Salut!';
    case 'pt': return 'Olá!';
    case 'de': return 'Hallo!';
    case 'sv': return 'Hej!';
    case 'af': return 'Haai!';
  }
}

// Example:
console.log(greet('sv'));

greet('en'); // 'Hi!'
greet('fr'); // 'Salut!'
greet('pt'); // 'Olá!'
greet('de'); // 'Hallo!'
greet('sv'); // 'Hej!'
greet('af'); // 'Haai!'
