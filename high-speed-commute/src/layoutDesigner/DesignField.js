import React from "react";
import Square from "../components/Square";

const handleDrag = (e) => {
  e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
};

const DesignField = ({
  inputVisible,
  inputValue,
  handleInputChange,
  playerHome,
  bossHome,
  office,
  stoplights,
  designLayout,
  addDragSquareToDesign,
  addSquareToDesign,
  saveLevel,
  toggleModal,
  enterPlayMode,
  exiting,
  overlays,
}) => {
  return (
    <div className="levelDesigner">
      <img
        id="dragImage"
        style={{ opacity: 0, position: "absolute" }}
        src="https://lh3.googleusercontent.com/proxy/pkVRYWgvekmqFl7y9FOHIyNVUFM3-aTjfVK5DTZ9W3WdoKtz0j8OkTA6gUdfMql_4lwFxMsS1rq3-nJZ0owweGo1xA"
        width="1px"
        height="1px"
        alt="replacement for drag-and-draw"
      />
      {designLayout.map((square) => (
        <Square
          mode="design"
          id={square.id}
          type={square.type}
          playerCar={square.playerCar}
          bossCar={square.bossCar}
          stoplight={square.stoplight}
          schoolzone={square.schoolZone}
          tree={square.tree || null}
          house={square.house || null}
          coffee={square.coffee}
          playerHome={playerHome}
          bossHome={bossHome}
          office={office}
          playerColor="blue"
          isBossPath={square.bossPath}
          isPlayerPath={square.playerPath}
          bossOverlay={overlays.bossOverlay}
          playerOverlay={overlays.playerOverlay}
          addDragSquareToDesign={addDragSquareToDesign}
          addSquareToDesign={addSquareToDesign}
          handleDrag={handleDrag}
          key={square.id}
        />
      ))}
    </div>
  );
};

export default DesignField;

// <DesignSquare
// id={square.id}
// type={square.type}
// layout={square.layout}
// playerCar={square.playerCar}
// bossCar={square.bossCar}
// stoplight={square.stoplight}
// schoolzone={square.schoolZone}
// tree={square.tree || null}
// house={square.house || null}
// coffee={square.coffee}
// borders={square.borders}
// playerHome={playerHome}
// bossHome={bossHome}
// isBossPath={square.bossPath}
// isPlayerPath={square.playerPath}
// bossOverlay={overlays.bossOverlay}
// playerOverlay={overlays.playerOverlay}
// office={office}
// squareInfo={square}
// addDragSquareToDesign={addDragSquareToDesign}
// addSquareToDesign={addSquareToDesign}
// key={square.id}
// />
