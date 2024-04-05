import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import ru from './locales/ru.js';
import 'react-toastify/dist/ReactToastify.css';
import initSocket from './socket.js';
import { UserContextProvider } from './context/userContext';
import { SocketContextProvider } from './context/socketContext';

const init = () => {
  const socket = initSocket();
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        ru,
      },
      lng: 'ru',
    });

  return (
    <UserContextProvider>
      <SocketContextProvider sockets={socket}>
        <RollBarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <Provider store={store}>
                <App />
              </Provider>
            </I18nextProvider>
          </ErrorBoundary>
        </RollBarProvider>
        <ToastContainer />
      </SocketContextProvider>
    </UserContextProvider>
  );
};

export default init;
