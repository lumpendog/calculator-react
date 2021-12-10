import React from 'react';
import Button from './button';

const Buttons = ({ onClick }) => {
  return (
    <div className="buttons">
      <div className="operators">
        <Button value="+" onClick={onClick} />
        <Button value="-" onClick={onClick} />
        <Button value="*" onClick={onClick} />
        <Button value="/" onClick={onClick} />
      </div>
      <div className="leftPanel">
        <div className="numbers">
          <Button value="7" onClick={onClick} />
          <Button value="8" onClick={onClick} />
          <Button value="9" onClick={onClick} />
        </div>
        <div className="numbers">
          <Button value="4" onClick={onClick} />
          <Button value="5" onClick={onClick} />
          <Button value="6" onClick={onClick} />
        </div>
        <div className="numbers">
          <Button value="1" onClick={onClick} />
          <Button value="2" onClick={onClick} />
          <Button value="3" onClick={onClick} />
        </div>
        <div className="numbers">
          <Button value="0" onClick={onClick} />
          <Button value="." onClick={onClick} />
          <Button value="AC" onClick={onClick} />
        </div>
      </div>
      <Button className="equal" value="=" onClick={onClick} />
    </div>
  );
};

export default Buttons;
