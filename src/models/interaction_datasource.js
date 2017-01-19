class InteractionDataSource {

  primaryUserLanguage = 'english';
  secondaryUserLanguage = 'english';
  sentMessages = { primaryUserPOV: [], secondaryUserPOV: [] };
  receivedMessages = { primaryUserPOV: [], secondaryUserPOV: [] };

  setPrimaryUserLanguage(language) {
    this.primaryUserLanguage = language;
  }
  setSecondaryUserLanguage(language) {
    this.secondaryUserLanguage = language;
  }


}

export default InteractionDataSource;
