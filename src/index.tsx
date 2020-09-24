import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import './index.css';
import {tallyStore} from "./stores/tallyStore";


ReactDOM.render(
  <Provider store={tallyStore}>
      <App/>,
  </Provider>,
  document.getElementById('root'),
);
