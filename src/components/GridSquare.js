import React from "react";
import PlayerCar from "./PlayerCar";

const GridSquare = ({ squareInfo, playerCar, movePlayerCar }) => {
  let special = "";

  switch (squareInfo.id) {
    case 281:
      special = special + " playerHome";
      break;
    case 681:
      special = special + " bossHome";
      break;
    case 520:
      special = special + " office";
      break;
    default:
      special = "";
  }

  return (
    <div className={`gridSquare${special}`} id={squareInfo.id}>
      {playerCar === squareInfo.id ? <PlayerCar /> : squareInfo.id}
    </div>
  );
};

export default GridSquare;
