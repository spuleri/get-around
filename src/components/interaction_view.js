import React, { Component } from 'react';
import LanguagePicker from './language_picker';
import InteractionDataSource from '../models/interaction_datasource';
import ChatBox from './chat_box';
import ChatArea from './chat_area'
import InteractionViewButton from './interaction_view_button';

class InteractionView extends Component {

  constructor(props) {
    super(props);

    // Set the interaction datasource
    this.interactionDataSource = new InteractionDataSource();

    // State to flip flop between primary and secondary user
    this.state = { primaryUserActive: true };

    // Maintain the current text in the textbox
    this.currentTypedText = '';
  }

  switchUsers() {
    // Swap states to other user
    const currentState = this.state.primaryUserActive;
    this.setState({ primaryUserActive: !currentState });

    // TODO: Make Translate API Call
    console.log(`Switching users\nText to translate: ${this.currentTypedText}`);

    // Reset current typed text
    this.currentTypedText = '';

    // TODO: Switch history of chats
  }

  completeInteraction() {
    console.log('Finishing up interaction!!!');
  }

  pickLanguage(language) {
    let logStatement;

    // Set the new language for the appropiate user
    if (this.state.primaryUserActive) {
      logStatement = `Primary User chose ${language}`;
      this.interactionDataSource.setPrimaryUserLanguage(language);
    } else {
      logStatement = `Secondary User chose ${language}`;
      this.interactionDataSource.setSecondaryUserLanguage(language);
    }
    console.log(logStatement);
  }

  textHasBeenTyped(text) {
    // Update currently typed text
    this.currentTypedText = text;
  }


  render() {
    // Get the current active language
    let currentUserLanguage;
    if (this.state.primaryUserActive) {
      currentUserLanguage = this.interactionDataSource.primaryUserLanguage;
    } else {
      currentUserLanguage = this.interactionDataSource.secondaryUserLanguage;
    }
    console.log(`The current users language is: ${currentUserLanguage}`);

    // The ChatArea Component receives the current value of typed text
    // in order to reset and clear the state when we swap states to the other user.
    // Since that swap happens in this component.
    return (
      <div>
        <LanguagePicker
          currentLanguage={currentUserLanguage}
          handler={this.pickLanguage.bind(this)}
        />
        <ChatBox />
        <ChatArea handler={this.textHasBeenTyped.bind(this)} text={this.currentTypedText} />
        <InteractionViewButton
          onTap={this.switchUsers.bind(this)}
          color='yellow'
          icon='fa-arrow-circle-o-right'
        />
        <InteractionViewButton
          onTap={this.completeInteraction}
          color='green'
          icon='fa-check-circle-o'
        />
      </div>
    );
  }
}

export default InteractionView;
