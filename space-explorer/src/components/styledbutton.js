// src/components/StyledButton.js
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? 'blue' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'blue')};
  /* Add more styles as needed */
`;

export default StyledButton;
