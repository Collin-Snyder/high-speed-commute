import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({ playerCar }) => {
  return (
    <div className="gameModule">
      <h3>Game Module</h3>
      <PlayingField playerCar={playerCar} />
    </div>
  );
};

export default GameModule;
