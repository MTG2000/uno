import styled from "styled-components";
import { useGameStore } from "../../../stores/gameStore";
import CardsColumn from "../CardsColumn/CardsColumn";

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export default function LeftStack() {
  const player = useGameStore((state) => state.players[1]);
  const cards = player?.cards || [];
  return (
    <Root>
      <CardsColumn cards={cards} />
    </Root>
  );
}
