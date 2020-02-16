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
  fullReset,
  playerColor
}) => {
  const t0 = performance.now();
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
              schoolzone={square.schoolZone}
              tree={square.tree || null}
              house={square.house || null}
              coffee={square.coffee}
              borders={square.borders}
              playerHome={playerHome}
              bossHome={bossHome}
              office={office}
              playerColor={playerColor}
              key={square.id}
            />
          );
        })}
      </div>
    );
  }
  const t1 = performance.now();

  console.log(`Time to run PlayingField function with map: ${t1 - t0}ms`);
};

export default PlayingField;
