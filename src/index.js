import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import StartButton from './components/start_button';
import InteractionView from './components/interaction_view';
import CenterContainer from './components/center_container';

// Create component to produce some HTML

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { startInteraction: false };
  }


  switchViews() {
    this.setState({ startInteraction: !this.state.startInteraction });
  }

  renderView() {
    console.log('in renderView');
    if (!this.state.startInteraction) {
      return (
        <CenterContainer>
            <StartButton onTap={this.switchViews.bind(this)} />
        </CenterContainer>
      );
    }
    // Otherwise, we're at the main interaction view.
    return (
      <CenterContainer>
        <InteractionView />
      </CenterContainer>
    );
  }

  render() {
    return (
      <div>
        <h1 className="has-text-centered title is-1">GetAround</h1>
        {this.renderView()}

      </div>
    );
  }
}

// Take this component's HTML and put it on the DOM
// Second paramter, is the target PARENT CONTAINER COMPONENT!!!
// The root node of the entire React App is the:
// <div class="container"></div>
// In the <body>
ReactDOM.render(<App />, document.querySelector('.container'));
