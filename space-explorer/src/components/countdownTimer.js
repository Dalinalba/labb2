// src/components/CountdownTimer.js
import React, { useReducer, useEffect } from 'react';

const initialState = { count: 10 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const CountdownTimer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'decrement' });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Countdown: {state.count}</div>;
};

export default CountdownTimer;
