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
        <label className={"btn tool ph" + (selectedDesignTool === "playerHome" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="playerHome"
            name="designToolOption"
            checked={selectedDesignTool === "playerHome"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Player Home</span>
        </label>
        <label className={"btn tool bh" + (selectedDesignTool === "bossHome" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="bossHome"
            name="designToolOption"
            checked={selectedDesignTool === "bossHome"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Boss Home</span>
        </label>
        <label className={"btn tool o" + (selectedDesignTool === "office" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="office"
            name="designToolOption"
            checked={selectedDesignTool === "office"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Office</span>
        </label>
        <label className={"btn tool st" + (selectedDesignTool === "street" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="street"
            name="designToolOption"
            checked={selectedDesignTool === "street"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Street</span>
        </label>
        <label className={"btn tool sl" + (selectedDesignTool === "stoplight" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="stoplight"
            name="designToolOption"
            checked={selectedDesignTool === "stoplight"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Stop light</span>
        </label>
        <label className={"btn tool sz" + (selectedDesignTool === "schoolzone" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="schoolzone"
            name="designToolOption"
            checked={selectedDesignTool === "schoolzone"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">School Zone</span>
        </label>
        <label className={"btn tool cf" + (selectedDesignTool === "coffee" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="coffee"
            name="designToolOption"
            checked={selectedDesignTool === "coffee"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Coffee</span>
        </label>
        <label className={"btn tool erase" + (selectedDesignTool === "eraser" ? " checked" : "")}>
          <input
            type="radio"
            onChange={handleToolSelection}
            value="eraser"
            name="designToolOption"
            checked={selectedDesignTool === "eraser"}
            className="toolSelectorRadio"
          />
          <span className="toolLabel">Eraser</span>
        </label>
      </div>
    </div>
  );
};

export default DesignToolbox;
