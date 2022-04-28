const nbrBtns = document.querySelectorAll('.nbrBtn');
const plusBtn = document.querySelector('#plus');
const minusBtn = document.querySelector('#minus');
const timesBtn = document.querySelector('#times');
const divideBtn = document.querySelector('#divide');
const equalsBtn = document.querySelector('#equals');

const calcDisplay = document.querySelector('.calc');
const resultDisplay = document.querySelector('.result');

let firstNbrString = '', secondNbrString = '', resultNbrString = '', operatorString = '';
let operatorStrings = ['plus', 'times', 'divide', 'minus'];

let awaitFirstNbr = true;
let appendToPrevResult = false;
let canAppendDot = true;

document.addEventListener('keydown', (e) => handleNbrBtn(document.querySelector(`[id='${e.key}']`).textContent));

nbrBtns.forEach(button => button.addEventListener('click', (button) => handleNbrBtn(button.target.textContent)));

function handleNbrBtn (button) {
    if (awaitFirstNbr && !appendToPrevResult) {
        if (button === '.' && canAppendDot) {
            firstNbrString += button;
            canAppendDot = false;
        } else if (button !== '.') {
            firstNbrString += button;
        }
    } else if (appendToPrevResult) {
        firstNbrString = button;
        appendToPrevResult = false;
    } else {
        if (button === '.' && canAppendDot) {
            secondNbrString += button;
            canAppendDot = false;
        } else if (button !== '.') {
            secondNbrString += button;
        }
    } updateDisplay();

}

plusBtn.addEventListener('click', handleOperator);
minusBtn.addEventListener('click', handleOperator);
timesBtn.addEventListener('click', handleOperator);
divideBtn.addEventListener('click', handleOperator);

function handleOperator(e) {
    if ((awaitFirstNbr && firstNbrString !== '') || appendToPrevResult) {
        awaitFirstNbr = false;
        appendToPrevResult = false;
        canAppendDot = true;
        operatorString = e.target.id;
        updateDisplay();
    }
};

equalsBtn.addEventListener('click', (e) => {
    if (secondNbrString != '') {
        resultNbrString = operate(firstNbrString, secondNbrString, operatorString);
        appendToPrevResult = true;
        awaitFirstNbr = true;
        updateDisplay();
        firstNbrString = resultNbrString;
        secondNbrString = '', operatorString = '';
    }
});

/*
Updates top and bottom halfs of display with current operation and result
*/
function updateDisplay() {
    calcDisplay.textContent = `${firstNbrString} ${((operatorString === '') ? '' : operatorChars[operatorString])} ${secondNbrString}`;
    resultDisplay.textContent = resultNbrString;
}

//Object for converting operator strings to correct characters for display
const operatorChars = {
    equals: '=',
    plus: '+',
    minus: '-',
    times: 'x',
    divide: '÷',
}

/*
Takes numbers and operator as string and calls for operation functions. 
Returns result of operation
*/
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
