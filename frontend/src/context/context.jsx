import { createContext, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    token: window.localStorage.getItem('token'),
    username: window.localStorage.getItem('username'),
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ ...context, setContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
