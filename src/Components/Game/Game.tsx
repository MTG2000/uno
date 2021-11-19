import { AnimateSharedLayout } from "framer-motion";
import TableStack from "./TableStack/TableStack.jsx";
import PlayerStack from "./PlayerStack/PlayerStack.jsx";
import { useEffect, useState } from "react";
import LeftStack from "./LeftStack/LeftStack.jsx";
import RightStack from "./RightStack/RightStack.jsx";
import TopStack from "./TopStack/TopStack.jsx";
import data from "../../api/data.json";
import BotsServer, {
  IMoveEvent,
  IStartEvent,
} from "../../BotsServer/BotsServer";
import DrawingStack from "./DrawingStack/DrawingStack.jsx";
import { Player } from "../../utils/interfaces.js";
import { useDispatch } from "../../utils/hooks";
import {
  init,
  moveCard,
  movePlayer,
  setPlayerId,
} from "../../stores/features/gameSlice";
import { onMove } from "../../api/api.js";

export default function Game() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // BotsServer.init();
    // for (let i = 0; i < 3; i++) {
    //   BotsServer.joinPlayer(data.players[i] as Player, true);
    // }

    // BotsServer.addEventListener("start", ({ cards, players }: IStartEvent) => {
    //   dispatch(init({ cards: [...cards], players: [...players] }));
    //   setReady(true);
    // });

    // BotsServer.addEventListener(
    //   "move",
    //   ({ card, draw, cardsToDraw, nxtPlayer }: IMoveEvent) => {
    //     // console.log("MOVE EVENT: ", card, draw, nxtPlayer);
    //     dispatch(
    //       moveCard({
    //         nextPlayer: nxtPlayer,
    //         card,
    //         draw,
    //         cardsToDraw,
    //       })
    //     );
    //     setTimeout(() => dispatch(movePlayer()), 500);
    //   }
    // );
    // dispatch(setPlayerId(BotsServer.joinPlayer(data.players[3] as Player)));

    onMove(({ card, draw, cardsToDraw, nxtPlayer }: IMoveEvent) => {
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
  }, []);

  return (
    <div>
      <AnimateSharedLayout>
        {ready && (
          <>
            <TableStack />
            <TopStack />
            <LeftStack />
            <RightStack />
            <PlayerStack />
            <DrawingStack />
          </>
        )}
      </AnimateSharedLayout>
    </div>
  );
}
