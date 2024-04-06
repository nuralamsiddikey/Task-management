import React, { createContext, useState,useContext, useEffect } from 'react';


export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(()=>{
        
  },[])

  return (
    <AuthContext.Provider value={{ isAuthenticated,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = ()=>{
    const { isAuthenticated, login, logout } = useContext(AuthContext);
    return {isAuthenticated,login,logout}
}