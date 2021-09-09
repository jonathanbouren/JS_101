

function localGreet(locale) {
let splitCode = locale.split('_')[0]
   switch (splitCode) {
    case 'en': return 'Hi!';
    case 'fr': return 'Salut!';
    case 'pt': return 'Olá!';
    case 'de': return 'Hallo!';
    case 'sv': return 'Hej!';
    case 'af': return 'Haai!';
    default: return "Hmmm, it seems we don't have support for that language."
  }
}

console.log(localGreet('fr_FR.UTF-8')); // 'Salut!'
console.log(localGreet('en_US.UTF-8')); // 'Hi!'
console.log(localGreet('de_DE.UTF-8')); // 'Hallo!'
console.log(localGreet('Hot dog'))
