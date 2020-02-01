import React from "react";
import LevelItem from "../components/LevelItem";

const LoadSavedLevelModal = ({toggleModal, userLevels, loadSavedDesign}) => {
  return (
    <div className="modalBackground" onClick={toggleModal}>
      <div className="modalContent">
        <h2 className="savedLevelTitle">Your Saved Levels</h2>
        <div className="userLevelSelector">
          {userLevels.map((level, index) => (
            <LevelItem
              levelInfo={level}
              loadLevel={loadSavedDesign}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadSavedLevelModal;
