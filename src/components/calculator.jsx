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
  };

  const initialError = {
    head: '',
    message: '',
    isError: false,
  };

  const operands = ['+', '-', '*', '/'];

  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(initialError);

  const handleButtonClick = (value) => {
    const newInput = { ...input };

    // Prevent doing anything if Error on the screen
    if ((newInput.onScreen === 'Error') & (value !== 'AC')) return;

    // Restore state on AC button
    if (value === 'AC') {
      setInput(initialInput);
      return;
    }

    // Operators events
    if (operands.includes(value)) {
      if (newInput.operand2) {
        setError({
          head: 'Error',
          message: `You've been already used another operator. Please finish calculation or click AC to restore it.`,
          isError: true,
        });
        return;
      }
      newInput.operator = value;
      newInput.onScreen += value;
      setInput(newInput);
      return;
    }

    // Calculation logic
    if (value === '=') {
      newInput.operand1 = +newInput.operand1;
      newInput.operand2 = +newInput.operand2;

      newInput.onScreen =
        newInput.operator === '+'
          ? newInput.operand1 + newInput.operand1
          : newInput.operator === '-'
          ? newInput.operand1 - newInput.operand2
          : newInput.operator === '*'
          ? newInput.operand1 * newInput.operand2
          : newInput.operand1 / newInput.operand2;

      // Devision by 0 and other stuff like that
      if (newInput.onScreen === Infinity) newInput.onScreen = 'Error';

      // Leave a result of calculation in operand1 to continue calculating
      newInput.operand1 = newInput.onScreen;
      setInput(newInput);
      return;
    }

    // Entering numbers in Input for operand1 and operand2
    if (newInput.operator) {
      if (value === '.' && newInput.operand2.includes('.')) return; // check for double . input
      newInput.operand2 += value;
    } else {
      if (value === '.' && newInput.operand1.includes('.')) return; // check for double . input
      newInput.operand1 += value;
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
