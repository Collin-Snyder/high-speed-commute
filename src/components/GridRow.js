import React from "react";
import GridSquare from "./GridSquare";

const GridRow = ({row}) => {
  return (
    <div className="gridRow">
      {row.map((square, index) => <GridSquare squareInfo={square} key={index}/>)}
    </div>
  );
};

export default GridRow;