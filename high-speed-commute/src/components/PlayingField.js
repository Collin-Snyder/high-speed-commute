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
  collision,
  resetPlayers,
  fullReset
}) => {
  if (playerCar === office) {
    return (
      <div className="playingField win">
        <h1 className="gameOverTitle">
          Whew! You made it on time.
        </h1>
        <button className="btn startOver" onClick={fullReset}>
          Ready for tomorrow?
        </button>
      </div>
    );
  } else if (bossCar === office) {
    return (
      <div className="playingField loss">
        <h1 className="gameOverTitle">Yikes! You're late.</h1>
        <button className="btn startOver" onClick={fullReset}>
          Try again?
        </button>
      </div>
    );
  } else if (collision === true) {
    return <div className="playingField collision">
      <h1 className="gameOverTitle">Oops, you hit your boss. <br></br>You'll never work <br></br>in this town again.</h1>
      <button className="btn startOver collision" onClick={fullReset}>
          Try again in a new state?
        </button>
    </div>;
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
