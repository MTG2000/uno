import React from "react";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Typography from "../Typography/Typography";

// const FlexContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-item: center;
//   margin-top: 2vh;
//   position: relative;
//   z-index: 25;
// `;
const Paper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20vh 5vw ;
  padding: 8% 4%;
  text-align: center;
  min-height: 60vh;
  border-radius: 1rem;
  box-shadow: inset 0 0 3px 1px rgb(255 131 2 / 30%), 0 0 3px 1px rgb(255 106 0);
  position: relative;

  .uno {
    box-shadow: inset 0 0 3px 1px rgb(255 131 2 / 30%),
      0 0 3px 1px rgb(255 106 0);
    position: absolute;
    height: 3vw;
    width: 50%;
    top: -20px;
    letter-spacing: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #342d54;
`;

const APaper = ({ children }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      {/* <Grid item xs={12}>
        <FlexContainer>
          <img
            src="./imges/Uno-logo2.ico"
            width="10%"
            style={{ filter: "drop-shadow(1px 4px 6px #fb5a03)" }}
            alt=""
          />
        </FlexContainer>
      </Grid> */}
      <Grid item xs={12} md={10} lg={8}>
        <Paper>
          {/* <img className="uno" src="./imges/unoLogo.png" alt="" /> */}
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={6} md={7}>
              <Typography className="uno">UNOGAME</Typography>
            </Grid>
          </Grid>

          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default APaper;
