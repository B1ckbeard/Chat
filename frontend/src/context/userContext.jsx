import { createContext, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    token: window.localStorage.getItem('token'),
    username: window.localStorage.getItem('username'),
  });

  const logIn = (token, username) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('username', username);
    setContext({ token, username });
  };

  const logOut = () => {
    setContext({ token: null, username: null });
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{
      ...context, setContext, logIn, logOut,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
