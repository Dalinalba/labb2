// src/components/SpaceFactComponent.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const SpaceFactContainer = styled.div`
  background-color: #C9C0BB;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DetailsContainer = styled.div`
  background-color: #DBE9FA;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const DetailItem = styled.p`
  margin: 10px 0;
  padding: 10px;
  }
`;

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
    <SpaceFactContainer>
      <Title>Space Fact</Title>
      <Label htmlFor="bodySelect">Select a celestial body:</Label>
      <Select id="bodySelect" onChange={handleBodyChange} value={selectedBody || ''}>
        <option value="" disabled>Select a body</option>
        {bodies.map((body) => (
          <option key={body.id} value={body.id}>
            {body.englishName}
          </option>
        ))}
      </Select>

      {bodyData && (
        <DetailsContainer>
          <h3>{bodyData.englishName}</h3>
          <p>{bodyData.isPlanet ? 'Planet' : 'Not a Planet'}</p>
          <DetailItem>Semimajor Axis: {bodyData.semimajorAxis}</DetailItem>
          <DetailItem>Perihelion: {bodyData.perihelion}</DetailItem>
          <DetailItem>Aphelion: {bodyData.aphelion}</DetailItem>
          <DetailItem>Eccentricity: {bodyData.eccentricity}</DetailItem>
          <DetailItem>Inclination: {bodyData.inclination}</DetailItem>
          <DetailItem>Mass: {bodyData.massValue} x 10^{bodyData.massExponent} kg</DetailItem>
          <DetailItem>Volume: {bodyData.volValue} x 10^{bodyData.volExponent} km³</DetailItem>
          <DetailItem>Density: {bodyData.density} g/cm³</DetailItem>
          <DetailItem>Gravity: {bodyData.gravity} m/s²</DetailItem>
          <DetailItem>Escape Velocity: {bodyData.escape} km/s</DetailItem>
          <DetailItem>Mean Radius: {bodyData.meanRadius} km</DetailItem>
          <DetailItem>Equatorial Radius: {bodyData.equaRadius} km</DetailItem>
          <DetailItem>Polar Radius: {bodyData.polarRadius} km</DetailItem>
          <DetailItem>Flattening: {bodyData.flattening}</DetailItem>
          <DetailItem>Dimension: {bodyData.dimension}</DetailItem>
          <DetailItem>Sidereal Orbit: {bodyData.sideralOrbit} days</DetailItem>
          <DetailItem>Sidereal Rotation: {bodyData.sideralRotation} hours</DetailItem>
          <DetailItem>Discovered By: {bodyData.discoveredBy}</DetailItem>
          <DetailItem>Discovery Date: {bodyData.discoveryDate}</DetailItem>
          <DetailItem>Body Type: {bodyData.bodyType}</DetailItem>
          </DetailsContainer>
      )}
    </SpaceFactContainer>
  );
};

export default SpaceFactComponent;
