import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Game from "./Components/Game/Game";
const Root = styled.div`
  min-height: 100vh;
  background: radial-gradient(#027059, #045850);
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
