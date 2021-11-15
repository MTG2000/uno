import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "../Shared/Paper/Paper";
import Switch from "../Shared/Switch/Switch";
import Stack from "@mui/material/Stack";
import Table from "../Shared/Table/Table";
import Button from "../Shared/Button/Button";
import TextField from "../Shared/TextField/TextField";
import Typography from "../Shared/Typography/Typography";
import { Link } from "react-router-dom";
import styled from "styled-components";
const CTableRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  border-radius: 2rem;
  height: 45px;
`;
const CTableCell = styled.p`
  height: 30px;
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const data = [
  {
    serverName: "hamza",
    playerJoned: 2,
    isPrivate: "yes",
  },
  {
    serverName: " mohammad",
    playerJoned: 3,
    isPrivate: "no",
  },
  {
    serverName: "yamahn ",
    playerJoned: 1,
    isPrivate: "yes",
  },
  {
    serverName: "nour ",
    playerJoned: 3,
    isPrivate: "yes",
  },
  {
    serverName: "mahmod ",
    playerJoned: 2,
    isPrivate: "no",
  },
];
const JoinServer = () => {
  const [showPrivate, setShowPrivate] = React.useState(true);
  const [selectedServer, setSelectedServer] = React.useState(null);

  const [password, setPassword] = React.useState(null); //for show button
  const [selectOne, setSelectOne] = React.useState(false); //for show button

  const [isPravite, setIsPravite] = React.useState(false);
  const [server, setServer] = React.useState(data);
  const fetchServers = async () => {
    //async code
  };
  const postPlayerJioned = async () => {
    //async code
  };
  React.useEffect(() => {
    fetchServers();
  }, []);
  const handleJoinServer = () => {
    postPlayerJioned();
  };
  React.useEffect(() => {
    if (!showPrivate)
      setServer(server.filter((iserver) => iserver.isPrivate === "no"));
    else setServer(data);
  }, [showPrivate, server]);
  return (
    <Paper>
      <Grid container justifyContent="center" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <p
              style={{
                color: `${showPrivate ? " white" : "gray"}`,
                textShadow: `${showPrivate ? "0 0 3px white" : ""}`,
              }}
            >
              Show Private Server
            </p>
            <Switch
              onChange={() => {
                setShowPrivate(!showPrivate);
                setSelectedServer(null);
                setSelectOne(false);
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Table>
            {server.map((iserver, index) => {
              return (
                <CTableRow
                  key={index}
                  onClick={() => {
                    setSelectedServer(index);
                    setSelectOne(true);
                    setPassword("");
                    if (iserver.isPrivate === "yes") setIsPravite(true);
                    else setIsPravite(false);
                  }}
                  style={
                    index === selectedServer && iserver.isPrivate === "yes"
                      ? {
                          backgroundColor: "rgba(0,0,0,.5)",
                          border: " 1px solid #fb0303",
                          borderWidth: "0 0 3px 2px",
                          borderRadius: "1rem",
                          boxShadow: "inset 1px 0 5px 1px black",
                        }
                      : index === selectedServer
                      ? {
                          backgroundColor: "rgba(0,0,0,.5)",
                          borderRadius: "1rem",
                        }
                      : {}
                  }
                >
                  {index === selectedServer && iserver.isPrivate === "yes" ? (
                    <>
                      <CTableCell>{iserver.serverName}</CTableCell>
                      <TextField
                        type="password"
                        placeholder="Enter the server password"
                        style={{
                          height: "100%",
                          border: "none",
                          background: "none",
                          boxShadow: "none",
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <CTableCell>{iserver.serverName}</CTableCell>
                      <CTableCell>{iserver.playerJoned}/4</CTableCell>
                      <CTableCell>{iserver.isPrivate}</CTableCell>
                    </>
                  )}
                </CTableRow>
              );
            })}
          </Table>
        </Grid>
        <Grid item sx={12}>
          {((selectOne && isPravite && password) ||
            (selectOne && !isPravite)) && (
            <Button onClick={handleJoinServer}>
              <Link to="/waiting-lobby">
                <Typography>Join Game</Typography>
              </Link>
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JoinServer;
