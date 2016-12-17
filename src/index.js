import React from 'react';
import ReactDOM from 'react-dom';

import StartEndForm from './start_end_form.js';

const API_KEY = 'AIzaSyDe1gPq_hqwaMwLH9w3pdvzLnngvOcrnk4';

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
