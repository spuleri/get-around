import React, { Component } from 'react';
import HttpClient from '../http_client';


class LanguagePicker extends Component {

  constructor(props) {
    super(props);
    const defaultLanguages = ['English', 'Spanish', 'Japanese', 'French'];
    this.selectionHandler = props.handler;
    this.state = { currentLanguage: props.currentLanguage, languages: defaultLanguages };

    HttpClient.fetchLanguagesAsync((languages, err) => {
      if (!err) {
        // Update the state with the newly fetched languages
        this.setState({ languages });
      } else {
        console.log('Error fetching languages');
        console.log(err);
      }
    });
  }

  // Need to update selected language based on which user is active
  componentWillReceiveProps(nextProps) {
    const currentLanguage = nextProps.currentLanguage;
    this.setState({ currentLanguage });
  }

  selectionMade(event) {
    const newLanguage = event.target.value;
    this.setState({ currentLanguage: newLanguage });
    console.log(`current language is ${this.state.currentLanguage}`);

    // Update the parent component so it can store the new language in the model
    this.selectionHandler(newLanguage);
  }

  makeOptionElement(language, index) {
    return <option key={index}>{language}</option>;
  }
  render() {
    return (
      <div>
        <p className="control">
          <span className="select is-large">
            <select
              value={this.state.currentLanguage}
              onChange={this.selectionMade.bind(this)}
            >
              {this.state.languages.map(this.makeOptionElement)}
            </select>
          </span>
        </p>
      </div>

    );
  }
}

export default LanguagePicker;
