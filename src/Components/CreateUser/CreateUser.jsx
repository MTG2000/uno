import React from "react";
import { Link } from "react-router-dom";
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
      return localStorage.getItem("playerImg");
    else return "";
  };
  const [playerName, setPlayerName] = React.useState("");
  const [playerImg, setPlayerImg] = React.useState("");
  React.useEffect(() => {
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerImg", playerImg);
  }, [playerName, playerImg]);

  return (
    <Paper>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={10}>
          <Typography>Enter Your Name</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            type="text"
            placeholder="your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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
            <Avatar playerImg={playerImg} />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => {
                let random = Math.floor(Math.random() * 20);
                setPlayerImg(
                  `https://avatars.dicebear.com/api/male/${playerName}${random}.svg`
                );
              }}
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
          {playerName && playerImg && (
            <Button>
              <Link to="/main-menu">
                <Typography> let's play</Typography>
              </Link>
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateUser;
