import React, { Component } from 'react';
import ChatBox from './chat_box';
import ChatArea from './chat_area';
import HttpClient from '../http_client';
import LanguagePicker from './language_picker';
import InteractionViewButton from './interaction_view_button';
import InteractionDataSource from '../models/interaction_datasource';

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

  doTranslation() {
    // Get the who is currently active (primary or secondary)
    const primaryActive = this.state.primaryUserActive;
    console.log(`Switching users\nText to translate: ${this.currentTypedText}`);
    this.translateText(this.currentTypedText, primaryActive);

    // Reset current typed text
    this.currentTypedText = '';
  }

  // Called ONLY after a translation finishes
  switchUsers() {
    // Get the who is currently active (primary or secondary)
    const primaryActive = this.state.primaryUserActive;

    // Swap states to other user only after translation API call finishes
    this.setState({ primaryUserActive: !primaryActive });
  }

  translateText(text, isPrimaryActive) {
    // Get current languages
    let from = this.interactionDataSource.primaryUserLanguage;
    let to = this.interactionDataSource.secondaryUserLanguage;

    // if secondary is active, swap em.
    if (!isPrimaryActive) {
        from = this.interactionDataSource.secondaryUserLanguage;
        to = this.interactionDataSource.primaryUserLanguage;
    }

    // Make translation request
    HttpClient.translate(text, from, to, (translation, err) => {
      if (!err) {
        console.log('Made translation');
        console.log(`${text} == ${translation}`);

        // Update the data source with this new information
        if (isPrimaryActive) {
          this.interactionDataSource.primaryUserDidSendMessage(text, translation);
        } else {
          this.interactionDataSource.secondaryUserDidSendMessage(text, translation);
        }

        // Swap users
        this.switchUsers();
      } else {
        console.log('Error making translation');
        console.log(err);
      }
    });
  }

  completeInteraction() {
    console.log('Finishing up interaction');
    window.open('https://ufl.qualtrics.com/jfe/form/SV_4U6sDjyBjVkA0lL', '_blank');
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
    // Aswell as the chats for the correct perspective
    let currentUserLanguage = this.interactionDataSource.primaryUserLanguage;
    let chats = this.interactionDataSource.primaryUsersMessages;
    if (!this.state.primaryUserActive) {
      currentUserLanguage = this.interactionDataSource.secondaryUserLanguage;
      chats = this.interactionDataSource.secondaryUsersMessages;
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
        <ChatBox chats={chats} />
        <ChatArea handler={this.textHasBeenTyped.bind(this)} text={this.currentTypedText} />
        <InteractionViewButton
          onTap={this.doTranslation.bind(this)}
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
