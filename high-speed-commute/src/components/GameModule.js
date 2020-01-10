import React from "react";
import PlayingField from "./PlayingField";
import LevelsList from "./LevelsList";

const GameModule = ({
  mode,
  status,
  playerCar,
  playerHome,
  bossCar,
  bossHome,
  office,
  layout,
  userLevels,
  collision,
  designLayout,
  startBoss,
  resetPlayers,
  fullReset,
  enterDesignMode,
  enterPlayMode,
  loadLevel
}) => {
  let display = mode === "play" ? "flex" : "none";
  let startDisplay = status === "idle" ? "inline-block" : "none";

  return (
    <div className="gameModule" style={{ display }}>
      <div className="levelsListContainer">
        <h3>Your Levels</h3>
        <LevelsList loadLevel={loadLevel} userLevels={userLevels} />
      </div>

      <PlayingField
        mode={mode}
        playerCar={playerCar}
        playerHome={playerHome}
        bossCar={bossCar}
        bossHome={bossHome}
        office={office}
        layout={layout}
        designLayout={designLayout}
        collision={collision}
        resetPlayers={resetPlayers}
        fullReset={fullReset}
      />

      <div className="buttons">
        <button
          className="btn play"
          onClick={startBoss}
          style={{ display: startDisplay }}
        >
          Play
        </button>
        <button
          className="btn mode"
          onClick={enterDesignMode}
          style={{ display: startDisplay }}
        >
          Design Mode
        </button>
      </div>
    </div>
  );
};

export default GameModule;
