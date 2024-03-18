import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/context';

const Header = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogOut = () => {
    context.setContext({ ...context, token: null, username: null });
    window.localStorage.clear();
    navigate('/login');
  };
  return <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white mb-4 justify-content-between">
    <div className="container">
      <Link className="navbar-brand" to="/">{t('chat')}</Link>
      <div className="row align-items-center">
        <div className="col-8">
          {context.username
            && <div>
              {t('loggedInAs')}
              <strong>{context.username}</strong>
            </div>}
        </div>
        <div className="col-4">
          {context.token && <button type="button" className="btn btn-primary" onClick={handleLogOut}>{t('logOut')}</button>}
        </div>
      </div>
    </div>
  </nav>
};

export default Header;
