const buttons = document.querySelectorAll('button');

let firstNbrString = '', secondNbrString = '', resultNbrString = '', operatorString = '';
let operatorStrings = ['plus', 'times', 'divide', 'minus'];

//0: wait for firstNbr
//1: wait for secondNbr
let state = 0;

const calcDisplay = document.querySelector('.calc');
const resultDisplay = document.querySelector('.result');

buttons.forEach(button => button.addEventListener('click', () => {

    if (button.id === 'equals') {
        resultNbrString = operate(firstNbrString, secondNbrString, operatorString);
        updateDisplay();
        firstNbrString = '', secondNbrString = '', operatorString = '';
        state = 0;
    } else if (operatorStrings.includes(button.id)) {
        operatorString = button.id;
        state = 1;
        updateDisplay();
    } else if (!state) {
        firstNbrString += button.id;
        updateDisplay();
    } else {
        secondNbrString += button.id;
        updateDisplay();
    }
}));

function updateDisplay() {
    calcDisplay.textContent = `${firstNbrString} ${((operatorString === '') ? '' : operatorChars[operatorString])} ${secondNbrString}`;
    resultDisplay.textContent = resultNbrString;
}

const operatorChars = {
    equals: '=',
    plus: '+',
    minus: '-',
    times: 'x',
    divide: '÷',
}

function operate(a, b, operator) {
    switch (operator) {
        case 'plus':
            return add(Number(a), Number(b));
            break;
        case 'times':
            return multiply(Number(a), Number(b));
            break;
        case 'minus':
            return subtract(Number(a), Number(b));
            break;
        case 'divide':
            return division(Number(a), Number(b));
            break;
        default:
            console.log('default operator case');
    }
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function division(a, b) {
    return a / b;
}
