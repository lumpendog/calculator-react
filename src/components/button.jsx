import React from 'react';

const Button = ({ value, className, onClick }) => {
  return (
    <div className={className} onClick={() => onClick(value)}>
      {value}
    </div>
  );
};

export default Button;
