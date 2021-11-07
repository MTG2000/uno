import styled from "styled-components";
import Card from "../../Shared/Card/Card";
import { useGameStore } from "../../../stores/gameStore";
import BotsServer from "../../../BotsServer/BotsServer";

const Root = styled.div`
  --cardWidth: var(--cardWidthBigger);

  position: fixed;
  bottom: -50px;
  left: -20px;

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
    <Root onClick={handleClick}>
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <div className="card-container" key={idx}>
            <Card />
          </div>
        ))}
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
    </Root>
  );
}
