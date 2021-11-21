import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "../Shared/Paper/Paper";
import Button from "../Shared/Button/Button";
import Typography from "../Shared/Typography/Typography";
import { Link } from "react-router-dom";
const style = {
  color: "#fff",
};

const MainMenu = () => {
  const onPlayOffline = () => {};

  return (
    <Paper key="main-menu">
      <Grid container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item xs={10}>
          <Typography fontSize={22}>Start Playing</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={12}
        >
          <Grid item xs={12} md={5}>
            <Button disabled style={{ width: "80%" }} href="/create-server">
              <img src="assets/icons/add.svg" alt="" />
              <Typography>Create A Game</Typography>
            </Button>
          </Grid>
          <Grid item sx={{ display: { xs: "none", md: "initial" } }} md={2}>
            <Typography>OR</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Button disabled style={{ width: "80%" }} href="/join-server">
              <img src="assets/icons/glob.svg" alt="" />
              <Typography>Join A Game</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={5} mt={3}>
            <Button style={{ width: "80%" }} href="/join-server">
              <img src="assets/icons/tv.svg" alt="" />
              <Typography>Play with PC</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" mt={6}>
          <Grid item xs={6}>
            <Link style={style} to="/create-user">
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
            <a
              style={style}
              href="https://www.ultraboardgames.com/uno/game-rules.php"
              target="_blank"
              rel="noreferrer"
            >
              Game Rules
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainMenu;
