class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear();
        // As soon as we create our calcultor we want to call this function to clear all our inputs and set them to default value as soon as we create a new calculator
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;


    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);


    }
    appendNumber(number){
        // add a number to the screen when you click it
        if (number==='.' && this.currentOperand.includes('.')) return;
        //cant allow more then one .
        this.currentOperand=this.currentOperand.toString() + number.toString();
        //append to the end so instead of actually adding it will append it to the end of the string so instead of 1+1=2 it will perform 1+1=11

    }

    chooseOperation(operation){
        // what happens when a user clicks on any operation
        if(this.currentoperand==='') return;
        if(this.previousOperand!==''){
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';

    }
    
    compute(){
        let computation; ///result of our compute function
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
            
        }
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';
       
    }
    //helper function
    getDisplayNumber(number){
        //this funciton is to get commas and get the display right
        const stringNumber= number.toString();
        //so that can split the string into the before and after decimal part
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        //we dont need the decimal part to be a number
        const decimalDigits = (stringNumber.split('.')[1]);
        //split the string into an array of two numbers-->before and after decimal
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay='';

        }else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0}) //-->means there can never be any decimal value after this value gets converted to string with commas
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`

        }else{
            return integerDisplay;;
        }


        // const floatNumber = parseFloat(number);
        // if(isNaN(floatNumber)) return '';
        // //this puts commas
        // //Locale-->English
        // return floatNumber.toLocaleString('en');

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        //cal the getDisplayNumber function and pass the current operand
        if(this.operation!=null){
            this.previousOperandTextElement.innerText=
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;

        }else{
            this.previousOperandTextElement.innerText='';
            //to clear up previous operand when final result is given
        }

    }
}



const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const allClearButton=document.querySelector('[data-all-clear]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click' , button => {
    calculator.compute();
    calculator.updateDisplay();


} )
allClearButton.addEventListener('click' , button => {
    calculator.clear();
    calculator.updateDisplay();


} )
deleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.updateDisplay();


} )