import React from "react";
import LevelItem from "./LevelItem";

const LevelsList = ({
  defaultLevels,
  userLevels,
  loadLevel,
  deleteLevel,
  defaultLevelsVisible,
  userLevelsVisible,
  toggleLevelVisibility
}) => {
  let defaultClass = `folderIcon ${
    defaultLevels.length > 0 ? `full` : `empty`
  }`;
  let userClass = `folderIcon ${userLevels.length > 0 ? `full` : `empty`}`;
  return (
    <div className="levelsList">
      <div
        className="levelFolder"
        onClick={() => {
          toggleLevelVisibility("default");
        }}
      >
        <div className="folderIconWrapper">
          <i className={defaultClass}></i>
        </div>
        <div className="folderName">Default Levels</div>
      </div>
      <ul style={{ display: defaultLevelsVisible ? "inline-block" : "none" }}>
        {defaultLevels.map((level, index) => (
          <div className="levelItemGroup" key={index}>
            {/* <span className="delete" onClick={() => {deleteLevel(level.id)}}><i className="X">X</i></span> */}
            <LevelItem levelInfo={level} loadLevel={loadLevel} key={index} />
          </div>
        ))}
      </ul>
      <div
        className="levelFolder"
        onClick={() => {
          toggleLevelVisibility("user");
        }}
      >
        <div className="folderIconWrapper">
          <i className={userClass}></i>
        </div>
        <div className="folderName">User Levels</div>
      </div>
      <ul style={{ display: userLevelsVisible ? "inline-block" : "none" }}>
        {userLevels.map((level, index) => (
          <div className="levelItemGroup" key={index}>
            <span
              className="delete"
              onClick={() => {
                deleteLevel(level.id);
              }}
            >
              <i className="X">X</i>
            </span>
            <LevelItem levelInfo={level} loadLevel={loadLevel} key={index} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LevelsList;
