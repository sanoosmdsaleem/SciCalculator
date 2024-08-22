class SciCalculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }
    //let me bring all the operator as function/method in the class
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
        this.operation = operation //Stores the selected operation.
        this.previousOperand = this.currentOperand //Moves the currentOperand to previousOperand, preparing for the next number 
        this.currentOperand = '' //Clears the currentOperand to allow for a new number to be entered.

    }
    result(){
        let computation;
        const previousValue = parseFloat(this.previousOperand)  //conversting string to number
        const currentValue = parseFloat(this.currentOperand)
        // if (isNaN(previousValue) || isNaN(currentValue)){
        //     return;
        // }
        switch(this.operation){
            // case '+/-':
            //     computation = currentValue * -1;
            //     break
            // case '%':
            //     computation = currentValue / 100;
            //     break
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
            default:    //If the operation is not recognized, it stops execution.
                return
        }
        this.currentOperand = computation;  //Stores the result of the computation in currentOperand.
        this.operation = undefined; //Resets the operation.
        this.previousOperand = ''
    }
    displayResult(){
        this.currentOperandTextElement.innerText = this.currentOperand  //Updates the text content of the currentOperandTextElement with currentOperand.
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
            //If there is an operation selected, it updates the previousOperandTextElement with previousOperand and the operation symbol. If not, it clears the previousOperandTextElement.
        }

    }
}

// let me select all the buttons to use it in future
const previousOperandTextElement = document.querySelector('[data-previous-operand]')    //This element is where the previous operand (the first number in a calculation) will be displayed on the calculator screen.
const currentOperandTextElement = document.querySelector('[data-current-operand]')  //This element is where the current operand (the second number in a calculation) will be displayed.
const allClearButtons = document.querySelector('[data-all-clear]')
const numberButtons = document.querySelectorAll('[data-number]')
const basicOperationButtons = document.querySelectorAll('[data-basic-operation]')
const equalButton = document.querySelector('[data-equal]')

// let me create a class instance
const calculator = new SciCalculator(previousOperandTextElement, currentOperandTextElement)
//This line creates a new instance of the SciCalculator class, passing in the previousOperandTextElement and currentOperandTextElement as arguments. 
//calculator variable now holds an instance of the SciCalculator class, allowing access to its methods and properties.

numberButtons.forEach(
    button => {
        button.addEventListener('click', () =>{
            calculator.appendNumbers(button.innerText)
            calculator.displayResult()
            //Calls the displayResult method to update the calculator's display with the current operand.
        })
    }
)

allClearButtons.addEventListener('click', button =>{
        calculator.allClear()
        calculator.displayResult()
        //method is then called to update the calculator's display, clearing the previous and current operands.
    }
)

basicOperationButtons.forEach(
    button => {
        button.addEventListener('click', () =>{
            calculator.selectBasicOperation(button.innerText)
            calculator.displayResult()
            //Calls the displayResult method to update the calculator's display with the selected operation.
        })
    }
)

equalButton.addEventListener('click', button => {
    calculator.result() //This calculates the result of the selected operation using the current and p
    calculator.displayResult()
})

