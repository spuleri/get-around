import React, { Component } from 'react';
import ChatBubble from './chat_bubble';

class ChatBox extends Component {

  state = {
    chats: [
      { text: 'hey', isRight: false },
      { text: 'hi', isRight: true },
      { text: 'whatsup', isRight: false },
      { text: 'not much, wbu', isRight: true },
      { text: 'lol', isRight: false },
      { text: 'wtf????', isRight: true },
      { text: 'u funni', isRight: false },
      { text: 'u singl?', isRight: true },
      { text: 'no sry', isRight: false },
      { text: 'ohh', isRight: true },
      { text: 'hi', isRight: false },
      { text: 'bye', isRight: true },
      { text: 'cya', isRight: false }
     ]
  };

  renderChatBoxes() {
    // Best to use the id from a database as a key but we have no choice here,
    // so use index lol.
    return this.state.chats.map((chat, index) =>
    <ChatBubble text={chat.text} isRight={chat.isRight} key={index} />);
  }
  render() {
    return (
      <div className="chat-box">
        {this.renderChatBoxes()}
      </div>
    );
  }
}

export default ChatBox;
