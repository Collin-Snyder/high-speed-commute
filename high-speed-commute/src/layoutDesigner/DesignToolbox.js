import React from "react";

const DesignToolbox = ({
  handleToolSelection,
  handleBrushSelection,
  loadSavedDesign,
  selectedDesignTool,
  brushSize
}) => {

  const handleDesignLoading = () => {
    loadSavedDesign(13);
  }
  return (
    <div className="designToolbox">
      <button class="btn save" onClick={handleDesignLoading}>Load Saved Design</button>
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
    </div>
  );
};

export default DesignToolbox;
