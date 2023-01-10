let currentNumArray = [];
let previousNum;
let currentOperator;
let previousOperator;
const operators = ["%", "÷", "x", "-", "+"];

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
const operatorButtons = document.querySelectorAll('.operator')
const currentDisplay = document.querySelector('#current-input');
const formerDisplay = document.querySelector('#former-input');

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
let toFloat = (numArray) => parseFloat((numArray.join("")));

//Fix previousNum value because clicking operator buttons makes it strange
function fixFloat() {
    previousNum = parseFloat(previousNum.replace(/[%x÷+-]/g, ""));
};

//Mutal functions for operator and equals buttons
function multipleOperators(operatorButton) {
    previousOperator = currentOperator;
    currentOperator = operatorButton.textContent;
};

function solveAndReset(){
    let solvedNum = operate(previousNum, toFloat(currentNumArray), currentOperator);
    currentNumArray.length = 0;
    previousNum = solvedNum;
    currentDisplay.textContent = "";
    formerDisplay.textContent = "";
    formerDisplay.textContent += previousNum;
};

//Operator buttons functionality
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        if (currentDisplay.textContent === "") {
            multipleOperators(operatorButton);
            formerDisplay.textContent = formerDisplay.textContent.replace(previousOperator, currentOperator);
            return;
        }
        else if (formerDisplay.textContent === "") {
            previousNum = toFloat(currentNumArray);
            currentOperator = operatorButton.textContent;
            currentNumArray.length = 0;
            formerDisplay.textContent = previousNum += " " + currentOperator;
            currentDisplay.textContent = "";
            fixFloat();
            return;
        }
        else if (formerDisplay != "" && currentDisplay != "") {
            //Same 2
            solveAndReset()
            //Same 2
            multipleOperators(operatorButton);
            formerDisplay.textContent += " " + currentOperator;
            formerDisplay.textContent = formerDisplay.textContent.replace(previousOperator, currentOperator);
        }
    });
});

//Equal Button functionality
equalsButton.addEventListener('click', () => {
    //Same 2
    solveAndReset()
    //Same 2
    currentNumArray.push(previousNum.toString().split(''));
})


//Operator Function
function operate(numA, numB, operator) {
    switch (currentOperator) {
        case ("%"):
            return numA % numB;
            break;
        case ("÷"):
            return numA / numB;
            break;
        case ("x"):
            return numA * numB;
            break;
        case ("-"):
            return numA - numB;
            break;
        case ("+"):
            return numA + numB;
            break;
    }
}
