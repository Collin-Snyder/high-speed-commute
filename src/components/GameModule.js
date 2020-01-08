import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({
  mode,
  playerCar,
  playerHome,
  bossCar,
  bossHome,
  office,
  layout,
  designLayout,
  resetPlayers,
  enterDesignMode,
  enterPlayMode
}) => {
  return (
    <div className="gameModule">
      <h3>Game Module</h3>
      <PlayingField
        mode={mode}
        playerCar={playerCar}
        playerHome={playerHome}
        bossCar={bossCar}
        bossHome={bossHome}
        office={office}
        layout={layout}
        designLayout={designLayout}
        resetPlayers={resetPlayers}
      />
      {mode === "play" ? (
        <button onClick={enterDesignMode}>Switch to Design Mode</button>
      ) : (
        <button onClick={enterPlayMode}>Switch to Play Mode</button>
      )}
    </div>
  );
};

export default GameModule;
