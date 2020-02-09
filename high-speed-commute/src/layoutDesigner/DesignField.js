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
  toggleModal
}) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      saveLevel();
      toggleModal("inputLevelName");
    }
  };

  return (
    <div className="levelDesigner">
       <img id="dragImage" style={{opacity: 0, position: "absolute"}} src="https://lh3.googleusercontent.com/proxy/pkVRYWgvekmqFl7y9FOHIyNVUFM3-aTjfVK5DTZ9W3WdoKtz0j8OkTA6gUdfMql_4lwFxMsS1rq3-nJZ0owweGo1xA" width="1px" height="1px"/>
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
        <div className="modalBackground" onClick={() => {toggleModal("inputLevelName")}}>
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
