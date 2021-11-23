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
import { useState } from "react";
import StartPage from "./Components/StartPage/StartPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Loading from "./Components/Shared/Loading/Loading";
import GameAudio from "./utils/audio";
import ErrorBoundary from "./Components/Shared/ErrorBoundary/ErrorBoundary";

const Root = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  /* background: radial-gradient(#5065da, #20295a); */
  background: radial-gradient(#3d50ba, #161d3f);
`;

// screen.lockOrientation("landscape");

function App() {
  const [loadingAssets, setLoadingAssets] = useState(true);

  const location = useLocation();

  const onLoaded = () => {
    GameAudio.playMusic("music");
    setLoadingAssets(false);
  };

  if (loadingAssets) return <Loading onLoaded={onLoaded} />;

  return (
    <Root>
      <Provider store={store}>
        <AnimatePresence exitBeforeEnter>
          <ErrorBoundary>
            <Routes location={location} key={location.key}>
              <Route
                key={"/create-user"}
                path="/create-user"
                element={<CreateUser />}
              />
              <Route
                key={"/main-menu"}
                path="/main-menu"
                element={<MainMenu />}
              />
              <Route
                key={"/create-server"}
                path="/create-server"
                element={<CreateServer />}
              />
              <Route
                key={"/join-server"}
                path="/join-server"
                element={<JoinServer />}
              />
              <Route key={"/game"} path="/game" element={<Game />} />
              <Route
                key={"/waiting-lobby"}
                path="/waiting-lobby"
                element={<Lobby />}
              />
              <Route key={"/"} path="/" element={<StartPage />} />
            </Routes>
          </ErrorBoundary>
        </AnimatePresence>
      </Provider>
    </Root>
  );
}

export default App;
