import styled from "styled-components";
import Card from "../../Shared/Card/Card";
import { useGameStore } from "../../../stores/gameStore";
import BotsServer from "../../../BotsServer/BotsServer";
import FrontCards from "./FrontCards";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Root = styled.div`
  --cardWidth: var(--cardWidthBigger);

  position: fixed;
  /* bottom: calc(-1 * var(--cardWidth) / 2);
  left: 40px; */
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);

  width: var(--cardWidth);
  height: calc(var(--cardWidth) * 1.41);
  z-index: 10;

  cursor: ${(props) => (props.canHover ? "pointer" : "initial")};
  filter: ${(props) =>
    !props.highlight ? "contrast(.5)" : "drop-shadow(0 0 10px white)"};

  .card-container {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default function DrawingStack() {
  const { drawingStack, currentPlayer, startGame } = useGameStore((state) => ({
    drawingStack: state.drawingStack,
    currentPlayer: state.currentPlayer,
    startGame: state.ready,
  }));
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = () => {
    if (currentPlayer === 0) BotsServer.move(true);
  };

  useEffect(() => {
    setTimeout(() => {
      startGame();
    }, 2000);
  }, []);

  const canHover = gameStarted && currentPlayer === 0;
  const highlight = canHover || !gameStarted;

  return (
    <Root
      as={motion.div}
      onClick={handleClick}
      canHover={canHover}
      highlight={highlight}
      initial={false}
      whileHover={
        canHover
          ? { scale: 1.05, x: 30, y: -30, transition: { duration: 0.3 } }
          : false
      }
    >
      {drawingStack.map((card) => (
        <div className="card-container" key={card.layoutId}>
          <Card
            layoutId={card.layoutId}
            color={card.color}
            digit={card.digit}
            action={card.action}
            width={200}
            disableShadow={true}
          />
        </div>
      ))}
      <FrontCards />
    </Root>
  );
}
