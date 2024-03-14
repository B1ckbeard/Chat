import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';

const init = () => {
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

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};

export default init;
