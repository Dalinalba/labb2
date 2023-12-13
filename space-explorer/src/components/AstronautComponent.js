// src/components/AstronautComponent.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AstronautContainer = styled.div`
  background-color: #ff08;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AstronautList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AstronautItem = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
`;


const AstronautComponent = () => {
  const [astronauts, setAstronauts] = useState([]);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/astros.json'); // Use the Open Notify API for astronaut data
        const astronautData = await response.json();
        setAstronauts(astronautData.people);
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      }
    };

    fetchAstronauts();
  }, []);

  return (
    <AstronautContainer>
      <h2>Astronauts</h2>
      <AstronautList>
        {astronauts.map((astronaut, index) => (
          <AstronautItem key={index}>{astronaut.name}</AstronautItem>
        ))}
      </AstronautList>
    </AstronautContainer>
  );
};

export default AstronautComponent;
