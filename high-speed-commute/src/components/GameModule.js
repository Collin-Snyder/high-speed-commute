import React from "react";
import PlayingField from "./PlayingField";
import LevelsList from "./LevelsList";
import DifficultySelector from "./DifficultySelector";

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
  startPlayer,
  resetPlayers,
  fullReset,
  enterDesignMode,
  enterPlayMode,
  loadLevel,
  deleteLevel,
  difficulty,
  changeDifficulty,
  playerColor
}) => {
  let display = mode === "play" ? "flex" : "none";
  let startDisplay = status === "idle" ? "inline-flex" : "none";

  return (
    <div className="gameModule" style={{ display }}>
      <div className="levelsListContainer">
        <h3>Your Levels</h3>
        <LevelsList
          loadLevel={loadLevel}
          userLevels={userLevels}
          deleteLevel={deleteLevel}
        />
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
        playerColor={playerColor}
      />

      <div className="buttons">
      <div
          className="btn mode"
          onClick={enterDesignMode}
          style={{ display: startDisplay }}
        >
          Design
        </div>
        <div
          className="btn play"
          onClick={() => {
            startBoss();
            startPlayer();
          }}
          style={{ display: startDisplay }}
        >
          Race
        </div>
        <DifficultySelector difficulty={difficulty} changeDifficulty={changeDifficulty}/>
      </div>
    </div>
  );
};

export default GameModule;
