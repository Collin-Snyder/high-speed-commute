import React from "react";

const DesignSquare = ({ playerHome, bossHome, office, squareInfo, addSquareToDesign }) => {
  let special = "";

  special = squareInfo.type === "block" ? " block" : squareInfo.type === "street" ? " street" : "";

  switch (squareInfo.id) {
    case playerHome:
      special = " playerHome";
      break;
    case bossHome:
      special = " bossHome";
      break;
    case office:
      special = " office";
      break;
    default:
      special = special;
  }

  const handleDrag = e => {
    e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
  }

      return (
        <div
          className={`designSquare${special}`}
          id={squareInfo.id}
          onClick={(e) => {addSquareToDesign(e)}}
          draggable
          onDragStart={handleDrag}
          onDragEnter={(e) => {addSquareToDesign(e, true)}}
          // onDrop={()=>{console.log("Square is being targeted")}}
        >
          {squareInfo.id}
        </div>
      );
  };


export default DesignSquare;
