/*
create a calculator that returns loan payments
the calculator will ask the user for input
  -the amount of the loan
  -the time length of the loan
  -the interest rate applied to the loan
this information will be calculated using the following formula

let m = p * (j / (1 - Math.pow((1 + j), (-n))));

the variables in the formula represent the following
m = monthly payment
p = loan amount
j = monthly interest rate
n = loan duration in months

START
SET - prompt message

PRINT - greeting message
GET loan amount
  validate loan amount
Get loan length
  validate loan length and convert to months
Get interest rate ( if any)
  convert interest rate to decimal

IF loan amount / loan length / interest are valid numbers
  solve the formula
ELSE
  prompt user to correct the information
PRINT the result
PRINT request the user if they want to perform another calculation
IF Yes
  repeat program
ELSE
  PRINT thank you message to user
END
*/
