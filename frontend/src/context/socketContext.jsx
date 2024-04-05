import { createContext } from 'react';

const SocketContext = createContext({});

const SocketContextProvider = ({ children, sockets }) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <SocketContext.Provider value={sockets}>
    {children}
  </SocketContext.Provider>
);

export { SocketContext, SocketContextProvider };
