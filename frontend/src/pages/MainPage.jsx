import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Header from '../components/Header';
import Chat from '../components/Chat/Chat';
import routes from '../routes';

const MainPage = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.token) {
      navigate(routes.loginPage());
    }
  }, [context.token, navigate]);

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <Header />
      <Chat />
    </div>
  );
};

export default MainPage;
