/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');
const MAX_DIGITS = 15;  // This is the maximum number of digits allowed on the display

/*-------------------------------- Variables --------------------------------*/
let operand1 = '';   // This is the first number entered
let operand2 = '';   // This is the second number entered
let operator = null;  // This is the operator selected
let operatorClicked = false;  // This is to check if the operator button has been clicked
let answerDisplayed = false;  // This is to check if the answer has been displayed

/*------------------------ Cached Element References ------------------------*/
const displayElement = document.querySelector('.display');  //  This is the display screen

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', handleClick);  // This listens for a click on the calculator
  

/*-------------------------------- Functions --------------------------------*/

function handleOperation(event) {
    console.log('operator clicked');
    console.log('operands: ', operand1, operator, operand2);
    console.log('operatorClickedFlag: ', operatorClicked);
    if (event.target.innerText === 'C') {   // if the clear button is clicked, clear the display
        displayElement.innerText = '';
        operand1 = '';
        operand2 = '';
        operator = null;
        operatorClicked = false;
        answerDisplayed = false;
        return;
    }
    
    if (operatorClicked) {   // if the user clicks an operator after already clicking an operator, change the operator, but don't change the operands
        operator = event.target.innerText;
        console.log('operator: ', operator);
        return;
    }
    
    if (!operator) {      // if there is already an operator, don't change it, in the case of a user chaining operations
        operator = event.target.innerText;
        console.log('operator: ', operator);
        
    }
    if (operator === '+' || operator === '-' || operator === '*' || operator === '/') {
        operatorClicked = true;
        if (operand1) {    // this handles the special case if they hit an operator instead of hitting the equal sign, it will still show the answer
            operand2 = displayElement.innerText;   //grab the second number
            console.log(operand1, operator, operand2);
            displayElement.innerText = calculate();   // calculate the answer
            operand1 = displayElement.innerText;    // now the answer is the first number
            operator = event.target.innerText;    // the operator is now the new operator
            operand2 = '';   // reset the second number
        } else {
            operand1 = displayElement.innerText;
            console.log('operand1: ', operand1);
            
        }
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
    
    if (operand1 && operator && operand2) {   //if all values are present, calculate the answer
        displayElement.innerText = calculate();
        operand1 = '';  //reset all values
        operand2 = '';
        operator = null;
        answerDisplayed = true;
        operatorClicked = false;
    } else {
        displayElement.innerText = '';   //if they push the equal sign without all values, clear the display
    }
}

function handleNumber(event) {
    console.log('number clicked');
    console.log('operands: ', operand1, operator, operand2);
    console.log('operator selected: ', operatorClicked);

    if (operatorClicked) {
        displayElement.innerText = '';
        operatorClicked = false;
    }
    if (answerDisplayed) {
        displayElement.innerText = '';
        answerDisplayed = false;
    }
    if (displayElement.innerText.length < MAX_DIGITS) {
        displayElement.innerText += event.target.innerText;
    }
}

function handleClick(event) {
    if (event.target.classList.contains('number')) {
        // operatorClicked = false;
        handleNumber(event);
    }
  
    if (event.target.classList.contains('operator')) {   //handle the operator
        
        handleOperation(event);
    }
    
    if (event.target.classList.contains('equal')) {   //handle the equal sign
        operatorClicked = false;
        handleEqual();
    }

    
}