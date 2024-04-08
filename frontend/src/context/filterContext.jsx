import { createContext, useCallback } from 'react';
import leoProfanity from 'leo-profanity';

const FilterContext = createContext({});

const FilterContextProvider = ({ children }) => {
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const filterProfanity = useCallback((el) => leoProfanity.clean(el), []);

  return <FilterContext.Provider value={filterProfanity}>{children}</FilterContext.Provider>;
};

export { FilterContext, FilterContextProvider };
