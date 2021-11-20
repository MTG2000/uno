import styled from "styled-components";
import Avatar from "../../Shared/Avatar/Avatar";
import { Grid, Typography } from "@mui/material";
import Button from "../../Shared/Button/Button";
import { Link } from "react-router-dom";

const playersA = [
  {
    id: "1",
    name: "Mikasa",
    img: "234",
  },
  {
    id: "3",
    name: "Chara",
    img: "123",
  },
  {
    id: "4",
    name: "Buddy",
    img: "321",
  },
  {
    id: "2",
    name: "Hamza",
    img: "333",
  },
];

const Root = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--panel-bg);
  color: white;
  padding: 40px 70px;
  border-radius: 12px;
  font-size: 2rem;
  .row {
    &:first-of-type {
      color: yellow;

      animation: pulse 1s infinite;
    }

    display: flex;
    align-items: center;
    gap: 24px;

    .order {
      width: 50px;
      font-size: 1.5rem;
    }

    .img {
      width: 50px;
    }
  }

  @keyframes pulse {
    50% {
      transform: scale(1.05);
    }
  }
`;

export default function Scoreboard({ players }) {
  return (
    <Root>
      <Typography variant="h2" textAlign="center" mb={6}>
        Game Finished!!
      </Typography>
      {playersA.map((p, idx) => (
        <div className="row" key={idx}>
          <div className="order">{idx + 1}</div>
          <div className="img">
            <Avatar seed={`${p.name}${p.img}`} />{" "}
          </div>
          <div className="name">{p.name}</div>
        </div>
      ))}

      <Grid container justifyContent="center" mt={6}>
        <Link to="/join-server">
          <Button onClick={() => {}}>Play Again</Button>
        </Link>
      </Grid>
    </Root>
  );
}
