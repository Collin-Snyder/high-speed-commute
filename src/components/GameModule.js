import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({ playerCar, bossCar, office, layout }) => {
  

  return (
    <div className="gameModule">
      <h3>Game Module</h3>
      <PlayingField
        playerCar={playerCar}
        bossCar={bossCar}
        office={office}
        layout={layout}
      />
    </div>
  );
};

export default GameModule;
