import React from "react";

const OverlaySelector = ({
    bossPath,
    playerPath,
    toggleOverlay,
    clearOverlays
  }) => {
  
    return (
      <div className="overlaySelector">
        <div className="overlayOptions">
          <label className={"btn overlay p" + (playerPath ? " checked" : "")}>
            <input
              type="checkbox"
              onChange={() => {toggleOverlay("playerPath")}}
              value="playerPath"
              name="overlayOption"
              checked={playerPath}
              className="overlayOption"
            />
            <span className="overlayLabel">Player Path</span>
          </label>
          <label className={"btn overlay b" + (bossPath ? " checked" : "")}>
            <input
              type="checkbox"
              onChange={() => {toggleOverlay("bossPath")}}
              value="bossPath"
              name="overlayOption"
              checked={bossPath}
              className="overlayOption"
            />
            <span className="overlayLabel">Boss Path</span>
          </label>   
        </div>
        <div class="btn clear" onClick={clearOverlays}>Clear Overlays</div>
      </div>
    );
  };
  
  export default OverlaySelector;