// src/components/ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import StyledButton from './StyledButton'; // Import the StyledButton component


const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <StyledButton primary onClick={toggleTheme}>
        Toggle Theme
      </StyledButton>
    </div>
  );
};

export default ThemeSwitcher;
