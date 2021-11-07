import styled from "styled-components";
import { useGameStore } from "../../../stores/gameStore";
import CardsRow from "../CardsRow/CardsRow";

const Root = styled.div`
  position: fixed;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  --cardWidth: var(--cardWidthBigger);
`;

export default function PlayerStack() {
  const { player, currentPlayer } = useGameStore((state) => ({
    player: state.players[0],
    currentPlayer: state.currentPlayer,
  }));
  const cards = player?.cards || [];

  return (
    <Root>
      <CardsRow
        cards={cards}
        highlight={currentPlayer === 0}
        cardProps={{ selectable: true }}
      />
    </Root>
  );
}
