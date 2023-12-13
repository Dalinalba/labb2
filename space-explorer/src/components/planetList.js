// src/components/PlanetList.js
import React, { useState, useEffect } from 'react';

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
        const planetData = await response.json();
        setPlanets(planetData.bodies);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div>
      <h2>Planets</h2>
      <ul>
        {planets.map((planet) => (
          <li key={planet.id}>{planet.englishName}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetList;
