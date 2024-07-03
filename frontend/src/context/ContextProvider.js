import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState('Light');

  const setMode = (e) => {
    setDarkMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  return (
    <StateContext.Provider value={{ isLoggedIn, activeSidebar, darkMode, setIsLoggedIn, setActiveSidebar, setDarkMode }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};