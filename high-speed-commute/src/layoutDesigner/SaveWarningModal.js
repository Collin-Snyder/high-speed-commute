import React from "react";

const SaveWarningModal = ({
  toggleModal,
  enterPlayMode,
  updateExistingLevel,
  currentLevel,
  levelName
}) => {
  console.log("Level name: ", levelName)
  const closeModal = () => {
    toggleModal("saveChangesNew");
  };

  const saveChanges = (isExistingLevel) => {
    if (isExistingLevel) {
      closeModal();
      updateExistingLevel();
      enterPlayMode(null, true);
    } else {
      closeModal();
      toggleModal("inputLevelName");
    }
  };

  return (
    <div className="modalBackground" onClick={closeModal}>
      <div
        className="modalContent"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <h4 className="saveWarningTitle">
          {levelName ? `Save your changes to ${levelName}?`: "You have unsaved changes that will be lost."}
        </h4>
        <div className="saveWarningButtons">
          <button
            className="btn save"
            onClick={() => {
              if (currentLevel) {
                saveChanges(true);
              } else {
                saveChanges(false);
              }
            }}
          >
            Save Changes
          </button>
          <button
            className="btn mode"
            onClick={() => enterPlayMode(null, true)}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveWarningModal;
