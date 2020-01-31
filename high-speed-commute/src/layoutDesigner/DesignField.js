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
      this.setState({inputValue: ""})
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
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter your level's name"
        className="levelNameInput"
        style={{ display: inputVisible ? "inline-block" : "none" }}
      />
    </div>
  );
};

export default DesignField;
