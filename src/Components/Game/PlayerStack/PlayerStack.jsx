import styled from "styled-components";
import Card from "../../Shared/Card/Card";
import { useGameStore } from "../../../stores/gameStore";

const Root = styled.div`
  position: fixed;
  bottom: 35%;

  .card-container {
    perspective: 800px;
    width: 200px;
  }
`;

export default function PlayerStack() {
  const pressed = useGameStore((state) => state.pressed);

  return (
    <Root>
      <div className="card-container">
        {!pressed && <Card layoutId="idd" color="blue" rotationY={180} />}
      </div>
    </Root>
  );
}
