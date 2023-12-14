// src/components/SpaceImageComponent.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  margin: 20px;
  text-align: center;
`;

const SpaceImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


const SpaceImageComponent = () => {
  const [image, setImage] = useState('');
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    const fetchSpaceImage = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=OW30s1Z3yUTENkAAg8aXMyBL10SLXiSXgZkGnNoC&concept_tags=True'); // Replace with your space image API
        const imageData = await response.json();
        setImage(imageData.url);
        setExplanation(imageData.explanation);
      } catch (error) {
        console.error('Error fetching space image:', error);
      }
    };

    fetchSpaceImage();
  }, []);

  return (
    <ImageContainer>
      <h2>Astronomy Picture of the Day</h2>
      <h3>Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</h3>
      <h4>{explanation}</h4>
      <SpaceImage src={image} alt="Space" />

    </ImageContainer>
  );
};

export default SpaceImageComponent;
