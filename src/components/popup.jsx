import React from 'react';

const Popup = ({ error, onClick }) => {
  const { head, message, isError } = error;
  return (
    <div className="popup">
      <div className={'popup--background' + (isError ? ' active' : '')}>
        <div className="popup--content">
          <h3 className="popup--header">{head}</h3>
          <p className="popup--message">{message}</p>
          <button className="popup--btn" onClick={onClick}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
