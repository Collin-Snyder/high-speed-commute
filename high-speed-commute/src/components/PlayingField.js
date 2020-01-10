import React from "react";
import GridSquare from "./GridSquare";

const PlayingField = ({
  mode,
  playerCar,
  playerHome,
  bossCar,
  bossHome,
  office,
  layout,
  resetPlayers
}) => {
  if (playerCar === office) {
    return (
      <div className="playingField win">
        <h1 className="gameOverTitle">Whew! You're not late.<br></br>You got a promotion!</h1>
        <button className="btn startOver" onClick={resetPlayers}>Ready for tomorrow?</button>
      </div>
    );
  } else if (bossCar === office) {
    return (
      <div className="playingField loss">
        <h1 className="gameOverTitle">Yikes! You got fired.</h1>
        <button className="btn startOver"onClick={resetPlayers}>Try again next job?</button>
      </div>
    );
  } else {
    return (
      <div className="playingField">
        {layout.map((square, index) => (
          <GridSquare
            squareInfo={square}
            playerCar={playerCar}
            playerHome={playerHome}
            bossCar={bossCar}
            bossHome={bossHome}
            office={office}
            key={index}
          />
        ))}
      </div>
    );
  }
};

export default PlayingField;
