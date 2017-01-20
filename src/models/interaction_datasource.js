class InteractionDataSource {

  primaryUserLanguage = 'English';
  secondaryUserLanguage = 'English';
  primaryUsersMessages = [];
  secondaryUsersMessages = [];

  setPrimaryUserLanguage(language) {
    this.primaryUserLanguage = language;
  }
  setSecondaryUserLanguage(language) {
    this.secondaryUserLanguage = language;
  }

  primaryUserDidSendMessage(original, translation) {
    this.primaryUsersMessages.push({ text: original, isSentFromPrimary: true });
    this.secondaryUsersMessages.push({ text: translation, isSentFromPrimary: true });
  }

  secondaryUserDidSendMessage(original, translation) {
    this.secondaryUsersMessages.push({ text: original, isSentFromPrimary: false });
    this.primaryUsersMessages.push({ text: translation, isSentFromPrimary: false });
  }
}

export default InteractionDataSource;
