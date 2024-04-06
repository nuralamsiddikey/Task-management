import React, { createContext, useState, useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
 


  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
  
  };

 
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  const { isAuthenticated, login, logout, token, setToken } =
    useContext(AuthContext);
  return { isAuthenticated, login, logout, token, setToken };
};
