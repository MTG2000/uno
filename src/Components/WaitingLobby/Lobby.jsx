import React, { useEffect } from "react";
import Paper from "../Shared/Paper/Paper";
import Avatar from "../Shared/Avatar/Avatar";
import Typography from "../Shared/Typography/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Loding from "./Loding";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../utils/hooks";
import { init, setInLobby } from "../../stores/features/gameSlice";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import API from "../../api/API";

const Span = styled.span`
  color: #f37006;
  text-shadow: 0 0 4px #f37006;
  font-weight: bold;
  font-size: larger;
`;

const Lobby = () => {
  const [players, setPlayers] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const inLobby = useSelector((state) => state.game.inLobby);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!inLobby) return;

    let timeout = null;
    let unsubInit = null;
    (async () => {
      const serverPlayers = await API.getServerPlayers();
      setPlayers(serverPlayers);
      API.onPlayersUpdated((players) => setPlayers(players));
      unsubInit = API.onGameInit(({ players, cards }) => {
        dispatch(init({ cards, players }));
        setReady(true);
        timeout = setTimeout(() => navigate("/game"), 2000);
      });
    })();

    return () => {
      if (timeout) clearTimeout(timeout);
      if (unsubInit) unsubInit();
      dispatch(setInLobby(false));
    };
  }, [dispatch, navigate]);

  if (location.pathname === "/waiting-lobby" && !inLobby)
    return <Navigate replace to="/main-menu" />;

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
        <Grid
          item
          container
          flexWrap="nowrap"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          gap={6}
          xs={12}
        >
          {players.map((player) => {
            return (
              <Stack
                key={player.id}
                justifyContent="center"
                alignItems="center"
                spacing={1}
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
