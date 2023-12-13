// src/components/SpaceFactComponent.js
import React, { useState, useEffect } from 'react';

const SpaceFactComponent = () => {
  const [bodies, setBodies] = useState([]);
  const [selectedBody, setSelectedBody] = useState(null);
  const [bodyData, setBodyData] = useState(null);

  useEffect(() => {
    const fetchBodies = async () => {
      try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
        const bodyData = await response.json();
        setBodies(bodyData.bodies);
      } catch (error) {
        console.error('Error fetching space bodies:', error);
      }
    };

    fetchBodies();
  }, []);

  const fetchBodyDetails = async (id) => {
    try {
      const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`);
      const bodyDetails = await response.json();
      setBodyData(bodyDetails);
    } catch (error) {
      console.error('Error fetching body details:', error);
    }
  };

  const handleBodyChange = (event) => {
    const selectedId = event.target.value;
    setSelectedBody(selectedId);
    fetchBodyDetails(selectedId);
  };

  return (
    <div>
      <h2>Space Fact</h2>
      <label htmlFor="bodySelect">Select a celestial body:</label>
      <select id="bodySelect" onChange={handleBodyChange} value={selectedBody || ''}>
        <option value="" disabled>Select a body</option>
        {bodies.map((body) => (
          <option key={body.id} value={body.id}>
            {body.englishName}
          </option>
        ))}
      </select>

      {bodyData && (
        <div>
          <h3>{bodyData.englishName}</h3>
          <p>{bodyData.isPlanet ? 'Planet' : 'Not a Planet'}</p>
          <p>Semimajor Axis: {bodyData.semimajorAxis}</p>
          <p>Perihelion: {bodyData.perihelion}</p>
          <p>Aphelion: {bodyData.aphelion}</p>
          <p>Eccentricity: {bodyData.eccentricity}</p>
          <p>Inclination: {bodyData.inclination}</p>
          <p>Mass: {bodyData.massValue} x 10^{bodyData.massExponent} kg</p>
          <p>Volume: {bodyData.volValue} x 10^{bodyData.volExponent} km³</p>
          <p>Density: {bodyData.density} g/cm³</p>
          <p>Gravity: {bodyData.gravity} m/s²</p>
          <p>Escape Velocity: {bodyData.escape} km/s</p>
          <p>Mean Radius: {bodyData.meanRadius} km</p>
          <p>Equatorial Radius: {bodyData.equaRadius} km</p>
          <p>Polar Radius: {bodyData.polarRadius} km</p>
          <p>Flattening: {bodyData.flattening}</p>
          <p>Dimension: {bodyData.dimension}</p>
          <p>Sidereal Orbit: {bodyData.sideralOrbit} days</p>
          <p>Sidereal Rotation: {bodyData.sideralRotation} hours</p>
          <p>Discovered By: {bodyData.discoveredBy}</p>
          <p>Discovery Date: {bodyData.discoveryDate}</p>
          <p>Body Type: {bodyData.bodyType}</p>
        </div>
      )}
    </div>
  );
};

export default SpaceFactComponent;
