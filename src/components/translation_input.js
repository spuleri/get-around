import React, { Component } from 'react';
// ^^^ const Component = React.Component

class TranslationInput extends Component {

  render() {
    return (
      // React.createElement
      <div className="translation-input">
        <input
          className="input"
          type="text"
          placeholder="Enter Text here"
          onChange={event => console.log(event.target.value)}
        />
      </div>
    );
  }
}

export default TranslationInput;
