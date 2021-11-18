import React, { useEffect } from "react";
import Paper from "../Shared/Paper/Paper";
import Avatar from "../Shared/Avatar/Avatar";
import Typography from "../Shared/Typography/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Loding from "./Loding";
import styled from "styled-components";
import { getServerPlayers, onPlayersUpdated } from "../../api/api";

const Span = styled.span`
  color: #f37006;
  text-shadow: 0 0 4px #f37006;
  font-weight: bold;
  font-size: larger;
`;

const Lobby = () => {
  const [players, setPlayers] = React.useState([]);

  useEffect(() => {
    (async () => {
      const ps = await getServerPlayers();
      setPlayers(ps);
      onPlayersUpdated((players) => setPlayers(players));
    })();
  }, []);

  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <Typography>
            Waiting for Other Players To Join
            <Loding />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Joined ( <Span>{players.length}</Span>/4 )
          </Typography>
        </Grid>
        <Grid item container alignItems="center" spacing={0.5} xs={12}>
          {players.map((player) => {
            return (
              <Stack
                key={player.id}
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ marginInlineEnd: 12 }}
              >
                <Avatar seed={`${player.name}${player.img}`} />
                <Typography>{player.name}</Typography>
              </Stack>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Lobby;
