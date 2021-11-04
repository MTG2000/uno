import styled from "styled-components";
import Card from "../Shared/Card/Card";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Table() {
  return (
    <Root>
      <Card></Card>
    </Root>
  );
}
