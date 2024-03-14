import React, { useContext } from 'react';
import { UserContext } from '..//..//context/context';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogOut = () => {
    context.setContext({ ...context, token: null, username: null });
    window.localStorage.clear();
    navigate('/login');
  }
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white mb-3 ">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {context.username && <p>{t('loggedInAs')} <strong>{context.username}</strong></p>}
        {context.token && <button type="button" className="btn btn-primary" onClick={handleLogOut}>{t('logOut')}</button>}
      </div>
    </nav>);
}

export default Header;
