import React, { Component } from 'react';
import ChatBubble from './chat_bubble';

class ChatBox extends Component {

  constructor(props) {
    super(props);

    this.state = { chats: [] };
  }

  // Need to update chats upon language switch
  componentWillReceiveProps(nextProps) {
    const newChats = nextProps.chats;

    // Configure chats to be displayed properly
    const chats = newChats.map(chat => {
      if (chat.isSentFromPrimary) {
        return { text: chat.text, isRight: false };
      }
      return { text: chat.text, isRight: true };
    });

    // Update state
    this.setState({ chats });
  }

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
