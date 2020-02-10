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
  loadLevel,
  deleteLevel
}) => {
  let display = mode === "play" ? "flex" : "none";
  let startDisplay = status === "idle" ? "inline-flex" : "none";

  return (
    <div className="gameModule" style={{ display }}>
      <div className="levelsListContainer">
        <h3>Your Levels</h3>
        <LevelsList loadLevel={loadLevel} userLevels={userLevels} deleteLevel={deleteLevel} />
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
        <div
          className="btn play"
          onClick={startBoss}
          style={{ display: startDisplay }}
        >
          Start
        </div>
        <div
          className="btn mode"
          onClick={enterDesignMode}
          style={{ display: startDisplay }}
        >
          Design Mode
        </div>
      </div>
    </div>
  );
};

export default GameModule;
