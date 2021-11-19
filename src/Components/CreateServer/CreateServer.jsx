import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "../Shared/Paper/Paper";
import Button from "../Shared/Button/Button";
import TextField from "../Shared/TextField/TextField";
import Switch from "../Shared/Switch/Switch";
import { useNavigate } from "react-router-dom";
import { createServer, joinServer } from "../../api/api";

import Typography from "../Shared/Typography/Typography";

const CreateServer = () => {
  const [serverName, setServerName] = React.useState("");
  const [serverPassword, setServerPassword] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(true);
  const navigate = useNavigate();

  const handleCreateServer = async () => {
    const serverId = await createServer(serverName, serverPassword);
    await joinServer(serverId, serverPassword);
    navigate("/waiting-lobby");
  };
  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} md={10}>
          <Stack justifyContent="center" spacing={1} alignItems="center">
            <Typography>Choose A Server Name</Typography>

            <TextField
              label="server-name"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={10} sm={8} md={6} lg={5} marginTop={2}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="32px"
          >
            <p
              style={{
                color: `${isPrivate ? "white" : "gray"}`,
                textShadow: `${isPrivate ? "0 0 3px white" : ""}`,
              }}
            >
              Private
            </p>
            <Switch
              onChange={() => {
                setIsPrivate(!isPrivate);
                setServerPassword("");
              }}
            />
            <p
              style={{
                color: `${!isPrivate ? "white" : "gray"}`,
                textShadow: `${!isPrivate ? "0 0 3px white" : ""}`,
              }}
            >
              Public
            </p>
          </Stack>
        </Grid>
        {isPrivate && (
          <Grid item xs={12} md={10} marginTop={2}>
            <Stack justifyContent="center" spacing={1} alignItems="center">
              <Typography>Server Password</Typography>

              <TextField
                type="password"
                label="server-password"
                value={serverPassword}
                onChange={(e) => setServerPassword(e.target.value)}
              />
            </Stack>
          </Grid>
        )}

        <Grid item xs={12} md={10} lg={8}>
          {((isPrivate && serverName && serverPassword) ||
            (!isPrivate && serverName)) && (
            <Button onClick={handleCreateServer}>Creat Server</Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateServer;
