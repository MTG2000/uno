import Grid from "@mui/material/Grid";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-top: 2vh;
  position: relative;
  z-index: 25;
  .uno {
    position: absolute;
    width: 132px;
    top: 71px;
    filter: drop-shadow(2px 5px 6px blue);
  }
`;
const Paper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  margin: 20vh 5vw;
  padding: 8% 4%;
  text-align: center;
  min-height: 60vh;
  border-radius: 1rem;
  box-shadow: 0 0 3px 1px rgb(2 15 108);
  position: relative;
`;

const APaper = ({ children }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <FlexContainer>
          <img className="uno" src="/imges/uno.png" alt="" />
        </FlexContainer>
      </Grid>
      <Grid item xs={12} md={10} lg={8}>
        <Paper>{children}</Paper>
      </Grid>
    </Grid>
  );
};

export default APaper;
