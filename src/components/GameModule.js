import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({ playerCar, playerHome, bossCar, bossHome, office, layout, resetPlayers }) => {
  

  return (
    <div className="gameModule">
      <h3>Game Module</h3>
      <PlayingField
        playerCar={playerCar}
        playerHome={playerHome}
        bossCar={bossCar}
        bossHome={bossHome}
        office={office}
        layout={layout}
        resetPlayers={resetPlayers}
      />
    </div>
  );
};

export default GameModule;
