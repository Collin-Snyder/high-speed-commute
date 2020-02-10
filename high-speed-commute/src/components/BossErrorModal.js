import React from "react";

const BossErrorModal = ({ closeBossModal }) => {
  return (
    <div className="modalBackground" onClick={closeBossModal}>
      <div
        className="modalContent bossError"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <i className="bang"></i>
        <h4 className="bossErrorTitle">
          There is no valid path for the Boss to reach the office. <br></br>Make changes
          to this level and try again.
        </h4>
        <div className="bossErrorButtons">
          <div className="btn mode" onClick={closeBossModal}>
            Ok
          </div>
        </div>
      </div>
    </div>
  );
};

export default BossErrorModal;
