/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');
const MAX_DIGITS = 15;  // This is the maximum number of digits allowed on the display

/*-------------------------------- Variables --------------------------------*/
let operand1 = '';   // This is the first number entered
let operand2 = '';   // This is the second number entered
let operator = null;  // This is the operator selected
let operatorSelected = false;  // This is to check if an operator has been selected

/*------------------------ Cached Element References ------------------------*/
const displayElement = document.querySelector('.display');  //  This is the display screen

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', handleClick);  // This listens for a click on the calculator
  

/*-------------------------------- Functions --------------------------------*/

function handleOperation(event) {
    if (!operator) {      // if there is already an operator, don't change it
        operator = event.target.innerText;
    }
    console.log(operator);
    if (operator === '+' || operator === '-' || operator === '*' || operator === '/') {
        if (operand1) {    // this handles the special case if they hit an operator instead of hitting the equal sign, it will still show the answer
            operand2 = displayElement.innerText;   //grab the second number
            console.log(operand1, operator, operand2);
            displayElement.innerText = calculate();   // calculate the answer
            operand1 = displayElement.innerText;    // now the answer is the first number
            operator = event.target.innerText;    // the operator is now the new operator
        } else {
            operand1 = displayElement.innerText;
            console.log(operand1);
        }
    } else if (event.target.innerText === 'C') {  // this is the clear button, clear all values
        displayElement.innerText = '';
        operand1 = '';
        operand2 = '';
        operator = null;
    }

}
   
function calculate() {   // this function calculates the answer
    let num1 = parseFloat(operand1);  //convert the string to a number
    let num2 = parseFloat(operand2);
    let ans = 0;
    if (operator === '+') {
        ans = num1 + num2;
    } else if (operator === '-') {
        ans = num1 - num2;
    } else if (operator === '*') {
        ans = num1 * num2;
    } else if (operator === '/') {
        ans = num1 / num2;
    }
    if (ans % 1 !== 0) {   // if the answer is a decimal, round it to 2 decimal places
        return ans.toFixed(2);
    }
    if (countDigits(ans) > MAX_DIGITS) {
        return ans.toExponential(2);   // if the answer is too long, convert it to scientific notation
    }
    return ans;
}

function countDigits(num) {
    return num.toString().length;
}

function handleEqual() {
    operand2 = displayElement.innerText;
    console.log(operand1, operator, operand2);
    if (operand1 && operator && operand2) {   //if all values are present, calculate the answer
        displayElement.innerText = calculate();
        operand1 = '';  //reset all values
        operand2 = '';
        operator = null;
    } else {
        displayElement.innerText = '';   //if they push the equal sign without all values, clear the display
    }
}

function handleClick(event) {
    if (event.target.classList.contains('number')) {
        if (operatorSelected) {   //so if an operator has been selected, clear the display and start a new number
            displayElement.innerText = '';
            operatorSelected = false;
        }
        if (displayElement.innerText.length < MAX_DIGITS) {   //only allow 15 digits
            displayElement.innerText += event.target.innerText;   //keep adding digits to the display
        }
    }
  
    if (event.target.classList.contains('operator')) {   //handle the operator
        operatorSelected = true;
        console.log('This is an operator');
        handleOperation(event);
    }
    
    if (event.target.classList.contains('equal')) {   //handle the equal sign
        handleEqual();
    }

    
}