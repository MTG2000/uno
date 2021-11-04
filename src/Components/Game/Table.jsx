import styled from "styled-components";
import Card from "../Shared/Card/Card";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    perspective: 3000px;
    width: 200px;
  }
`;

export default function Table() {
  return (
    <Root>
      <div className="card">
        <Card color="blue" />
      </div>
    </Root>
  );
}
