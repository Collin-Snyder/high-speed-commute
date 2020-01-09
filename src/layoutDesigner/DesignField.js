import React from "react";
import DesignSquare from "./DesignSquare";

const PlayingField = ({ playerHome, bossHome, office, designLayout, addSquareToDesign }) => {
  return (
    <div className="levelDesigner">
      {designLayout.map((square, index) => (
        <DesignSquare
          playerHome={playerHome}
          bossHome={bossHome}
          office={office}
          squareInfo={square}
          addSquareToDesign={addSquareToDesign}
          key={index}
        />
      ))}
    </div>
  );
};

export default PlayingField;
