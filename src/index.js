import React from 'react';
import ReactDOM from 'react-dom';
import TranslationInput from './components/translation_input';

// Create component to produce some HTML

const App = () => {
  return (
    <div>
      <TranslationInput />
    </div>
  );
};

// Take this component's HTML and put it on the DOM
// Second paramter, is the target PARENT CONTAINER COMPONENT!!!
// The root node of the entire React App is the:
// <div class="container"></div>
// In the <body>
ReactDOM.render(<App />, document.querySelector('.container'));
