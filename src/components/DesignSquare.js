import React from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";

const DesignSquare = ({ squareInfo }) => {

  return (
    <div className={`designSquare`} id={squareInfo.id}>
      {squareInfo.id}
    </div>
  );
};

export default DesignSquare;
