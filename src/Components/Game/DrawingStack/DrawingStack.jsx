import styled from "styled-components";
import Card from "../../Shared/Card/Card";
import { useGameStore } from "../../../stores/gameStore";
import BotsServer from "../../../BotsServer/BotsServer";
import { useCallback, useMemo } from "react";
import FrontCards from "./FrontCards";

const Root = styled.div`
  --cardWidth: var(--cardWidthBigger);

  position: fixed;
  bottom: -50px;
  left: 40px;
  width: var(--cardWidth);
  height: calc(var(--cardWidth) * 1.41);
  z-index: 10;

  cursor: ${(props) => (props.playable ? "pointer" : "initial")};
  filter: ${(props) => (!props.playable ? "contrast(.5)" : "none")};

  .card-container {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default function DrawingStack() {
  const { drawingStack, currentPlayer } = useGameStore((state) => ({
    drawingStack: state.drawingStack,
    currentPlayer: state.currentPlayer,
  }));

  const handleClick = () => {
    if (currentPlayer === 0) BotsServer.move(true);
  };

  return (
    <Root onClick={handleClick} playable={currentPlayer === 0}>
      {drawingStack.map((card) => (
        <div className="card-container" key={card.layoutId}>
          <Card
            layoutId={card.layoutId}
            color={card.color}
            digit={card.digit}
            action={card.action}
            width={200}
          />
        </div>
      ))}
      <FrontCards />
    </Root>
  );
}
