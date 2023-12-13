// src/components/AstronautComponent.js
import React, { useState, useEffect } from 'react';

const AstronautComponent = () => {
  const [astronauts, setAstronauts] = useState([]);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const response = await fetch('https://api.example.com/astronauts'); // Replace with your astronaut API
        const astronautData = await response.json();
        setAstronauts(astronautData);
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      }
    };

    fetchAstronauts();
  }, []);

  return (
    <div>
      <h2>Astronauts</h2>
      <ul>
        {astronauts.map((astronaut) => (
          <li key={astronaut.id}>{astronaut.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AstronautComponent;
