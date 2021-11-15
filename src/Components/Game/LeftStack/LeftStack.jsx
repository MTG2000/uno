import styled from "styled-components";
import { useSelector } from "../../../utils/hooks";
import CardsColumn from "../CardsColumn/CardsColumn";

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export default function LeftStack() {
  const { player, currentPlayer } = useSelector((state) => ({
    player: state.game.players[1],
    currentPlayer: state.game.currentPlayer,
  }));
  const cards = player?.cards || [];
  return (
    <Root>
      <CardsColumn cards={cards} highlight={currentPlayer === 1} />
    </Root>
  );
}
