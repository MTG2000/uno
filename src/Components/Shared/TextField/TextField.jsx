import React from "react";
import styled from "styled-components";

const CtextField = styled.input`
  display: inline-block;
  width: 75%;
  height: 30%;
  padding: 4%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #fb0303;
  border-width: 0 0 3px 2px;
  border-radius: 1rem;
  box-shadow: inset 1px 0 5px 1px black;
  text-align: center;
  text-shadow: 0 0 3px;
  font-size: large;
  ::placeholder {
    color: #f37000;
    text-shadow: 0 0 3px;
    opacity: 1;
  }
  :focus {
  }

  color: #f37000;
`;
const TextField = (props) => {
  return <CtextField {...props} />;
};

export default TextField;
