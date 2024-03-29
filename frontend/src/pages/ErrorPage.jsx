import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import routes from '../routes';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="text-center">
        <h1 className="h4 text-muted">{t('notFoundPage')}</h1>
        <p className="text-muted">
          {t('canGoTo')}
          {' '}
          <a href={routes.mainPage()}>{t('linkToMain')}</a>
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
