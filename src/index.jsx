import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Socket } from 'react-socket-io';
import AppState from './AppState';
import App from './App';

const appState = new AppState();

render(
  <AppContainer>
    <Socket>
      <App appState={appState} />
    </Socket>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <Socket>
          <NextApp appState={appState} />
        </Socket>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
