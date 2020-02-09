import React from "react";

const InputLevelNameModal = ({
  inputValue,
  handleInputChange,
  saveLevel,
  toggleModal,
  enterPlayMode,
  exiting
}) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      saveLevel();
      toggleModal("inputLevelName");
    }
  };
  const handleExitKeyPress = e => {
    if (e.key === "Enter") {
      saveLevel();
      toggleModal("inputLevelName");
      enterPlayMode(null, true);
    }
  };

  return (
    <div
      className="modalBackground"
      onClick={() => {
        toggleModal("inputLevelName");
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={exiting ? handleExitKeyPress : handleKeyPress}
        onClick={e => {
          e.stopPropagation();
        }}
        placeholder="Enter your level's name"
        className="levelNameInput"
      />
    </div>
  );
};

export default InputLevelNameModal;
