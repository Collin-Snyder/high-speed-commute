import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({ playerCar, movePlayerCar, layout }) => {
  

  return (
    <div className="gameModule">
      <h3>Game Module</h3>
      <PlayingField
        playerCar={playerCar}
        movePlayerCar={movePlayerCar}
        layout={layout}
      />
    </div>
  );
};

export default GameModule;
