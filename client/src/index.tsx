import React from 'react';
import ReactDOM from 'react-dom/client';
//import './config/firebase-config';
import App from './App';
import { Provider } from 'react-redux';
import {compose, createStore} from 'redux'
import Reducer from './reducer'

import { Auth0Provider } from '@auth0/auth0-react'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


const store = createStore(Reducer, composeEnhancers())

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={'dev-sydr5gofiqca2n6a.us.auth0.com'}
      clientId={'5CcwEuZpj1VciSC8b70jbtEhc3TFAypM'}
      authorizationParams={{
        redirect_uri: window.location.origin, 
        audience:"this is a unique identifier",
        scope: 'openid profile email'
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);


