import { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../../utils/loader";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  h2 {
    text-align: center;
    margin-bottom: 36px;
    font-size: 10vmin;
  }

  p {
    font-size: 5vmin;
    text-shadow: 0 0 10px white;
    animation: animateText 2s infinite ease-in-out;
  }

  @keyframes animateText {
    50% {
      text-shadow: 0 0 15px white;
      transform: scale(1.05);
    }
  }
`;

export default function Loading({ onLoaded }) {
  const [percentage, setPercentage] = useState(3);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    Loader.load();
    Loader.addEventListener("progress", (value) => {
      setPercentage(Math.round(100 * value));
    });

    Loader.addEventListener("completed", () => {
      setCompleted(true);
    });
  }, []);

  const onClick = () => {
    if (completed) {
      onLoaded();
    }
  };

  return (
    <Root onClick={onClick}>
      {completed ? (
        <>
          <h2>Ready!!</h2>
          <p>Click Anywhere to Start</p>
        </>
      ) : (
        <>
          <h2>Loading Game Assets...</h2>
          <p>{percentage}%</p>
        </>
      )}
    </Root>
  );
}
