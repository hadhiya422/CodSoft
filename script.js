document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    {let currentInput = '';
    let previousInput = null;
    let operator = null;
    let waitForSecondOperand = false;
    function updateDisplay(value) {
        display.value = value;
    }
    function inputNumber(num) {
        if (waitForSecondOperand) {
            currentInput = num;
            waitForSecondOperand = false;
        } else {
            
            if (num === '.' && currentInput.includes('.')) return;
            currentInput += num;
        }
        updateDisplay(currentInput);
    }
    function inputOperator(nextOperator) {
        if (operator && waitForSecondOperand) {
            operator = nextOperator;
            return; }

        const inputValue = parseFloat(currentInput);

        if (previousInput === null) {
            previousInput = inputValue;
        } else if (operator) {
            const result = calculate(previousInput, inputValue, operator);
            currentInput = String(result);
            previousInput = result;
            updateDisplay(currentInput);
        }

        waitForSecondOperand = true;
        operator = nextOperator;
    }
    function calculate(firstNum, secondNum, op) {
        
        switch (op) {
            case '+':
                return firstNum + secondNum;
            case '-':
                return firstNum - secondNum;
            case '*':
                return firstNum * secondNum;
            case '/':
                
                return secondNum !== 0 ? firstNum / secondNum : 'Error';
            default:
                return secondNum;
        }
    }
    function handleEquals() {
        if (!operator || waitForSecondOperand) return; 
        
        const inputValue = parseFloat(currentInput);
        const result = calculate(previousInput, inputValue, operator);
        currentInput = String(result);
        previousInput = null;
        operator = null;
        waitForSecondOperand = false;
        updateDisplay(currentInput);
    }

    
currentInput = '';
        previousInput = null;
        operator = null;
        waitForSecondOperand = false;
        updateDisplay('');
    }
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('number') || target.classList.contains('decimal')) {
                
                inputNumber(target.dataset.number);
            } 
            else if (target.classList.contains('operator')) {
                inputOperator(target.dataset.operator);
            }
            
            else if (target.classList.contains('equals')) {
                handleEquals();
            }
            
            else if (target.classList.contains('clear')) {
                clearCalculator();
            }
        });
    });
     updateDisplay('');})