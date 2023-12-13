// src/components/PlanetList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PlanetContainer = styled.div`
  background-color: #BAB86C;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PlanetTitle = styled.h2`
  color: #33;
  text-align: center;
  margin-bottom: 20px;
`;

const PlanetListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlanetItem = styled.li`
  background-color: #FBE7A1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0e0e0;
  }
`;

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
    <PlanetContainer>
      <PlanetTitle>Planets</PlanetTitle>
      <PlanetListContainer>
        {planets.map((planet) => (
          <PlanetItem key={planet.id}>{planet.englishName}</PlanetItem>
        ))}
      </PlanetListContainer>
    </PlanetContainer>
  );
};

export default PlanetList;
