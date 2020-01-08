import React from "react";
import GridSquare from "./GridSquare";

const PlayingField = ({ playerCar, movePlayerCar, layout }) => {
  return (
    <div className="playingField">
      {/* {grid.map((row, index) => <GridRow row={row} key={index}/>)} */}
      {layout.map((square, index) => (
        <GridSquare squareInfo={square} playerCar={playerCar} key={index} />
      ))}
    </div>
  );
};

export default PlayingField;
