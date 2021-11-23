import React from "react";
import Paper from "../Shared/Paper/Paper";
import Grid from "@mui/material/Grid";
import TextField from "../Shared/TextField/TextField";
import Avatar from "../Shared/Avatar/Avatar";
import Button from "../Shared/Button/Button";
import Typography from "../Shared/Typography/Typography";
import ReChoiceIcon from "./ReChoiceIcon";

const CreateUser = () => {
  const getLocalStorageName = () => {
    if (localStorage.getItem("playerName"))
      return localStorage.getItem("playerName");
    else return "";
  };
  const getLocalStorageImg = () => {
    if (localStorage.getItem("playerImg"))
      return JSON.parse(localStorage.getItem("playerImg"));
    else return Math.random() * 100;
  };
  const [playerName, setPlayerName] = React.useState(getLocalStorageName);
  const [imgSeed, setImgSeed] = React.useState(getLocalStorageImg);

  React.useEffect(() => {
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerImg", imgSeed);
  }, [playerName, imgSeed]);

  return (
    <Paper>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={10}>
          <Typography>Enter Your Name</Typography>
        </Grid>
        <Grid item xs={10} md={6}>
          <TextField
            type="text"
            placeholder=""
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            pad
          />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={4}
          xs={10}
        >
          <Grid item sx={11}>
            <Avatar seed={`${playerName}${imgSeed}`} />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => setImgSeed((seed) => seed + 1)}
              style={{
                width: "4vw",
                height: "4vw",
                padding: "35%",
              }}
            >
              <ReChoiceIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          {playerName && imgSeed && (
            <Button href="/main-menu">
              <Typography> Save & Go </Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateUser;
