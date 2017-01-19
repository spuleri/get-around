import React, { Component } from 'react';

class ChatArea extends Component {

  constructor(props) {
    super(props);
    this.handler = props.handler;
    this.state = { currentTypedText: props.currentTypedText };
  }

  // Need to update text in text area when we submit and switch users
  componentWillReceiveProps(nextProps) {
    console.log('new props:');
    console.log(nextProps);
    const currentTypedText = nextProps.text;
    this.setState({ currentTypedText });
  }

  handleTextChange(event) {
    // Get current text in text box
    const currentTypedText = event.target.value;
    // Update state in this component which governs the textarea
    this.setState({ currentTypedText });

    // prevent default event
    event.preventDefault();

    // Propogate the new text up to the parent component
    // He needs this text to translate the final string upon submission
    this.handler(currentTypedText);
  }

  render() {
    return (
      <div className="chat-area">
        <textarea
          className="chat-text-area textarea is-focused"
          onChange={this.handleTextChange.bind(this)}
          value={this.state.currentTypedText}
        />
      </div>
    );
  }

}

export default ChatArea;
