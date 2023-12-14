// src/components/HeaderComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${(props) => (props.theme.mode === 'light' ? '#fff' : '#333')};
  color: ${(props) => (props.theme.mode === 'light' ? '#000' : '#fff')};
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center the content horizontally */
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => (props.theme.mode === 'light' ? '#007BFF' : '#61dafb')};
    font-weight: bold;
    font-size: 16px;

    &:hover {
      color: ${(props) => (props.theme.mode === 'light' ? '#0056b3' : '#0d8aed')};
    }
  }
`;

const HeaderTitle = styled.h1`
  color: inherit; /* Use the same color as the header */
  font-size: 24px; /* Adjust the font size as needed */
`;

const HeaderComponent = () => {
  return (
    <StyledHeader>
      <HeaderTitle>Space Explorer</HeaderTitle>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/planets">Planets</Link>
          </li>
          <li>
            <Link to="/astronauts">Astronauts</Link>
          </li>
          <li>
            <Link to="/space-image">Space Image</Link>
          </li>
          <li>
            <Link to="/space-fact">Space Fact</Link>
          </li>
        </ul>
      </Nav>
    </StyledHeader>
  );
};

export default HeaderComponent;
