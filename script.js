const buttons = document.querySelectorAll('button');

let firstNbrString = '', secondNbrString = '', resultNbrString = '', operatorString = '';
let operatorStrings = ['plus', 'times', 'divide', 'minus'];

let waitForFirstNumber = true; //If this is true the next number pressed will be added to first number
let cont = false; //Sets whether calculations continue on previous result or if a new calculation is underway

const calcDisplay = document.querySelector('.calc');
const resultDisplay = document.querySelector('.result');

/*
*Eventlistenes for all buttons on calculator. 
*/
buttons.forEach(button => button.addEventListener('click', () => {

    if (button.id === 'equals' && !cont && !waitForFirstNumber) { //Will show result if not pressed already and if not waiting for first number
        resultNbrString = operate(firstNbrString, secondNbrString, operatorString);
        updateDisplay();
        firstNbrString = '', secondNbrString = '', operatorString = '';
        waitForFirstNumber = true;
        cont = true;
    } else if (operatorStrings.includes(button.id)) {
        if (cont) firstNbrString = resultNbrString;
        cont = false; 
        operatorString = button.id;
        waitForFirstNumber = false;
        updateDisplay();
    } else if (waitForFirstNumber && button.id !== 'equals') {
        firstNbrString += button.id;
        cont = false;
        updateDisplay();
    } else if (button.id !== 'equals'){
        secondNbrString += button.id;
        updateDisplay();
    } else {
        console.log('here');
        firstNbrString = '', secondNbrString = '', resultNbrString = '', operatorString = '';
        updateDisplay();
        cont = false;
    }
}));

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
