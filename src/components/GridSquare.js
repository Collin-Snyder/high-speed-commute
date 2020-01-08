import React from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";

const GridSquare = ({ squareInfo, playerCar, bossCar }) => {
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
      {playerCar === squareInfo.id ? <PlayerCar /> : bossCar === squareInfo.id ? <BossCar /> : ""}
    </div>
  );
};

export default GridSquare;
