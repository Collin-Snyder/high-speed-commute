import React from "react";
import DesignSquare from "./DesignSquare";

const DesignField = ({
  inputVisible,
  inputValue,
  handleInputChange,
  playerHome,
  bossHome,
  office,
  designLayout,
  addSquareToDesign,
  saveLevel,
  toggleInput
}) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      saveLevel();
      toggleInput();
    }
  };

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
      <div className="modal" style={{ display: inputVisible ? "block" : "none" }}>
        <div className="modalBackground" onClick={toggleInput}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onClick={e => {e.stopPropagation()}}
            placeholder="Enter your level's name"
            className="levelNameInput"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignField;
