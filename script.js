class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {

        this.currentOperand = this.currentOperand.toString().slice(0, -1);
       

    }
  
    appendNumber(number) {
      if(number === '.' && this.currentOperand.includes('.')) return ;
      this.currentOperand = this.currentOperand.toString() + number;
    }
  
    chooseOperation(operator) {
      if(this.currentOperand === '') return;
      if(this.previousOperand !== '')
      {
        this.compute();
      }
      this.operation = operator;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if(isNaN(prev) || isNaN(curr)) return;
      switch(this.operation)
      {
        case'+':
            computation = prev + curr;
            break;

        case'-':
            computation = prev - curr;
            break;

        case'*':
            computation = prev * curr;
            break;

        case'÷':
            computation = prev / curr;
            break;
        default:
            return;

       }
       this.currentOperand = computation;
       this.operation = undefined;
       this.previousOperand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
  
    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
  }
  
  const numberbuttons = document.querySelectorAll('[data-number]');
  const operatorButtons = document.querySelectorAll('[data-operator]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allclearButton = document.querySelector('[data-all-clear]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
  numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });


  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });

  equalsButton.addEventListener('click', () => {
      calculator.compute();
      calculator.updateDisplay();
    });

  allclearButton.addEventListener('click',() => {
    calculator.clear();
    calculator.updateDisplay();
  });

  deleteButton.addEventListener('click',() => {
    calculator.delete();
    calculator.updateDisplay();
  });
  
  