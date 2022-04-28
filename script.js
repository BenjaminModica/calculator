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

//For numpad support
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '+':
            handleOperator('plus');
            break;
        case '-':
            handleOperator('minus');
            break;
        case '*':
            handleOperator('times');
            break;
        case '/':
            handleOperator('divide');
            break;
        case 'Enter':
            handleEquals();
            break;
        default:
            if (!isNaN(e.key)) handleNbrBtn(document.querySelector(`[id='${e.key}']`).textContent);
    }
});

nbrBtns.forEach(button => button.addEventListener('click', (button) => handleNbrBtn(button.target.textContent)));

/*

*/
function handleNbrBtn(button) {
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

plusBtn.addEventListener('click', (plusBtn) => handleOperator(plusBtn.target.id));
minusBtn.addEventListener('click', (minusBtn) => handleOperator(minusBtn.target.id));
timesBtn.addEventListener('click', (timesBtn) => handleOperator(timesBtn.target.id));
divideBtn.addEventListener('click', (divideBtn) => handleOperator(divideBtn.target.id));
equalsBtn.addEventListener('click', handleEquals);

function handleOperator(operator) {
    if ((awaitFirstNbr && firstNbrString !== '') || appendToPrevResult) {
        awaitFirstNbr = false;
        appendToPrevResult = false;
        canAppendDot = true;
        operatorString = operator;
        updateDisplay();
    }
};

function handleEquals() {
    if (secondNbrString != '') {
        resultNbrString = operate(firstNbrString, secondNbrString, operatorString);
        appendToPrevResult = true;
        awaitFirstNbr = true;
        updateDisplay();
        firstNbrString = resultNbrString;
        secondNbrString = '', operatorString = '';
    }
};

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
