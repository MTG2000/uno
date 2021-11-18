import React from "react";
import styled from "styled-components";
const Ctypography = styled.p`
  color: white;
  font-weight: bold;
`;
const Typography = (props) => {
  return <Ctypography {...props} />;
};

export default Typography;
