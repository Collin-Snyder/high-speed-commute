import React from "react";

const OverlayInfo = ({ bossOverlay, bossPathLength }) => {
  return (
    <div className="overlayInfoContainer">
      <div
        className="bossOverlayInfo"
        style={{ display: bossOverlay ? "inline-flex" : "none" }}
      >
        <h4>Boss Path</h4>
        <p>
          Length: <span>{bossPathLength}</span>
        </p>
        <p>
          Time: <span>{(bossPathLength * 300) / 1000}</span>s
        </p>
      </div>
    </div>
  );
};

export default OverlayInfo;
