class SciCalculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }
    allClear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    appendNumbers(number){
        if (number === '.' && this.currentOperand.includes('.')){
            return 
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    selectBasicOperation(operation){
        if (operation === '+/-'){
            if(this.currentOperand !== ''){
                this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
                this.displayResult();
            }
            return
        }
        if (operation === '%') {
            if (this.currentOperand !== '') {
                this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
                this.displayResult();
            }
            return;
        }
        if(this.currentOperand === ''){
            return;
        }
        if(this.previousOperand !== ''){
            this.result()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '' 
    }
    result(){
        let computation;
        const previousValue = parseFloat(this.previousOperand) 
        const currentValue = parseFloat(this.currentOperand)
        if (isNaN(previousValue) || isNaN(currentValue)){
            return;
        }
        switch(this.operation){
            case '+/-':
                computation = currentValue * -1;
                break
            case '%':
                computation = currentValue / 100;
                break
            case '÷':
                computation = previousValue / currentValue;
                break
            case '×':
                computation = previousValue * currentValue;
                break
            case '-':
                computation = previousValue - currentValue;
                break
            case '+':
                computation = previousValue + currentValue;
                break
            default: 
                return
        }
        this.currentOperand = computation; 
        this.operation = undefined; 
        this.previousOperand = ''
    }
    displayResult(){
        this.currentOperandTextElement.innerText = this.currentOperand  
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// select all the buttons 
const previousOperandTextElement = document.querySelector('[data-previous-operand]')    //where the previous operand will be displayed on the calculator screen.
const currentOperandTextElement = document.querySelector('[data-current-operand]')  //where the current operand will be displayed.
const allClearButtons = document.querySelector('[data-all-clear]')
const numberButtons = document.querySelectorAll('[data-number]')
const basicOperationButtons = document.querySelectorAll('[data-basic-operation]')
const equalButton = document.querySelector('[data-equal]')

const calculator = new SciCalculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(
    button => {
        button.addEventListener('click', () =>{
            calculator.appendNumbers(button.innerText)
            calculator.displayResult()
        })
    }
)

allClearButtons.addEventListener('click', button =>{
        calculator.allClear()
        calculator.displayResult()
    }
)

basicOperationButtons.forEach(
    button => {
        button.addEventListener('click', () =>{
            calculator.selectBasicOperation(button.innerText)
            calculator.displayResult()
        })
    }
)+

equalButton.addEventListener('click', button => {
    calculator.result()
    calculator.displayResult()
})

