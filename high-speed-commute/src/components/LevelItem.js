import React from "react";

const LevelItem = ({ levelInfo }) => {
  return (
    <li className="levelItem">
      <div className="levelIconWrapper">
        <span className="levelIcon"></span>
      </div>
      <div className="levelName">{levelInfo.level_name}</div>
    </li>
  );
};

export default LevelItem;
