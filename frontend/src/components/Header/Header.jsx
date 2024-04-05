import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/userContext';
import routes from '../../routes';

const Header = () => {
  const { token, username, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogOut = () => {
    logOut();
    navigate(routes.loginPage());
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white mb-4 justify-content-between">
      <div className="container">
        <Link className="navbar-brand" to={routes.mainPage()}>{t('chat')}</Link>
        <div className="row align-items-center">
          <div className="col-8">
            {username
              && (
                <div>
                  {t('loggedInAs')}
                  <strong>{username}</strong>
                </div>
              )}
          </div>
          <div className="col-4">
            {token && <button type="button" className="btn btn-primary" onClick={handleLogOut}>{t('logOut')}</button>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
