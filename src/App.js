import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Game from "./Components/Game/Game";
import { Provider } from "react-redux";
import { store } from "./stores/store";
const Root = styled.div`
  min-height: 100vh;
  background: radial-gradient(#027059, #045850);
`;

// screen.lockOrientation("landscape");

function App() {
  return (
    <Root>
      <Provider store={store}>
        <Routes>
          <Route path="/game" element={<Game />} />
        </Routes>
      </Provider>
    </Root>
  );
}

export default App;
