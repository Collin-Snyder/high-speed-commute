import React from "react";

const DesignSquare = ({ playerHome, bossHome, office, squareInfo, addSquareToDesign }) => {
  let keySquareClass = "";
  let stoplightClass = "";

  keySquareClass = squareInfo.type === "block" ? " block" : squareInfo.type === "street" ? " street" : "";

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
      keySquareClass = keySquareClass;
  }

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

  const handleDrag = e => {
    e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
  }

      return (
        <div
          className={`designSquare${keySquareClass}${stoplightClass}`}
          id={squareInfo.id}
          onClick={(e) => {addSquareToDesign(e)}}
          draggable
          onDragStart={handleDrag}
          onDragEnter={(e) => {addSquareToDesign(e, true)}}
        >
          {squareInfo.id}
        </div>
      );
  };


export default DesignSquare;
