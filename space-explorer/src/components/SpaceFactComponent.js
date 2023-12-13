// src/components/SpaceFactComponent.js
import React, { useState, useEffect } from 'react';

const SpaceFactComponent = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const fetchSpaceFact = async () => {
      try {
        const response = await fetch('https://api.example.com/space-fact'); // Replace with your space fact API
        const factData = await response.json();
        setFact(factData.fact);
      } catch (error) {
        console.error('Error fetching space fact:', error);
      }
    };

    fetchSpaceFact();
  }, []);

  return (
    <div>
      <h2>Space Fact</h2>
      <p>{fact}</p>
    </div>
  );
};

export default SpaceFactComponent;
