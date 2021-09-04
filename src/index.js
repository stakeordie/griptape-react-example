import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { gripApp, getKeplrAccountProvider } from '@stakeordie/griptape.js';

const restUrl = 'https://chainofsecrets.secrettestnet.io';
const provider = getKeplrAccountProvider();

gripApp(restUrl, provider, () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
});
