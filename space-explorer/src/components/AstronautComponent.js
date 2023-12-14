// src/components/AstronautComponent.js
import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';

const AstronautContainer = styled.div`
  background-color: #BAB86C;
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

const IssLocationContainer = styled.div`
  background-color: #8CB4E1;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IssLocationItem = styled.p`
  margin: 10px 0;
`;

const CountdownMessage = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

// Reducer function
const timerReducer = (state, action) => {
  switch (action.type) {
    case 'tick':
      return { counter: state.counter - 1 };
    case 'reset':
      return { counter: 10 };
    default:
      return state;
  }
};

const AstronautComponent = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [issLocation, setIssLocation] = useState(null);
  const [timerState, dispatch] = useReducer(timerReducer, { counter: 10 });

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const astronautResponse = await fetch('http://api.open-notify.org/astros.json');
        const astronautData = await astronautResponse.json();
        setAstronauts(astronautData.people);
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      }
    };

    const fetchIssLocation = async () => {
      try {
        const issResponse = await fetch('http://api.open-notify.org/iss-now.json');
        const issData = await issResponse.json();
        setIssLocation(issData);
      } catch (error) {
        console.error('Error fetching ISS location:', error);
      }
    };

    // Fetch data on initial load
    fetchAstronauts();
    fetchIssLocation();

    // Set up interval for countdown and data fetching
    const intervalId = setInterval(() => {
      dispatch({ type: 'tick' });

      if (timerState.counter === 0) {
        dispatch({ type: 'reset' });
        fetchAstronauts();
        fetchIssLocation();
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [timerState]);

  return (
    <div>
         <CountdownMessage>Data will update in {timerState.counter} seconds.</CountdownMessage>
      <AstronautContainer>
        <h2>How Many Astronauts Are In Space Right Now</h2>
        <AstronautList>
          {astronauts.map((astronaut, index) => (
            <AstronautItem key={index}>{astronaut.name}</AstronautItem>
          ))}
        </AstronautList>
      </AstronautContainer>

      {issLocation && (
        <IssLocationContainer>
          <h2>Current ISS Location Over Earth</h2>
          <IssLocationItem>Timestamp: {new Date(issLocation.timestamp * 1000).toLocaleString()}</IssLocationItem>
          <IssLocationItem>Latitude: {issLocation.iss_position.latitude}</IssLocationItem>
          <IssLocationItem>Longitude: {issLocation.iss_position.longitude}</IssLocationItem>
          <IssLocationItem>Message: {issLocation.message}</IssLocationItem>
        </IssLocationContainer>
      )}


    </div>
  );
};

export default AstronautComponent;
