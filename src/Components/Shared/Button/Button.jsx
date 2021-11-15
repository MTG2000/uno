import React from "react";
import styled from "styled-components";
const Cbutton = styled.button`
  padding: 12px 17px;
  border-radius: 1rem;
  border: 1px solid #9b9d2d;
  box-shadow: inset 0 0 5px 1px black, 0 0 10px 1px #e46b0c;
  background-color: rgb(56 49 84);
  color: white;
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;
const Button = ({ children, ...props }) => {
  return <Cbutton {...props}>{children}</Cbutton>;
};

export default Button;
