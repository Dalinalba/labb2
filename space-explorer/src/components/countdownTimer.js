// src/components/CountdownTimer.js
import React, { useReducer, useEffect, useState } from 'react';

const NASA_API_KEY = 'OW30s1Z3yUTENkAAg8aXMyBL10SLXiSXgZkGnNoC';

const countdownReducer = (state, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 10 };
    default:
      return state;
  }
};

const fetchRandomNASAImage = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?count=10&api_key=${NASA_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NASA image:', error);
  }
};

const CountdownTimer = () => {
  const [state, dispatch] = useReducer(countdownReducer, { count: 10 });
  const [nasaData, setNasaData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'DECREMENT' });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (state.count === 0) {
      fetchRandomNASAImage().then((data) => {
        console.log(data); // Log the fetched data for reference
        setNasaData(data); // Update state to store the NASA data
      });

      dispatch({ type: 'RESET' });
    }
  }, [state.count]);

  return (
    <div>
      <h2>Countdown: {state.count} seconds</h2>
      {nasaData && (
        <div>
          <img src={nasaData.url} alt={nasaData.title} style={{ maxWidth: '100%' }} />
          <h3>{nasaData.title}</h3>
          <p>Date: {nasaData.date}</p>
          <p>{nasaData.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
