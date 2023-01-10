let currentNum = [];
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

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        if (currentDisplay.textContent.length >= 12) {
            return;
        }
        currentDisplay.textContent += numberButton.textContent;
        currentNum.push(numberButton.textContent);
    })
})




function operate(numA, numB, operator) {
    return operator(numA, numB);
}
