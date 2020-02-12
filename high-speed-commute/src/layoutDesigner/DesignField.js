import React from "react";
import DesignSquare from "./DesignSquare";

const DesignField = ({
  inputVisible,
  inputValue,
  handleInputChange,
  playerHome,
  bossHome,
  office,
  stoplights,
  designLayout,
  addSquareToDesign,
  saveLevel,
  toggleModal,
  enterPlayMode,
  exiting
}) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      saveLevel();
      toggleModal("inputLevelName");
      if (exiting) enterPlayMode(null, true);
    }
  };

  return (
    <div className="levelDesigner">
      <img
        id="dragImage"
        style={{ opacity: 0, position: "absolute" }}
        src="https://lh3.googleusercontent.com/proxy/pkVRYWgvekmqFl7y9FOHIyNVUFM3-aTjfVK5DTZ9W3WdoKtz0j8OkTA6gUdfMql_4lwFxMsS1rq3-nJZ0owweGo1xA"
        width="1px"
        height="1px"
      />
      {designLayout.map((square, index) => (
        <DesignSquare
          id={square.id}
          type={square.type}
          layout={square.layout}
          playerCar={square.playerCar}
          bossCar={square.bossCar}
          stoplight={square.stoplight}
          schoolzone={square.schoolZone}
          tree={square.tree || null}
          house={square.house || null}
          borders={square.borders}
          isStoplight={stoplights.hasOwnProperty(square.id) ? true : false}
          isSchoolZone={square.schoolZone === true}
          playerHome={playerHome}
          bossHome={bossHome}
          office={office}
          squareInfo={square}
          addSquareToDesign={addSquareToDesign}
          key={square.id}
        />
      ))}
    </div>
  );
};

export default DesignField;
