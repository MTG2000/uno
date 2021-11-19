import React from "react";
import styled from "styled-components";
const Cbutton = styled.button`
  padding: 12px 17px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgb(2 15 108);
  border-radius: 1rem;
  text-align: center;
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
