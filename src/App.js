import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Game from "./Components/Game/Game";
const Root = styled.div`
  min-height: 100vh;
  background: linear-gradient(152deg, #045850, #036a60 40%, #027059);
`;

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/game" element={<Game />} />
      </Routes>
    </Root>
  );
}

export default App;
