import React from "react";

const OverlayInfo = ({ bossOverlay, bossPathLength, playerOverlay, playerPathLength }) => {
  return (
    <div className="overlayInfoContainer">
      <div
        className="bossOverlayInfo"
        style={{ display: bossOverlay ? "inline-flex" : "none" }}
      >
        <h4 className="bossOverlayTitle">Boss Path</h4>
        <p>
          Length: <span>{bossPathLength}</span>
        </p>
        <p>
          Time: <span>{(bossPathLength * 300) / 1000}</span>s
        </p>
      </div>
      <div
        className="playerPathInfo"
        style={{ display: playerOverlay ? "inline-flex" : "none" }}
      >
        <h4 className="playerOverlayTitle">Player Path</h4>
        <p>
          Length: <span>{playerPathLength}</span>
        </p>
        <p>
          Time: <span>{(playerPathLength * 300) / 1000}</span>s
        </p>
      </div>
      
    </div>
  );
};

export default OverlayInfo;
