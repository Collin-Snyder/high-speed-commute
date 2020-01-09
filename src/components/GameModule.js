import React from "react";
import PlayingField from "./PlayingField";

const GameModule = ({
  mode,
  status,
  playerCar,
  playerHome,
  bossCar,
  bossHome,
  office,
  layout,
  designLayout,
  startBoss,
  resetPlayers,
  enterDesignMode,
  enterPlayMode
}) => {
  let display = mode === "play" ? "flex" : "none";
  let startDisplay = status === "idle" ? "inline-block" : "none";

  return (
    <div className="gameModule" style={{ display }}>
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
        <div className="buttons">
          <button onClick={startBoss} style={{ display: startDisplay }}>
            Start
          </button>
          <button onClick={enterDesignMode}>Switch to Design Mode</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={enterPlayMode}>Switch to Play Mode</button>
        </div>
      )}
    </div>
  );
};

export default GameModule;
