import React from "react";
import axios from "axios";
import StateMachine from "javascript-state-machine";
import DesignField from "./DesignField";
import DesignToolbox from "./DesignToolbox";
import LoadSavedDesignModal from "./LoadSavedDesignModal";
import SaveWarningModal from "./SaveWarningModal";
import InputLevelNameModal from "./InputLevelNameModal";
import createDesignBoard from "../logic/createDesignBoard";
import {
  convertLayoutToJSONString,
  formatLayout
} from "../levelHandling/JSONconverters";

// const saveMachine = new StateMachine({
//   init: "savedNew",
//   data: {
//     isSaved: true,
//     currentLevel: null,
//     prompt: null,
//     exiting: false
//   },
//   transitions: [
//     {name: "changeNewDesign", from: "savedNew", to: "unsavedNew"},
//     {name: "changeExistingDesign", from: "savedExisting", to: "unsavedExisting"},
//     {name: "openLevelNameInputOnExit", from: "unsavedNew", to: "inputLevelNameOnExit"},
//     {name: "openSaveChangesPromptOnExit", from: "unsavedNew", to: "saveChangesPromptOnExit"},
//   ],

// })

export default class DesignModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDesignTool: "playerHome",
      brushSize: "small",
      boardWidth: 40,
      boardHeight: 25,
      designLayout: [],
      playerHome: 0,
      bossHome: 0,
      office: 0,
      levelName: "",
      inputVisible: false,
      playButtonVisible: false,
      // lastSavedLevel: null,
      modalVisibility: {
        loadDesign: false,
        saveChangesNew: false,
        saveChanges: false,
        inputLevelName: false
      },
      saveStates: {
        isSaved: true,
        currentLevel: null,
        exiting: false,
        confirmationVisible: false,
        saveError: false
      }
    };

    // this.state2 = {
    //   saveStates: {
    //     isSaved: true,
    //     currentLevel: null,
    //     exiting: false,
    //     promptVisibility: {
    //       saveChangesNew: false,
    //       saveChanges: false,
    //       levelName: false
    //     }
    //   }
    // }

    this.handleToolSelection = this.handleToolSelection.bind(this);
    this.handleBrushSelection = this.handleBrushSelection.bind(this);
    this.addSquareToDesign = this.addSquareToDesign.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.sendDesignToGame = this.sendDesignToGame.bind(this);
    this.enterPlayMode = this.enterPlayMode.bind(this);
    this.saveLevelToDatabase = this.saveLevelToDatabase.bind(this);
    this.updateExistingLevel = this.updateExistingLevel.bind(this);
    this.loadSavedDesign = this.loadSavedDesign.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.designLayout !== prevProps.designLayout) {
      this.setState({ designLayout: this.props.designLayout });
    }
  }

  handleToolSelection(e) {
    this.setState({ selectedDesignTool: e.target.value });
  }

  handleBrushSelection(e) {}

  addSquareToDesign(e, drag = false) {
    e.persist();

    let { selectedDesignTool } = this.state;
    let squareId = Number(e.currentTarget.id);

    if (selectedDesignTool === "playerHome") {
      let { designLayout, playerHome, saveStates } = this.state;

      if (playerHome === squareId) {
        playerHome = 0;
        designLayout[squareId - 1].type = "block";
      } else {
        if (playerHome > 0) {
          designLayout[playerHome - 1].type = "block";
        }
        playerHome = squareId;
        designLayout[squareId - 1].type = "street";
      }

      saveStates.isSaved = false;

      this.setState({ playerHome, designLayout, saveStates });
    } else if (selectedDesignTool === "bossHome") {
      let { designLayout, bossHome, saveStates } = this.state;

      if (bossHome === squareId) {
        bossHome = 0;
        designLayout[squareId - 1].type = "block";
      } else {
        if (bossHome > 0) {
          designLayout[bossHome - 1].type = "block";
        }
        bossHome = squareId;
        designLayout[squareId - 1].type = "street";
      }

      saveStates.isSaved = false;

      this.setState({ bossHome, designLayout, saveStates });
    } else if (selectedDesignTool === "office") {
      let { designLayout, office, saveStates } = this.state;

      if (office === squareId) {
        office = 0;
        designLayout[squareId - 1].type = "block";
      } else {
        if (office > 0) {
          designLayout[office - 1].type = "block";
        }
        office = squareId;
        designLayout[squareId - 1].type = "street";
      }

      saveStates.isSaved = false;

      this.setState({ office, designLayout, saveStates });
    } else if (selectedDesignTool === "eraser") {
      let {
        designLayout,
        playerHome,
        bossHome,
        office,
        saveStates
      } = this.state;

      designLayout[squareId - 1].type = "block";

      if (squareId === playerHome) playerHome = 0;
      else if (squareId === bossHome) bossHome = 0;
      else if (squareId === office) office = 0;

      saveStates.isSaved = false;

      this.setState({
        designLayout,
        playerHome,
        bossHome,
        office,
        saveStates
      });
    } else if (selectedDesignTool === "street") {
      let { designLayout, saveStates } = this.state;

      if (!drag && designLayout[squareId - 1].type === "street") {
        designLayout[squareId - 1].type = "block";
      } else {
        designLayout[squareId - 1].type = "street";
      }

      saveStates.isSaved = false;

      this.setState({ designLayout, saveStates });
    }
  }

  clearBoard() {
    let { designLayout, playerHome, bossHome, office } = this.state;
    designLayout = designLayout.map(square => {
      square.type = "block";
      return square;
    });
    playerHome = bossHome = office = 0;
    this.setState({ designLayout, playerHome, bossHome, office });
  }

  sendDesignToGame() {
    this.props.loadDesign(this.state.saveStates.currentLevel);
    let { playerHome, bossHome, office } = this.state;
    playerHome = bossHome = office = 0;
    this.setState({ playerHome, bossHome, office, playButtonVisible: false });
  }

  enterPlayMode(e, discard = false) {
    if (!this.state.saveStates.isSaved && !discard) {
      //render warning message to save level
      let { modalVisibility, saveStates } = this.state;

      modalVisibility.saveChangesNew = true;
      saveStates.exiting = true;

      this.setState({ modalVisibility, saveStates });
    } else {
      this.props.enterPlayMode();

      let {
        playerHome,
        bossHome,
        office,
        saveStates,
        modalVisibility
      } = this.state;

      playerHome = bossHome = office = 0;
      saveStates.currentLevel = null;
      saveStates.exiting = false;

      for (let modal in modalVisibility) {
        modalVisibility[modal] = false;
      }

      this.setState({
        playerHome,
        bossHome,
        office,
        saveStates,
        modalVisibility,
        playButtonVisible: false
      });
    }
  }

  loadSavedDesign(levelId) {
    axios
      .get(`/api/levels/${levelId}`)
      .then(data => {
        let levelInfo = data.data.rows[0];
        let levelName = levelInfo.level_name;
        let boardHeight = levelInfo.board_height;
        let boardWidth = levelInfo.board_width;
        let playerHome = levelInfo.player_home;
        let playerCar = playerHome;
        let bossHome = levelInfo.boss_home;
        let bossCar = bossHome;
        let office = levelInfo.office;
        let unformattedLayout = levelInfo.layout;

        let designLayout = formatLayout(unformattedLayout);

        let { saveStates } = this.state;
        saveStates.currentLevel = levelId;
        saveStates.isSaved = true;

        this.setState({
          levelName,
          boardHeight,
          boardWidth,
          playerHome,
          playerCar,
          bossHome,
          bossCar,
          office,
          designLayout,
          saveStates
        });
      })
      .catch(err => console.error(err));
  }

  saveLevelToDatabase() {
    let {
      levelName,
      boardHeight,
      boardWidth,
      playerHome,
      bossHome,
      office,
      designLayout,
      saveStates
    } = this.state;

    let levelInfo = {
      userId: 1,
      levelName,
      boardHeight,
      boardWidth,
      playerHome,
      bossHome,
      office,
      layout: convertLayoutToJSONString(designLayout)
    };

    axios
      .post("/api/levels", levelInfo)
      .then(res => {
        saveStates.isSaved = true;
        saveStates.confirmationVisible = true;
        saveStates.currentLevel = res.data.rows[0].id;
        this.setState({ saveStates }, () => {
          setTimeout(() => {
            let { saveStates } = this.state;
            saveStates.confirmationVisible = false;
            this.setState({ saveStates }, () => {
                if (this.state.saveStates.exiting) {
                  this.enterPlayMode();
                }
              }
          )}, 1000);
          });
        })
      .catch(err => {
        console.log("There was a problem saving your level.");
        console.error(err);
      });
  }

  updateExistingLevel() {
    //update saveState.currentLevel in database with current state of layout
    console.log(`Updating level ${this.state.saveStates.currentLevel}`);
    let { playerHome, bossHome, office, designLayout, saveStates } = this.state;

    let levelInfo = {
      levelId: saveStates.currentLevel,
      playerHome,
      bossHome,
      office,
      layout: convertLayoutToJSONString(designLayout)
    };

    axios
      .patch("/api/levels", levelInfo)
      .then(res => {
        console.log("Made the update request!");
        saveStates.isSaved = true;
        saveStates.confirmationVisible = true;
        this.setState({ saveStates }, () => {
          setTimeout(() => {
            let { saveStates } = this.state;
            saveStates.confirmationVisible = false;
            this.setState({ saveStates });
          }, 1000);
        });
      })
      .catch(err => console.error("Uh oh, there was a problem: ", err));
  }

  toggleInput() {
    let { inputVisible, playButtonVisible, levelName } = this.state;

    if (inputVisible) {
      playButtonVisible = true;
      levelName = "";
    }

    this.setState({
      inputVisible: !inputVisible,
      playButtonVisible,
      levelName
    });
  }

  toggleModal(modalName) {
    let { modalVisibility } = this.state;
    modalVisibility[modalName] = !modalVisibility[modalName];
    this.setState({ modalVisibility });
  }

  handleInputChange(e) {
    this.setState({ levelName: e.target.value });
  }

  render() {
    return (
      <>
        <div
          className="designModuleLevelName"
          style={{
            display: this.state.saveStates.currentLevel
              ? "inline-block"
              : "none"
          }}
        >
          {this.state.levelName}
        </div>
        <div className="designModule" style={{ display: this.props.display }}>
          {/* <h3 className="designModuleTitle">Design Mode</h3> */}
          <div className="designTools">
            <h4 className="designToolboxTitle">Design Tools</h4>
            <DesignToolbox
              handleToolSelection={this.handleToolSelection}
              handleBrushSelection={this.handleBrushSelection}
              selectedDesignTool={this.state.selectedDesignTool}
              brushSize={this.state.brushSize}
              clearBoard={this.clearBoard}
            />
          </div>
          <DesignField
            inputVisible={this.state.modalVisibility.inputLevelName}
            inputValue={this.state.levelName}
            playerHome={this.state.playerHome}
            bossHome={this.state.bossHome}
            office={this.state.office}
            designLayout={this.state.designLayout}
            addSquareToDesign={this.addSquareToDesign}
            handleInputChange={this.handleInputChange}
            saveLevel={this.saveLevelToDatabase}
            toggleModal={this.toggleModal}
            enterPlayMode={this.enterPlayMode}
            exiting={this.state.saveStates.exiting}
          />
          <div className="buttons design">
            <div
              class="btn save"
              onClick={() => {
                this.toggleModal("loadDesign");
              }}
            >
              Load Saved Design
            </div>
            <div
              className="saveConfirmation"
              style={{
                display: this.state.saveStates.confirmationVisible
                  ? "inline-flex"
                  : "none"
              }}
            >
              <span style={{ display: "inline-block" }}>
                Changes Saved!<i className="checkmark"></i>
              </span>
            </div>
            <div
              className="btn save design"
              style={{
                display: !this.state.saveStates.isSaved
                  ? "inline-block"
                  : "none"
              }}
              onClick={
                this.state.saveStates.currentLevel
                  ? this.updateExistingLevel
                  : () => {
                      this.toggleModal("inputLevelName");
                    }
              }
            >
              Save Level
            </div>
            <div
              className="btn save design"
              style={{
                display:
                  this.state.saveStates.currentLevel &&
                  !this.state.saveStates.isSaved
                    ? "inline-block"
                    : "none"
              }}
              onClick={() => {
                this.toggleModal("inputLevelName");
              }}
            >
              Save As New Level
            </div>
            <div
              style={{
                display:
                  this.state.playerHome > 0 &&
                  this.state.bossHome > 0 &&
                  this.state.office > 0
                    ? "inline-block"
                    : "none"
              }}
              className="btn save design"
            >
              Test Level
            </div>
            <div className="btn mode" onClick={this.enterPlayMode}>
              Back To Play Mode
            </div>
            <div
              style={{
                display: this.state.playButtonVisible ? "inline-block" : "none"
              }}
              className="btn play design"
              onClick={this.sendDesignToGame}
            >
              Play Now!
            </div>
            {/* <div
            className="btn mode design"
            onClick={this.props.enterPlayMode}
          >
            Switch to Play Mode
          </div> */}
          </div>
          <div
            className="modal"
            style={{
              display: this.state.modalVisibility.loadDesign ? "block" : "none"
            }}
          >
            <LoadSavedDesignModal
              toggleModal={this.toggleModal}
              userLevels={this.props.userLevels}
              loadSavedDesign={this.loadSavedDesign}
            />
          </div>
          <div
            className="modal"
            style={{
              display:
                this.state.modalVisibility.saveChangesNew ||
                this.state.modalVisibility.saveChanges
                  ? "block"
                  : "none"
            }}
          >
            <SaveWarningModal
              toggleModal={this.toggleModal}
              enterPlayMode={this.enterPlayMode}
              updateExistingLevel={this.updateExistingLevel}
              currentLevel={this.state.saveStates.currentLevel}
              levelName={this.state.levelName}
            />
          </div>
          <div
            className="modal"
            style={{
              display: this.state.modalVisibility.inputLevelName
                ? "block"
                : "none"
            }}
          >
            <InputLevelNameModal
              inputValue={this.state.levelName}
              handleInputChange={this.handleInputChange}
              saveLevel={this.saveLevelToDatabase}
              toggleModal={this.toggleModal}
              enterPlayMode={this.enterPlayMode}
              exiting={this.state.saveStates.exiting}
            />
          </div>
        </div>
      </>
    );
  }
}
