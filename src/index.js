import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from "@chakra-ui/react";
import mainTheme from "./theme/main-theme";
import {Auth0Provider} from "@auth0/auth0-react";
import history from "./utils/history";
import {env} from 'process';


const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.returnTo ? appState.returnTo : window.location.pathname
    );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ChakraProvider theme={mainTheme}>
          <Auth0Provider
              domain={process.env.REACT_APP_AUTH0_DOMAIN}
              clientId={process.env.REACT_APP_AUTH0_CLIENTID}
              audience={process.env.REACT_APP_AUTH0_AUDIENCE}
              redirectUri={process.env.REACT_APP_AUTH0_REDIRECTURL}
              useRefreshTokens={true}
              cacheLocation="localstorage"
              onRedirectCallback={onRedirectCallback}
          >
          <App />
          </Auth0Provider>
      </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
