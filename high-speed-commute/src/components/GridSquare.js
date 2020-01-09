import React from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";

const GridSquare = ({
  squareInfo,
  playerCar,
  playerHome,
  bossCar,
  bossHome,
  office
}) => {
  let typeClass = "";
  let keySquareClass = "";
  // let pathClass = "";
  let classList;

  typeClass =
    squareInfo.type === "block"
      ? " block"
      : squareInfo.type === "street"
      ? " street"
      : "";

  switch (squareInfo.id) {
    case playerHome:
      keySquareClass = " playerHome";
      break;
    case bossHome:
      keySquareClass = " bossHome";
      break;
    case office:
      keySquareClass = " office";
      break;
    default:
      keySquareClass = "";
  }

  // if (squareInfo.pathOption || squareInfo.finalPath) {
  //   if (squareInfo.finalPath) {
  //     pathClass = " finalPath";
  //   } else {
  //     pathClass = " pathOption";
  //   }
  // }

  classList = typeClass + keySquareClass;

  return (
    <div
      className={`gridSquare${classList}`}
      id={squareInfo.id}
    >
      {playerCar === squareInfo.id ? (
        <PlayerCar />
      ) : bossCar === squareInfo.id ? (
        <BossCar />
      ) : (
        squareInfo.id
      )}
    </div>
  );
};

export default GridSquare;
