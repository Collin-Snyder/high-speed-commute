import React from "react";
import GameSquare from "./GridSquare";

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
        <h1 className="gameOverTitle">Whew! You made it on time.</h1>
        <div className="btn startOver" onClick={fullReset}>
          Ready for tomorrow?
        </div>
      </div>
    );
  } else if (bossCar === office) {
    return (
      <div className="playingField loss">
        <h1 className="gameOverTitle">Yikes! You're late.</h1>
        <div className="btn startOver" onClick={fullReset}>
          Try again?
        </div>
      </div>
    );
  } else if (collision === true) {
    return (
      <div className="playingField collision">
        <h1 className="gameOverTitle">
          Oops, you hit your boss. <br></br>You'll never work <br></br>in this
          town again.
        </h1>
        <div className="btn startOver collision" onClick={fullReset}>
          Try again in a new state?
        </div>
      </div>
    );
  } else {
    return (
      <div className="playingField">
        {layout.map((square, index) => {
          // console.log(`Square ${square.id} being mapped`);
          return (
            <GameSquare
              id={square.id}
              type={square.type}
              layout={square.layout}
              playerCar={square.playerCar}
              bossCar={square.bossCar}
              stoplight={square.stoplight}
              tree={square.tree || null}
              house={square.house || null}
              // squareInfo={square}

              // playerCar={playerCar}
              playerHome={playerHome}
              // bossCar={bossCar}
              bossHome={bossHome}
              office={office}
              key={square.id}
            />
          );
        })}
      </div>
    );
  }
};

export default PlayingField;
