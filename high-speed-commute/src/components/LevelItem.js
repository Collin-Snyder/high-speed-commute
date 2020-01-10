import React from "react";

const LevelItem = ({ levelInfo, loadLevel }) => {
  const handleLevelClick = e => {
    e.persist();
    loadLevel(Number(e.currentTarget.id));
  };

  return (
    <li onClick={handleLevelClick} className="levelItem" id={levelInfo.id}>
      <div className="levelIconWrapper">
        <span className="levelIcon"></span>
      </div>
      <div className="levelName">{levelInfo.level_name}</div>
    </li>
  );
};

export default LevelItem;
