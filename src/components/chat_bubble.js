import React from 'react';
import classnames from 'classnames';

const ChatBubble = ({ text, isRight }) => {

  const { leftBubbleStyle, rightBubbleStyle } = styles;

  const sideClass = isRight ? rightBubbleStyle : leftBubbleStyle;

  // https://css-tricks.com/almanac/properties/f/float/
  return (
    <div>
      <div className={sideClass}>
        <p className="chat-text">{text}</p>
      </div>
      <div className="chat-bubble-bottom-space" />
    </div>

  );
};

const styles = {
  leftBubbleStyle: classnames({
    'chat-bubble': true,
    'left-bubble': true,
  }),

  rightBubbleStyle: classnames({
    'chat-bubble': true,
    'right-bubble': true
  })
};

export default ChatBubble;
