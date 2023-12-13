// src/App.js
import React, { createContext, useState } from 'react';
import HeaderComponent from './components/headerComponent';
import PlanetList from './components/planetList';
import CountdownTimer from './components/countdownTimer';
import ThemeSwitcher from './components/themeSwitcher';
import { ThemeProvider } from 'styled-components';

export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div>
          <HeaderComponent />
          <PlanetList />
          <CountdownTimer />
          <ThemeSwitcher />
          {/* Add other components here */}
        </div>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
