// src/App.js
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import PlanetList from './components/PlanetList';
import ThemeSwitcher from './components/ThemeSwitcher';
import AstronautComponent from './components/AstronautComponent';
import SpaceImageComponent from './components/SpaceImageComponent';
import SpaceFactComponent from './components/SpaceFactComponent';
import GlobalStyles from './components/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import PlanetDetails from './components/PlanetDetails';
import styled from 'styled-components';

export const ThemeContext = createContext();

const StyledText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 20vh; /* Adjust the height as needed */
  font-size: 24px;
  color: ${(props) => (props.theme.mode === 'light' ? '#000' : '#fff')};
  padding: 20px;
  margin: 20px;
  background-color: ${(props) => (props.theme.mode === 'light' ? '#fff' : '#333')};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeSwitcher />
        <Router>
          <div>
            <GlobalStyles />
            <HeaderComponent />
            <Routes>
              <Route path="/planets" element={<PlanetList />} />
              <Route path="/planet/:planetId" element={<PlanetDetails />} />
              <Route path="/astronauts" element={<AstronautComponent />} />
              <Route path="/space-image" element={<SpaceImageComponent />} />
              <Route path="/space-fact" element={<SpaceFactComponent />} />
              {/* Replace CountdownTimer with a styled text component */}
              <Route path="/" element={<StyledText>An application where users can explore information about space.

              </StyledText>} />
            </Routes>
          </div>
        </Router>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
