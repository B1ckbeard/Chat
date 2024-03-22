import React from 'react';
// import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import ru from './locales/ru.js';
import 'react-toastify/dist/ReactToastify.css';

const init = () => {
  const rollbarConfig = {
    accessToken: '36932e56e76743b4a784ca438747f6a5',
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
    <>
      <RollBarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <App />
            </Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollBarProvider>
      ,
    </>
  );
};

export default init;
