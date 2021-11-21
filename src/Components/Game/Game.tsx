import { AnimateSharedLayout } from "framer-motion";
import TableStack from "./TableStack/TableStack.jsx";
import PlayerStack from "./PlayerStack/PlayerStack.jsx";
import { useEffect, useState } from "react";
import LeftStack from "./LeftStack/LeftStack.jsx";
import RightStack from "./RightStack/RightStack.jsx";
import TopStack from "./TopStack/TopStack.jsx";
import DrawingStack from "./DrawingStack/DrawingStack.jsx";
import { useDispatch } from "../../utils/hooks";
import {
  moveCard,
  movePlayer,
} from "../../stores/features/gameSlice";
import Scoreboard from "./Scoreboard/Scoreboard.jsx";
import { Player } from "../../utils/interfaces.js";
import API from "../../api/API";

export default function Game() {
  const dispatch = useDispatch();
  const [finished, setFinished] = useState(false)
  const [playersOrder, setPlayersOrder] = useState<Player[]>([])

  useEffect(() => {

    setTimeout(() => {
      API.emitReady()
    }, 2000)
    API.onMove(({ card, draw, cardsToDraw, nxtPlayer }) => {

      dispatch(
        moveCard({
          nextPlayer: nxtPlayer,
          card,
          draw,
          cardsToDraw,
        })
      );
      setTimeout(() => dispatch(movePlayer()), 500);
    })

    API.onFinishGame((players: Player[]) => {
      setFinished(true);
      setPlayersOrder(players);
    })

    return () => {
      API.leaveServer();
    }
  }, []);

  return (
    <div>
      <AnimateSharedLayout>
        <TableStack />
        <TopStack />
        <LeftStack />
        <RightStack />
        <PlayerStack />
        <DrawingStack />
      </AnimateSharedLayout>

      {finished && <Scoreboard players={playersOrder} />}
    </div>
  );
}
