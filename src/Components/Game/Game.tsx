import { AnimateSharedLayout } from "framer-motion";
import TableStack from "./TableStack/TableStack.jsx";
import PlayerStack from "./PlayerStack/PlayerStack.jsx";
import { useGameStore } from "../../stores/gameStore";
import { useEffect } from "react";
import LeftStack from "./LeftStack/LeftStack.jsx";
import RightStack from "./RightStack/RightStack.jsx";
import TopStack from "./TopStack/TopStack.jsx";
import data from "../../api/data.json";
import { shuffle } from "../../utils/helpers.js";

export default function Game() {
  const { init, setPlayerId, move } = useGameStore();

  useEffect(() => {
    setPlayerId(data.playerId);
    data.cards = shuffle(data.cards);

    init(data.players as any, data.cards.slice(0, 7) as any);

    document.addEventListener("keydown", (e) => {
      if (e.key === "q") {
        const cardToPlay = move({ color: "red", digit: 7, layoutId: "" });
      }
    });
  }, [init]);

  return (
    <div>
      <AnimateSharedLayout>
        <TableStack />
        <TopStack />
        <LeftStack />
        <RightStack />
        <PlayerStack />
      </AnimateSharedLayout>
    </div>
  );
}
