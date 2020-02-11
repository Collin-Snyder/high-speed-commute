import React from "react";
import LevelItem from "./LevelItem";

const LevelsList = ({ userLevels, loadLevel, deleteLevel }) => {
  return (
    <div className="levelsList">
      <ul>
        {userLevels.map((level, index) => (
          <div className="levelItemGroup" key={index}>
          <span className="delete" onClick={() => {deleteLevel(level.id)}}><i className="X">X</i></span>
          <LevelItem levelInfo={level} loadLevel={loadLevel} key={index} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LevelsList;
