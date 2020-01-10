import React from "react";
import LevelItem from "./LevelItem";

const LevelsList = ({ userLevels }) => {
  return (
    <div className="levelsList">
      <ul>
        {userLevels.map((level, index) => (
          <LevelItem levelInfo={level} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default LevelsList;
