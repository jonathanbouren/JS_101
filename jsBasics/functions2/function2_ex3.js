// bmi = weightInKilograms / heightInMeters**2;


function calculateBMI(height, weight) {
  let num = weight / (height ** 2) * 10000;
  console.log(num.toFixed(2))
}




calculateBMI(180, 80); // "24.69"
