import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "../Shared/Paper/Paper";
import Button from "../Shared/Button/Button";
import TextField from "../Shared/TextField/TextField";
import Switch from "../Shared/Switch/Switch";
import { Link } from "react-router-dom";

import Typography from "../Shared/Typography/Typography";
const style = {
  color: "white",
  textDecoration: "none",
};

const CreateServer = () => {
  const [serverName, setServerName] = React.useState("");
  const [serverPassword, setServerPassword] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(true);
  const postServerData = async () => {
    //async code
  };
  const handleCreateServer = () => {
    postServerData();
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
        <Grid item xs={10} sm={8} md={6} lg={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p
              style={{
                color: `${isPrivate ? "white" : "gray"}`,
                textShadow: `${isPrivate ? "0 0 3px white" : ""}`,
              }}
            >
              private
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
          <Grid item xs={12} md={10}>
            <Stack justifyContent="center" spacing={1} alignItems="center">
              <Typography>server Password</Typography>

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
            <Button onClick={handleCreateServer}>
              <Link style={style} to="/waiting-lobby">
                Creat Server
              </Link>
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateServer;
