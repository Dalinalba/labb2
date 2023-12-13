// src/components/SpaceImageComponent.js
import React, { useState, useEffect } from 'react';

const SpaceImageComponent = () => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchSpaceImage = async () => {
      try {
        const response = await fetch('https://api.example.com/space-image'); // Replace with your space image API
        const imageData = await response.json();
        setImage(imageData.url);
      } catch (error) {
        console.error('Error fetching space image:', error);
      }
    };

    fetchSpaceImage();
  }, []);

  return (
    <div>
      <h2>Space Image</h2>
      <img src={image} alt="Space" />
    </div>
  );
};

export default SpaceImageComponent;
