import React from "react";

const IntroModal = ({existingUsername, newUsername, submitExistingUsername, submitNewUsername, handleUsernameInput, existingUsernameError, newUsernameError}) => {
  return (
    <div className="modalBackground intro" onClick={() => {}}>
      <div
        className="modalContent intro"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <h1 className="introTitle">High Speed Commute</h1>
        <div className="introOptions">
          <h3>Played before? Enter your commutername!</h3>
          <div className="usernameError" style={{display: existingUsernameError ? "block" : "none"}}>
            Sorry, that commutername doesn't seem to exist.
          </div>
          <input
            type="text"
            value={existingUsername}
            onChange={handleUsernameInput}
            onKeyPress={() => {}}
            onClick={e => e.stopPropagation()}
            placeholder="Enter your existing commutername"
            className="usernameInput"
            id="existingUsername"
          />
          
          <div className="btn play" onClick={submitExistingUsername}>
            Back to the grind
          </div>
          <h3>New to the neighborhood? Choose a commutername:</h3>
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameInput}
            onKeyPress={() => {}}
            onClick={e => e.stopPropagation()}
            placeholder="Enter a new commutername"
            className="usernameInput"
            id="newUsername"
          />
          <div className="btn play" onClick={submitNewUsername}>
            Your first day awaits
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
