import React from "react";

const DesignToolbox = ({
  handleToolSelection,
  handleBrushSelection,
  selectedDesignTool,
  brushSize,
  clearBoard
}) => {

  return (
    <div className="designToolbox">
      <div className="designToolSelector">
        <label className="btn tool ph">
          <input
            type="radio"
            onChange={handleToolSelection}
            value="playerHome"
            name="designToolOption"
            checked={selectedDesignTool === "playerHome"}
          />
          <span className="toolLabel">Player Home</span>
        </label>
        <label className="btn tool bh">
          <input
            type="radio"
            onChange={handleToolSelection}
            value="bossHome"
            name="designToolOption"
            checked={selectedDesignTool === "bossHome"}
          />
          <span className="toolLabel">Boss Home</span>
        </label>
        <label className="btn tool o">
          <input
            type="radio"
            onChange={handleToolSelection}
            value="office"
            name="designToolOption"
            checked={selectedDesignTool === "office"}
          />
          <span className="toolLabel">Office</span>
        </label>
        <label className="btn tool st">
          <input
            type="radio"
            onChange={handleToolSelection}
            value="street"
            name="designToolOption"
            checked={selectedDesignTool === "street"}
          />
          <span className="toolLabel">Street</span>
        </label>
        <label className="btn tool erase">
          <input
            type="radio"
            onChange={handleToolSelection}
            value="eraser"
            name="designToolOption"
            checked={selectedDesignTool === "eraser"}
          />
          <span className="toolLabel">Eraser</span>
        </label>
      </div>
      <button class="btn clear" onClick={clearBoard}>Clear Design</button>
    </div>
  );
};

export default DesignToolbox;
