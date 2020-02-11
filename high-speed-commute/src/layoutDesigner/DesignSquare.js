import React from "react";

const DesignSquare = ({ playerHome, bossHome, office, squareInfo, addSquareToDesign, isStoplight, isSchoolZone }) => {
  let keySquareClass = "";
  let stoplightClass = "";
  let schoolZoneClass = "";

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

  if (isStoplight) stoplightClass = " greenlight";

  if (isSchoolZone) schoolZoneClass = " schoolzone";

  const handleDrag = e => {
    e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
  }

      return (
        <div
          className={`designSquare${keySquareClass}${stoplightClass}${schoolZoneClass}`}
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
