import React from "react";
import styled from "styled-components";
const Ctypography = styled.p`
  color: white;
  text-shadow: 0 0 3px white;
  font-weight: bold;
`;
const Typography = (props) => {
  return <Ctypography {...props} />;
};

export default Typography;
