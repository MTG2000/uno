import { AnimateSharedLayout } from "framer-motion";
import TableStack from "./TableStack/TableStack.jsx";
import PlayerStack from "./PlayerStack/PlayerStack.jsx";

export default function Game() {
  return (
    <div>
      <AnimateSharedLayout>
        <TableStack />
        <PlayerStack />
      </AnimateSharedLayout>
    </div>
  );
}
