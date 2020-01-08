import React from "react";
import GridSquare from "./GridSquare";
import DesignSquare from "./DesignSquare";

const PlayingField = ({
  mode,
  playerCar,
  playerHome,
  bossCar,
  bossHome,
  office,
  layout,
  designLayout,
  resetPlayers
}) => {
  if (mode === "play") {
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
  } else if (mode === "design") {
    return (
      <div className="levelDesigner">
        {designLayout.map((square, index) => (
          <DesignSquare squareInfo={square} key={index} />
        ))}
      </div>
    );
  }
};

export default PlayingField;
