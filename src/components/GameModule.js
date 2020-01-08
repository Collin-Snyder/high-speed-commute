import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({ playerCar, bossCar, office, layout, resetPlayers }) => {
  

  return (
    <div className="gameModule">
      <h3>Game Module</h3>
      <PlayingField
        playerCar={playerCar}
        bossCar={bossCar}
        office={office}
        layout={layout}
        resetPlayers={resetPlayers}
      />
    </div>
  );
};

export default GameModule;
