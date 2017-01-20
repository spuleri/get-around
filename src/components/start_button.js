import React from 'react';

const StartButton = ({ onTap }) => {
  // ^ Destructuring onTap prop function attribute from props object.
  return (
    <a className="button is-success start-button" onClick={onTap}>
      <span clasName="icon is-small">
        <i className="start-icon fa fa-arrow-circle-right" />
      </span>
    </a>
  );
};

export default StartButton;
