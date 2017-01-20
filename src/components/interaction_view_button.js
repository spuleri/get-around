import React from 'react';
import classnames from 'classnames';

const InteractionViewButton = ({ onTap, color, icon }) => {
  // ^ Destructuring onTap prop function attribute from props object.

  const anchorTagClasses = classnames({
     button: true,
     'interaction-view-button': true,
     'is-warning': color === 'yellow',
     'is-success': color === 'green',
   });

  // Template literal: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  const iconTagClasses = `interaction-view-icon fa ${icon}`;

  return (
    <a className={anchorTagClasses} onClick={onTap}>
      <span clasName="icon is-small">
        <i className={iconTagClasses} />
      </span>
    </a>
  );
};

export default InteractionViewButton;
