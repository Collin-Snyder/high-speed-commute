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

      return (
        <div
          className={`designSquare${special}`}
          id={squareInfo.id}
          onClick={addSquareToDesign}
        >
          {squareInfo.id}
        </div>
      );
  };


export default DesignSquare;
