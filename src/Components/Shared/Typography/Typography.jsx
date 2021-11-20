import React from "react";
import styled from "styled-components";
import { Typography as MuiTypography } from "@mui/material";

const Ctypography = styled(MuiTypography)`
  color: white;
  font-weight: bold;
`;
const Typography = (props) => {
  return <Ctypography {...props} />;
};

export default Typography;
