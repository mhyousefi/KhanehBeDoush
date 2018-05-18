import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  rootEl
)

registerServiceWorker();
