class Calculator {
    constructor(firstoperandTextElement, previousOperandTextElement, currentOperandTextElement) {
        this.firstoperandTextElement = firstoperandTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.firstoOperand = ''
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number, sign) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        this.firstoOperand = sign
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.firstOperand = this.previousOperand
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        const min = parseFloat(this.firstOperand)


        if (this.operation === "+") {
            computation = prev + current
        } else if (this.operation === "-") {
            computation = prev - current
        } else if (this.operation === "√") {
            computation = Math.sqrt(prev)
        } else if (this.operation === '^') {
            computation = prev ** current
        } else if (this.operation === "*") {
            computation = prev * current
        } else if (this.operation === '÷') {
            computation = prev / current
        }


        if (computation.toString().length > 10) {
            computation = Number(computation.toString().slice(0, 10));
        } else if (computation.toString().includes('.')) {
            computation = Number(computation.toString().slice(0, 11));
        } else if (computation.toString().length > 3 && computation.toString().includes('.')) {
            computation = Number(computation.toString().slice(0, 2));
        }

        if (computation === Infinity || isNaN(computation)) {
            computation = 'Error';
        }



        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }



    updateDisplay() {
        this.firstoperandTextElement = this.firstOperand
        this.previousOperandTextElement.innerText = this.previousOperand
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = ` ${this.operation}  `
        }
    }
}


const number = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClear = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const firstoperandTextElement = document.querySelector('[data-first-operand]');
const minusButton = document.querySelector('[data-minus]');

const calculator = new Calculator(firstoperandTextElement, previousOperandTextElement, currentOperandTextElement)

number.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

minusButton.addEventListener('click', () => {
    calculator.appendNumber("-")
    calculator.updateDisplay()
})

operation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})