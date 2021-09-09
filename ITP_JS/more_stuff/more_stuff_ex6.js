let words = [
  'laboratory',
  'experiment',
  'flab',
  'Pans Labyrinth',
  'elaborate',
  'polar bear',
];

function allMatches(array, obj) {
  let matchWords =[]
  for (let i = 0;i < array.length; i += 1) {
    if (obj.test(array[i])) {
      matchWords.push(array[i]);

    }
  }
  return matchWords
};



console.log(allMatches(words, /lab/)); // => ['laboratory', 'flab', 'elaborate']
