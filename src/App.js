import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Game from "./Components/Game/Game";
import CreateUser from "./Components/CreateUser/CreateUser";
import MainMenu from "./Components/MainMenu/MainMenu";
import CreateServer from "./Components/CreateServer/CreateServer";
import JoinServer from "./Components/JoinServer/JoinServer";
import Lobby from "./Components/WaitingLobby/Lobby";
const Root = styled.div`
  min-height: 100vh;

  background: linear-gradient(
152deg,#041258,#423976 40%,#60547c);
}
`;

// screen.lockOrientation("landscape");

function App() {
  useEffect(() => {}, []);

  return (
    <Root>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/create-server" element={<CreateServer />} />
        <Route path="/join-server" element={<JoinServer />} />
        <Route path="/game" element={<Game />} />
        <Route path="/waiting-lobby" element={<Lobby />} />
      </Routes>
    </Root>
  );
}

export default App;
