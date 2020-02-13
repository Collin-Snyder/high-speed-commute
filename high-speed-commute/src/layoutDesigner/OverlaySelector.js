import React from "react";

const OverlaySelector = ({
    bossOverlay,
    playerOverlay,
    toggleOverlay,
    clearOverlays
  }) => {
  
    return (
      <div className="overlaySelector">
        <div className="overlayOptions">
          <label className={"btn overlay p" + (playerOverlay ? " checked" : "")}>
            <input
              type="checkbox"
              onChange={() => {toggleOverlay("playerPath")}}
              value="playerPath"
              name="overlayOption"
              checked={playerOverlay}
              className="overlayOption"
            />
            <span className="overlayLabel">Player Path</span>
          </label>
          <label className={"btn overlay b" + (bossOverlay ? " checked" : "")}>
            <input
              type="checkbox"
              onChange={() => {toggleOverlay("bossOverlay")}}
              value="bossOverlay"
              name="overlayOption"
              checked={bossOverlay}
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