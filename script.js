let currentNumArray = [];
let previousNum = [];

//Initalising variables for calculator buttons and screen displays
const acButton = document.querySelector('#ac-button');
const cButton = document.querySelector('#c-button');
const modulusButton = document.querySelector('#modulus-button');
const divisionButton = document.querySelector('#division-button');
const multiplicationButton = document.querySelector('#multiplication-button');
const subtractionButton = document.querySelector('#subtraction-button');
const additionButton = document.querySelector('#addition-button');
const decimalButton = document.querySelector('#decimal-button');
const equalsButton = document.querySelector('#equals-button');
const numberButtons = document.querySelectorAll('.number');
const currentDisplay = document.querySelector('#current-input');
const formerDisplay = document.querySelector('former-input');

//Function that a number or decimal inputed by calc button displays 
//on the 'screen' and is push into currentNumArray
function pushInputs(button) {
    if (currentDisplay.textContent.length >= 12) {
        return;
    }
    currentDisplay.textContent += button.textContent;
    currentNumArray.push(button.textContent);
}

//Number and decimal buttons functionality
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        pushInputs(numberButton);
    })
})

decimalButton.addEventListener('click', () => {
    pushInputs(decimalButton);
});

//Turns the input array into a float
function toFloat(numArray) {
    return parseFloat((numArray.join("")));
}

//Other
function operate(numA, numB, operator) {
    return operator(numA, numB);
}
