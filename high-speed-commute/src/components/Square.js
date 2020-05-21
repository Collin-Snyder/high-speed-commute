import React, { memo } from "react";
import Tile from "./Tile";

const noOp = () => {};

const Square = memo(
  ({
    id,
    type,
    playerHome,
    bossHome,
    office,
    playerColor,
    stoplight,
    playerCar,
    bossCar,
    coffee,
    schoolzone,
    tree,
    house,
    mode,
    bossOverlay,
    playerOverlay,
    isBossPath,
    isPlayerPath,
    handleDrag,
    addDragSquareToDesign,
    addSquareToDesign,
  }) => {
    return (
      <div
        className={`${
          mode === "play"
            ? "gameSquare"
            : mode === "design"
            ? "designSquare"
            : ""
        } ${type} ${
          id === playerHome || id === bossHome || id === office
            ? ` keySquare`
            : ``
        }`}
        id={id}
        onClick={mode === "design" ? addSquareToDesign : noOp}
        draggable={mode === "design"}
        onDragStart={mode === "design" ? handleDrag : noOp}
        onDragEnter={mode === "design" ? addDragSquareToDesign : noOp}
      >
        {mode === "design" ? id : ""}
        {tree ? <Tile type="tree" /> : house ? <Tile type="house" /> : <></>}
        {schoolzone ? <Tile type="schoolZone" /> : <></>}
        {id === playerHome ? (
          <Tile type="playerHome" color={playerColor} />
        ) : id === bossHome ? (
          <Tile type="bossHome" />
        ) : id === office ? (
          <Tile type="office" />
        ) : (
          <></>
        )}
        {stoplight ? <Tile type="stoplight" color={stoplight} /> : <></>}
        {playerCar ? (
          <Tile type="playerCar" />
        ) : bossCar ? (
          <Tile type="bossCar" />
        ) : (
          <></>
        )}
        {coffee ? <Tile type="coffee" /> : <></>}
        {bossOverlay && isBossPath && id !== office ? (
          <Tile type="bossPath" />
        ) : (
          <></>
        )}
        {playerOverlay && isPlayerPath && id !== office ? (
          <Tile type="playerPath" />
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default Square;
