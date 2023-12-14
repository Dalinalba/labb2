// src/components/CountdownTimer.js
import React, { useReducer, useEffect, useState } from 'react';

const initialState = {
  countdown: 60,
  photo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TICK':
      return { ...state, countdown: state.countdown - 1 };
    case 'RESET':
      return { ...state, countdown: 60, photo: action.payload };
    default:
      return state;
  }
};

const fetchMarsPhoto = async () => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=OW30s1Z3yUTENkAAg8aXMyBL10SLXiSXgZkGnNoC'
    );
    const data = await response.json();
    const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
    return randomPhoto;
  } catch (error) {
    console.error('Error fetching Mars photo:', error);
    return null;
  }
};

const CountdownTimer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  useEffect(() => {
    const storedPhoto = JSON.parse(localStorage.getItem('marsPhoto'));
    const storedCountdown = parseInt(localStorage.getItem('countdown'), 10);

    if (storedPhoto && !isNaN(storedCountdown) && storedCountdown > 0) {
      dispatch({ type: 'RESET', payload: storedPhoto });
    } else {
      fetchMarsPhoto().then((photo) => {
        dispatch({ type: 'RESET', payload: photo });
        localStorage.setItem('marsPhoto', JSON.stringify(photo));
      });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'TICK' });

      if (state.countdown === 0) {
        fetchMarsPhoto().then((photo) => {
          dispatch({ type: 'RESET', payload: photo });
          localStorage.setItem('marsPhoto', JSON.stringify(photo));
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.countdown]);

  useEffect(() => {
    localStorage.setItem('countdown', state.countdown.toString());
    if (state.photo) {
      setCurrentPhoto(state.photo);
    }
  }, [state.photo]);

  return (
    <div>
      <h2>Mars Rover Photo Countdown</h2>
      <p>Next photo in: {state.countdown} seconds</p>
      {currentPhoto && (
        <div>
          <img src={currentPhoto.img_src} alt="Mars Rover" style={{ maxWidth: '100%' }} />
          <p>Name: {currentPhoto.rover.name}</p>
          <p>Landing Date: {currentPhoto.rover.landing_date}</p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
