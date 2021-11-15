import React from "react";
import Paper from "../Shared/Paper/Paper";
import Avatar from "../Shared/Avatar/Avatar";
import Typography from "../Shared/Typography/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Loding from "./Loding";
import styled from "styled-components";
import {} from "react-router-dom";
const Span = styled.span`
    color: #f37006;
    text-shadow: 0 0 4px #f37006;
    font-weight: bold;
    font-size: larger;
}
`;

const Lobby = () => {
  const data = [
    { id: 1, imgSrc: "./imges/avatar.png", playerName: "hamza" },
    { id: 2, imgSrc: "./imges/avatar.png", playerName: "mohammad" },
    { id: 3, imgSrc: "./imges/avatar.png", playerName: "nour" },
  ];
  const [players, setPlayers] = React.useState(data);
  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <Typography>
            Waiting for Other Players To Jion
            <Loding />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Joined ( <Span>3</Span>/4 )
          </Typography>
        </Grid>
        <Grid item container alignItems="center" spacing={1} xs={12}>
          {players.map((player) => {
            return (
              <Grid key={player.id} item xs={4} md={3}>
                <Stack justifyContent="center" alignItems="center" spacing={1}>
                  <Avatar src={player.imgSrc} />
                  <Typography>{player.playerName}</Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Lobby;
