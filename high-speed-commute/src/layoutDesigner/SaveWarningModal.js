import React from "react";
import LevelItem from "../components/LevelItem";

const SaveWarningModal = ({ toggleModal, toggleInput, enterPlayMode }) => {
  const closeModal = () => {
    toggleModal("saveChangesNew");
  };

  const saveChanges = () => {
    closeModal();
    toggleInput();
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
          You have unsaved changes that will be lost.
        </h4>
        <div className="saveWarningButtons">
          <button className="btn save" onClick={saveChanges}>
            Save Changes
          </button>
          <button className="btn mode" onClick={() => enterPlayMode(null, true)}>Discard</button>
        </div>
      </div>
    </div>
  );
};

export default SaveWarningModal;
