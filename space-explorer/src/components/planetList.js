// src/components/PlanetList.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const fetchPlanetsApi = async () => {
  try {
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
    const planetData = await response.json();
    return planetData.bodies;
  } catch (error) {
    console.error('Error fetching planets:', error);
    return [];
  }
};

const PlanetContainer = styled.div`
  background-color: #C9C0BB;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PlanetTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const PlanetListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlanetItem = styled.li`
  background-color: #DBE9FA;
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
  const [loading, setLoading] = useState(true);

  const fetchPlanets = useCallback(async () => {
    const planetData = await fetchPlanetsApi();
    setPlanets(planetData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  // Memoize the list of planets
  const memoizedPlanets = useMemo(() => planets, [planets]);

  return (
    <PlanetContainer>
      <PlanetTitle>Planets</PlanetTitle>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PlanetListContainer>
          {memoizedPlanets.map((planet) => (
            <PlanetItem key={planet.id}>
              <Link to={`/planet/${planet.id}`}>{planet.englishName}</Link>
            </PlanetItem>
          ))}
        </PlanetListContainer>
      )}
    </PlanetContainer>
  );
};

export default PlanetList;
