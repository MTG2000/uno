import styled from "styled-components";
import { useSelector } from "../../../utils/hooks";
import CardsRow from "../CardsRow/CardsRow";

const Root = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`;

export default function TopStack() {
  const { player, currentPlayer } = useSelector((state) => ({
    player: state.game.players[2],
    currentPlayer: state.game.currentPlayer,
  }));
  const cards = player?.cards || [];
  return (
    <Root>
      <CardsRow cards={cards} highlight={currentPlayer === 2} />
    </Root>
  );
}
