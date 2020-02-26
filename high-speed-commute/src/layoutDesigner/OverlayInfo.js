import React from "react";

const OverlayInfo = ({
  bossOverlay,
  bossPathLength,
  playerOverlay,
  playerPathLength,
  easyInterval,
  mediumInterval,
  hardInterval
}) => {
  return (
    <div className="overlayInfoContainer">
      <div
        className="bossOverlayInfo"
        style={{ display: bossOverlay ? "inline-flex" : "none" }}
      >
        <div className="bossOverlaySubset">
          <h4 className="bossOverlayTitle">BOSS PATH</h4>
          <p>
            Length: <span>{bossPathLength}</span>
          </p>
        </div>
        <div className="bossOverlaySubset">
          <p>
            Easy Time: <span>{(bossPathLength * easyInterval) / 1000}</span>s
          </p>
          <p>
            Medium Time: <span>{(bossPathLength * mediumInterval) / 1000}</span>
            s
          </p>
          <p>
            Hard Time: <span>{(bossPathLength * hardInterval) / 1000}</span>s
          </p>
        </div>
      </div>
      <div
        className="playerPathInfo"
        style={{ display: playerOverlay ? "inline-flex" : "none" }}
      >
        <h4 className="playerOverlayTitle">PLAYER BEST PATH</h4>
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
