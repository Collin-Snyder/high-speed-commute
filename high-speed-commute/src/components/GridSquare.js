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
  let stoplightClass = "";
  let centerLineClass = "";
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
  };

  switch (squareInfo.stoplight) {
    case "green":
      stoplightClass = " greenlight";
      break;
    case "yellow":
      stoplightClass = " yellowlight";
      break;
    case "red":
      stoplightClass = " redlight";
      break;
    default: 
      stoplightClass = "";
  }

  if (squareInfo.borders.left && squareInfo.borders.right && !squareInfo.borders.up && !squareInfo.borders.down) {
    centerLineClass = " horizontalLine"
  } else if (squareInfo.borders.up && squareInfo.borders.down && !squareInfo.borders.right && !squareInfo.borders.left) {
    centerLineClass = " verticalLine"
  }

  // if (squareInfo.pathOption || squareInfo.finalPath) {
  //   if (squareInfo.finalPath) {
  //     pathClass = " finalPath";
  //   } else {
  //     pathClass = " pathOption";
  //   }
  // }

  classList = typeClass + keySquareClass + centerLineClass + stoplightClass;
  if (squareInfo.type === "block") {
    return (
      <div
        className={`gridSquare${classList}`}
        id={squareInfo.id}
      >
        {squareInfo["tree"] ? (
          <span className="tree"></span>
        ) : squareInfo["house"] ? (
          <span className="house"></span>
        ) : (
          ""
        )}
      </div>
    );
  } else {
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
          ""
        )}
      </div>
    );
  }
};

export default GridSquare;
