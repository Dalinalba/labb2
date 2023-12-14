// src/components/PlanetDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailContainer = styled.div`
  background-color: #EAEAEA;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DetailTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const DetailItem = styled.p`
  margin: 10px 0;
`;

const PlanetDetails = () => {
  const { planetId } = useParams();
  const [planetDetails, setPlanetDetails] = useState(null);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetId}`);
        const details = await response.json();
        setPlanetDetails(details);
      } catch (error) {
        console.error('Error fetching planet details:', error);
      }
    };

    fetchPlanetDetails();
  }, [planetId]);

  if (!planetDetails) {
    return <p>Loading planet details...</p>;
  }

  return (
    <DetailContainer>
      <DetailTitle>{planetDetails.englishName}</DetailTitle>
      <DetailItem>Mass: {planetDetails.mass.massValue} x 10^{planetDetails.mass.massExponent} kg</DetailItem>
      <DetailItem>Volume: {planetDetails.vol.volValue} x 10^{planetDetails.vol.volExponent} km³</DetailItem>
      <DetailItem>Density: {planetDetails.density} kg/m³</DetailItem>
      <DetailItem>Gravity: {planetDetails.gravity} m/s²</DetailItem>
      <DetailItem>Escape Velocity: {planetDetails.escape} m/s</DetailItem>
      <DetailItem>Mean Radius: {planetDetails.meanRadius} km</DetailItem>
      <DetailItem>Equatorial Radius: {planetDetails.equaRadius} km</DetailItem>
      <DetailItem>Polar Radius: {planetDetails.polarRadius} km</DetailItem>
      <DetailItem>Flattening: {planetDetails.flattening}</DetailItem>
      <DetailItem>Discovered By: {planetDetails.discoveredBy}</DetailItem>
      <DetailItem>Discovery Date: {planetDetails.discoveryDate}</DetailItem>
      {/* Include other details you want to display */}
    </DetailContainer>
  );
};

export default PlanetDetails;
