import React from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";

const GridSquare = ({ squareInfo, playerCar, playerHome, bossCar, bossHome, office}) => {
  let special = "";

  switch (squareInfo.id) {
    case playerHome:
      special = special + " playerHome";
      break;
    case bossHome:
      special = special + " bossHome";
      break;
    case office:
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
