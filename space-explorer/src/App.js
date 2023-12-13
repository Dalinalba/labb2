// src/App.js
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import
import HeaderComponent from './components/HeaderComponent';
import PlanetList from './components/PlanetList';
import CountdownTimer from './components/CountdownTimer';
import ThemeSwitcher from './components/ThemeSwitcher';
import AstronautComponent from './components/AstronautComponent';
import SpaceImageComponent from './components/SpaceImageComponent';
import SpaceFactComponent from './components/SpaceFactComponent';
import GlobalStyles from './components/GlobalStyles';
import { ThemeProvider } from 'styled-components';

export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <div>
          <GlobalStyles />
            <HeaderComponent />
            <Routes> 
              <Route path="/planets" element={<PlanetList />} />
              <Route path="/astronauts" element={<AstronautComponent />} />
              <Route path="/space-image" element={<SpaceImageComponent />} />
              <Route path="/space-fact" element={<SpaceFactComponent />} />
              <Route path="/" element={<CountdownTimer />} />
            </Routes>
            <ThemeSwitcher />
          </div>
        </Router>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
