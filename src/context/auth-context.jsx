import { createContext, useState } from 'react';

const AuthContext = createContext({
  isAuth: null,
  isAuthSubmitHandler: function () {},
});

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const isAuthSubmitHandler = isAuth => {
    setIsAuth(isAuth);
  };

  return <AuthContext.Provider value={{ isAuth, isAuthSubmitHandler }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
