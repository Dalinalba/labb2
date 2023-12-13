// src/components/ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
