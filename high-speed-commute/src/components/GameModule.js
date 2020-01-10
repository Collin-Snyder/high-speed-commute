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
          <button className="btn play" onClick={startBoss} style={{ display: startDisplay }}>
            Play
          </button>
          <button className="btn mode" onClick={enterDesignMode}>Design Mode</button>
        </div>
      ) : (
        <div className="buttons">
          <button className="btn mode" onClick={enterPlayMode}>Play Mode</button>
        </div>
      )}
    </div>
  );
};

export default GameModule;
