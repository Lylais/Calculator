let firstNumber = '';
let secondNumber = '';
let operator = '';
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('.AC');
const deleteButton = document.querySelector('.delete');
const pointButton = document.querySelector('.point');
const inverseButton = document.querySelector('.inverse');
const lastOperationScreen = document.querySelector('#lastOperationScreen');
const currentOperationScreen = document.querySelector('#currentOperationScreen');

numberButtons.forEach(button => button.addEventListener('click', () => display(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => setOperation(button.textContent)));
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteLastDigit);
inverseButton.addEventListener('click', inverse);
equalsButton.addEventListener('click', evaluate);

pointButton.addEventListener('click', () => {
    if (!currentOperationScreen.textContent.includes('.')) {
        display('.');
    }
});


function display(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function setOperation(op){
    if (operator !== '') evaluate();
    firstNumber = currentOperationScreen.textContent;
    operator = op;
    lastOperationScreen.textContent = `${firstNumber} ${operator}`
    shouldResetScreen = true
}

function evaluate(){
    if (operator === '' || shouldResetScreen) return;
    secondNumber = currentOperationScreen.textContent;
    currentOperationScreen.textContent = operate(operator, firstNumber, secondNumber);
    lastOperationScreen.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    shouldResetScreen = true;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    shouldResetScreen = false;
}

function deleteLastDigit() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.length === 1 
        ? '0' 
        : currentOperationScreen.textContent.slice(0, -1);
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        default: return null;
    }
}

function inverse() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.startsWith('-')
        ? currentOperationScreen.textContent.slice(1)
        : '-' + currentOperationScreen.textContent;
}