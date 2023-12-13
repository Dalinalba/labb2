// src/components/HeaderComponent.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const HeaderComponent = () => {
  return (
    <header>
      <h1>Space Explorer</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/planets">Planets</Link>
          </li>
          <li>
            <Link to="/astronauts">Astronauts</Link>
          </li>
          {/* Add links to other components as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
