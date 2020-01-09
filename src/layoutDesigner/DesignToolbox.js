import React from "react";

const DesignToolbox = ({
  handleToolSelection,
  handleBrushSelection,
  selectedDesignTool,
  brushSize
}) => {
  return (
    <div className="designToolSelector">
      <label>
        <input
          type="radio"
          onChange={handleToolSelection}
          value="playerHome"
          name="designToolOption"
          checked={selectedDesignTool === "playerHome"}
        />
        Player Home
      </label>

      <label>
        <input
          type="radio"
          onChange={handleToolSelection}
          value="bossHome"
          name="designToolOption"
          checked={selectedDesignTool === "bossHome"}
        />
        Boss Home
      </label>

      <label>
        <input
          type="radio"
          onChange={handleToolSelection}
          value="office"
          name="designToolOption"
          checked={selectedDesignTool === "office"}
        />
        Office
      </label>

      <label>
        <input
          type="radio"
          onChange={handleToolSelection}
          value="block"
          name="designToolOption"
          checked={selectedDesignTool === "block"}
        />
        Block
      </label>

      <label>
        <input
          type="radio"
          onChange={handleToolSelection}
          value="street"
          name="designToolOption"
          checked={selectedDesignTool === "street"}
        />
        Street
      </label>
    </div>
  );
};

export default DesignToolbox;
