import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const {darkMode, setDarkMode} = useStateContext();

  const toggleTheme = () => {
    setDarkMode(darkMode==='dark' ? 'light' : 'dark');
  };

  return (
    <nav className={`bg-gray-300 ${darkMode === 'dark' ? 'dark:bg-cyan-800' : ''} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-dark text-3xl font-bold">ReviewApp</a>
        <div className="flex space-x-4">
          <a href="/" className={` ${darkMode === 'dark' ? 'text-white hover:text-green-300' : 'text-dark hover:text-gray-600'}`}>Home</a>

          <a href="/reviews" className={` ${darkMode === 'dark' ? 'text-white hover:text-green-300' : 'text-dark hover:text-gray-600'}`}>Post Review</a>

          {/* <a href="/about" className={` ${darkMode === 'dark' ? 'text-white hover:text-green-300' : 'text-dark hover:text-gray-600'}`}>About</a>*/}
          
          <a href="/contact" className={` ${darkMode === 'dark' ? 'text-white hover:text-green-300' : 'text-dark hover:text-gray-600'}`}>Contact</a>
          <button
            onClick={toggleTheme}
            className={`text-dark hover:text-gray-600 ${darkMode === 'dark' ? 'text-white hover:text-green-300' : ''} focus:outline-none`}
          >
            {darkMode === 'dark' ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
