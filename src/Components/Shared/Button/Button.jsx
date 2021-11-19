import React from "react";
import styled from "styled-components";
const Cbutton = styled.button`
  padding: 16px 36px;
  text-transform: capitalize;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(2 15 108);
  border-radius: 12px;
  text-align: center;
  color: white;
  transition: transform 0.3s ease-in-out;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
const Button = ({ children, ...props }) => {
  return <Cbutton {...props}>{children}</Cbutton>;
};

export default Button;
