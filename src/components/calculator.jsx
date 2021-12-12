import React, { useState } from 'react';
import Buttons from './buttons';
import Input from './input';
import Popup from './popup';
import './styles/calculator.css';
import './styles/popup.css';

const Calculator = () => {
  const initialInput = {
    onScreen: '0',
    operand1: '',
    operand2: '',
    operator: '',
    stage: 'number1',

    // stages - number1, number2, calculated
  };

  const initialError = {
    head: '',
    message: '',
    isError: false,
  };

  const operands = ['+', '-', '*', '/'];

  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(initialError);

  const calculate = (num1, num2, operator) => {
    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;

      default:
        break;
    }
    result = Number.isNaN(result) || result === Infinity ? 'Error' : result;
    return result;
  };

  const handleButtonClick = (value) => {
    const newInput = { ...input };

    if (value === 'AC') {
      setInput(initialInput);
      return;
    }

    if (operands.includes(value)) {
      if (newInput.operand2 && newInput.stage !== 'calculated') {
        setError({
          head: 'Error',
          message: `You've been already choosen operator. Please finish calculation or click AC to reset.`,
          isError: true,
        });
        return;
      }

      if (newInput.stage === 'calculated') {
        newInput.operand1 = newInput.onScreen;
        newInput.operator = value;
        newInput.operand2 = '';
        newInput.stage = 'number2';
        newInput.onScreen += value;
        setInput(newInput);
        return;
      }

      newInput.operator = value;
      newInput.stage = 'number2';
      newInput.onScreen = newInput.operand1 + value;
      setInput(newInput);
      return;
    }

    if (value === '=') {
      if (newInput.stage === 'number1') return;
      newInput.onScreen = calculate(
        +newInput.operand1,
        +newInput.operand2,
        newInput.operator
      );
      newInput.stage = 'calculated';
      newInput.operand1 = newInput.onScreen;
      setInput(newInput);
      return;
    }

    if (newInput.stage === 'number1') {
      if (value === '.' && newInput.operand1.includes('.')) return;
      newInput.operand1 += value;
    }

    if (newInput.stage === 'number2') {
      if (value === '.' && newInput.operand2.includes('.')) return;
      newInput.operand2 += value;
    }

    if (newInput.stage === 'calculated') {
      return;
    }

    newInput.onScreen =
      newInput.operand1 + newInput.operator + newInput.operand2;
    setInput(newInput);
  };

  const closeError = () => {
    setError(initialError);
  };

  return (
    <>
      <div className="calculator">
        <Input input={input} />
        <Buttons onClick={handleButtonClick} />
      </div>
      <Popup error={error} onClick={closeError} />
    </>
  );
};

export default Calculator;
