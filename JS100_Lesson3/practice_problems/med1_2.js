let munstersDescription = "The Munsters are creepy and spooky.";

console.log(munstersDescription);


let reverse = munstersDescription.split("").map(function (char) {
  if (char === char.toUpperCase()) {
    return char.toLowerCase();
  } else {
    return char.toUpperCase();
  }
}).join("");
console.log(reverse);