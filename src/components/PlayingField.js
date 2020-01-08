import React from "react";
import createGrid from "../logic/createGrid";
import createSquares from "../logic/createSquares";
import GridRow from "./GridRow";
import GridSquare from "./GridSquare";

const grid = createGrid(40, 25);
const squares = createSquares(40, 25);

const PlayingField = ({ playerCar }) => {
  return (
    <div className="playingField">
      {/* {grid.map((row, index) => <GridRow row={row} key={index}/>)} */}
      {squares.map((square, index) => (
        <GridSquare squareInfo={square} playerCar={playerCar} key={index} />
      ))}
    </div>
  );
};

export default PlayingField;
