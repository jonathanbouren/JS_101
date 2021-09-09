let scores = [96, 47, 113, 89, 100, 102];
let highScore = 0

function topScores(array) {
let hS = 0
  for(i = 0; i <= array.length; i ++) {
    if (array[i] >= 100) {
        hS += 1;

    }
  }
  return hS;
}

console.log(topScores(scores))
