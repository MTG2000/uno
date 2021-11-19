import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Game from "./Components/Game/Game";
import CreateUser from "./Components/CreateUser/CreateUser";
import MainMenu from "./Components/MainMenu/MainMenu";
import CreateServer from "./Components/CreateServer/CreateServer";
import JoinServer from "./Components/JoinServer/JoinServer";
import Lobby from "./Components/WaitingLobby/Lobby";

import { Provider } from "react-redux";
import { store } from "./stores/store";
import { useEffect } from "react";

const Root = styled.div`
  min-height: 100vh;

  background: radial-gradient(#2006f3, #00ffe7);
`;

// screen.lockOrientation("landscape");

function App() {
  useEffect(() => {}, []);

  return (
    <Root>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/create-server" element={<CreateServer />} />
          <Route path="/join-server" element={<JoinServer />} />
          <Route path="/game" element={<Game />} />
          <Route path="/waiting-lobby" element={<Lobby />} />
        </Routes>
      </Provider>
    </Root>
  );
}

export default App;
