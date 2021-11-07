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
  const player = useGameStore((state) => state.players[0]);
  const cards = player?.cards || [];
  console.log(cards);

  return (
    <Root>
      <CardsRow cards={cards} cardProps={{ selectable: true }} />
    </Root>
  );
}
