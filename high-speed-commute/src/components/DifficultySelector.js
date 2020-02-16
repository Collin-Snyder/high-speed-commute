import React from "react";

const DifficultySelector = ({
    difficulty,
    changeDifficulty
  }) => {
  
    return (
      <div className="difficultySelector">
        <div className="difficultyOptions">
          <label className={"btn difficulty easy" + (difficulty === "easy" ? " checked" : "")}>
            <input
              type="radio"
              onChange={changeDifficulty}
              value="easy"
              name="difficultyOption"
              checked={difficulty === "easy"}
              className="difficultyOption"
            />
            <span className="difficultyLabel">Easy</span>
          </label>
          <label className={"btn difficulty medium" + (difficulty === "medium" ? " checked" : "")}>
            <input
              type="radio"
              onChange={changeDifficulty}
              value="medium"
              name="difficultyOption"
              checked={difficulty === "medium"}
              className="difficultyOption"
            />
            <span className="difficultyLabel">Medium</span>
            </label>
          <label className={"btn difficulty hard" + (difficulty === "hard" ? " checked" : "")}>
            <input
              type="radio"
              onChange={changeDifficulty}
              value="hard"
              name="difficultyOption"
              checked={difficulty === "hard"}
              className="difficultyOption"
            />
            <span className="difficultyLabel">Hard</span>
          </label>   
          </div>
      </div>
    );
  };
  
  export default DifficultySelector;