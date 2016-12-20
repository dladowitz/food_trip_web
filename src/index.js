import React from 'react';
import ReactDOM from 'react-dom';

import StartEndForm from './components/start_end_form.js';

const API_KEY = 'xxxxxxxx';

const App = () => {
  return (
    <div>
      Food Trip

      <br />
      <StartEndForm />
    </div>
  )
};

// render App to DOM;
ReactDOM.render(<App />, document.querySelector('.container'));
