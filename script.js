let currentNumArray = [];
let previousNum;
let currentOperator;
let previousOperator;

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
    previousNum = parseFloat(previousNum.replace(/[%x÷+–]/g, ""));
};

//Mutal functions for operator and equals buttons
function multipleOperators(operatorButton) {
    previousOperator = currentOperator;
    currentOperator = operatorButton.textContent;
    formerDisplay.textContent = formerDisplay.textContent.replace(previousOperator, "");
    formerDisplay.textContent += ` ${currentOperator}`;
};

function solveAndReset(){
    let solvedNum = operate(previousNum, toFloat(currentNumArray), currentOperator);
    if (solvedNum === "Why tf r u diving by 0?") {
        formerDisplay.textContent = "Why tf r u diving by 0?";
        return;
    }
    currentNumArray.length = 0;
    previousNum = solvedNum;
    currentDisplay.textContent = "";
    formerDisplay.textContent = "";
    formerDisplay.textContent = previousNum;
};

//Operator buttons functionality
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        if (currentDisplay.textContent === "") {
            multipleOperators(operatorButton);
            return;
        }
        else if (formerDisplay.textContent === "") {
            previousNum = toFloat(currentNumArray);
            currentOperator = operatorButton.textContent;
            currentNumArray.length = 0;
            formerDisplay.textContent = previousNum += ` ${currentOperator}`;
            currentDisplay.textContent = "";
            fixFloat();
            return;
        }
        else if (formerDisplay != "" && currentDisplay != "") {
            solveAndReset()
            multipleOperators(operatorButton);
            return;
        }
    });
});

//Equal Button functionality
equalsButton.addEventListener('click', () => {
    solveAndReset()
    // multipleOperators(operatorButton);
});


//Operator Function which matches the current operator and returns the solution using that operator
function operate(numA, numB, operator) {
    if (numB === 0 && operator === "÷") {
        currentNumArray.length = 0;
        previousNum = 0;
        currentDisplay.textContent = "";
        return "Why tf r u diving by 0?";
    };

    switch (operator) {
        case ("%"):
            return numA % numB;
            break;
        case ("÷"):
            return numA / numB;
            break;
        case ("x"):
            return numA * numB;
            break;
        case ("–"):
            return numA - numB;
            break;
        case ("+"):
            return numA + numB;
            break;
    };
};

//All Clear button Function
acButton.addEventListener('click', () => {
    currentNumArray.length = previousNum = 0;
    currentOperator = previousOperator = "";
    formerDisplay.textContent = currentDisplay.textContent = "";
});

//Clear button function
cButton.addEventListener('click', () => {
    currentNumArray.pop();
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
})