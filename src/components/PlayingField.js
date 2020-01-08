import React from "react";
import GridSquare from "./GridSquare";

const PlayingField = ({ playerCar, playerHome, bossCar, bossHome, office, layout, resetPlayers }) => {
  if (playerCar === office) {
    return (
      <div className="playingField win">
        <h1>Whew! You're not late. You get a promotion!</h1>
        <button onClick={resetPlayers}>Ready for tomorrow?</button>
      </div>
    );
  } else if (bossCar === office) {
    return (
      <div className="playingField loss">
        <h1>Yikes! You got fired.</h1>
        <button onClick={resetPlayers}>Get a new job and try again?</button>
      </div>
    );
  } else {
    return (
      <div className="playingField">
        {/* {grid.map((row, index) => <GridRow row={row} key={index}/>)} */}
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
