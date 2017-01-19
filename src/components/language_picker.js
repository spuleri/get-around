import React, { Component } from 'react';

class LanguagePicker extends Component {

  constructor(props) {
    super(props);
    this.languages = ['english', 'spanish', 'japanese', 'french'];
    this.selectionHandler = props.handler;
    this.state = { currentLanguage: props.currentLanguage };
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
              {this.languages.map(this.makeOptionElement)}
            </select>
          </span>
        </p>
      </div>

    );
  }
}

export default LanguagePicker;
