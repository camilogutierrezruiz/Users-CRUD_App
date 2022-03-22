import React from 'react';

const GlobalButtons = ({ ButtonClassName, ButtonType, ButtonTextContent, ButtonOnClickAction }) => {
  return (
    <button
      type={ButtonType}
      className={ButtonClassName}
      onClick={ButtonOnClickAction}
    >{ButtonTextContent}</button>
  );
};

export default GlobalButtons;