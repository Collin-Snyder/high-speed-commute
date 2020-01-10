import React from "react";
import LevelItem from "./LevelItem";

const LevelsList = ({ userLevels, loadLevel }) => {
  return (
    <div className="levelsList">
      <ul>
        {userLevels.map((level, index) => (
          <LevelItem levelInfo={level} loadLevel={loadLevel} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default LevelsList;
