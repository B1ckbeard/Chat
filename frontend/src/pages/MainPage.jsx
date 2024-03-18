import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/context';
import Header from '../components/Header/Header';
import Chat from '../components/Chat/Chat';

const MainPage = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.token) {
      navigate('login');
    }
  }, [context.token, navigate]);

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header />
      <Chat />
    </div>
  );
};

export default MainPage;
