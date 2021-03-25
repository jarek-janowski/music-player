import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();