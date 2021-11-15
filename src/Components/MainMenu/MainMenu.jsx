import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "../Shared/Paper/Paper";
import Button from "../Shared/Button/Button";
import Typography from "../Shared/Typography/Typography";
import { Link } from "react-router-dom";
const style = {
  color: "#ff8d00",
  textDecorationColor: "#ffe000",
};

const MainMenu = () => {
  return (
    <Paper>
      <Grid container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item xs={10}>
          <Typography>Start Pling:</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          spacing={4}
          sx={12}
        >
          <Grid item xs={12} md={5}>
            <Button style={{ width: "80%" }}>
              <Link to="/create-server">
                <Typography>Create A Game</Typography>
              </Link>
            </Button>
          </Grid>
          <Grid item sx={{ display: { xs: "none", md: "initial" } }} md={2}>
            <Typography>OR</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Button style={{ width: "80%" }}>
              <Link to="/join-server">
                <Typography>Join A Game</Typography>
              </Link>
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          sx={12}
        >
          <Grid item xs={6}>
            <Link style={style} to="/">
              Profile Setting
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          sx={12}
        >
          <Grid item xs={6}>
            <Link style={style} to="/">
              Game Rules
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainMenu;
