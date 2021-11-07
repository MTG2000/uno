import styled from "styled-components";
import { useGameStore } from "../../../stores/gameStore";
import CardsRow from "../CardsRow/CardsRow";

const Root = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`;

export default function TopStack() {
  const { player, currentPlayer } = useGameStore((state) => ({
    player: state.players[2],
    currentPlayer: state.currentPlayer,
  }));
  const cards = player?.cards || [];
  return (
    <Root>
      <CardsRow cards={cards} highlight={currentPlayer === 2} />
    </Root>
  );
}
