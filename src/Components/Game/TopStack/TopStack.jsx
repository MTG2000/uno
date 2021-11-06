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
  const player = useGameStore((state) => state.players[2]);
  const cards = player?.cards || [];
  return (
    <Root>
      <CardsRow cards={cards} startFlipped />
    </Root>
  );
}
