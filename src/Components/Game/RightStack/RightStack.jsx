import styled from "styled-components";
import { useGameStore } from "../../../stores/gameStore";
import CardsColumn from "../CardsColumn/CardsColumn";

const Root = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export default function RightStack() {
  const { player, currentPlayer } = useGameStore((state) => ({
    player: state.players[3],
    currentPlayer: state.currentPlayer,
  }));
  const cards = player?.cards || [];
  return (
    <Root>
      <CardsColumn cards={cards} highlight={currentPlayer === 3} />
    </Root>
  );
}
