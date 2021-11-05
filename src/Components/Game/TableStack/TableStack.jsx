import styled from "styled-components";
import Card from "../../Shared/Card/Card";
import { useGameStore } from "../../../stores/gameStore";

const Root = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .card-container {
    perspective: 800px;
    width: 200px;
  }
`;

export default function TableStack() {
  const pressed = useGameStore((state) => state.pressed);

  return (
    <Root>
      <div className="card-container">
        {pressed && <Card layoutId="idd" color="blue" rotationY={0} flip />}
      </div>
    </Root>
  );
}
