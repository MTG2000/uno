import { useState, useEffect } from "react";
import styled from "styled-components";
import GameAudio from "../../../utils/audio";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;

    font-size: 10vmin;
  }

  p {
    font-size: 6vmin;
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

export default function Loading() {
  const [percentage, setPercentage] = useState(7);

  useEffect(() => {
    GameAudio.addEventListener("progress", (value) => {
      setPercentage(Math.round(100 * value));
    });
  }, []);

  return (
    <Root>
      <h2>Loading Game Assests...</h2>
      <p>{percentage}%</p>
    </Root>
  );
}
