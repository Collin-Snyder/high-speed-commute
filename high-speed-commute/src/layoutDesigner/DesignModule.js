import React from "react";
import axios from "axios";
import StateMachine from "javascript-state-machine";
import DesignField from "./DesignField";
import DesignToolbox from "./DesignToolbox";
import OverlaySelector from "./OverlaySelector";
import OverlayInfo from "./OverlayInfo";
import LoadSavedDesignModal from "./LoadSavedDesignModal";
import SaveWarningModal from "./SaveWarningModal";
import InputLevelNameModal from "./InputLevelNameModal";
import { findPath } from "../logic/moveBoss";
import { findPlayerPath } from "../logic/movePlayer";
import createDesignBoard from "../logic/createDesignBoard";
import { randomNumBtwn } from "../logic/randomNumber";
import {
  convertLayoutToJSONString,
  formatLayout
} from "../levelHandling/JSONconverters";

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
      stoplights: {},
      coffees: {},
      levelName: "",
      inputVisible: false,
      playButtonVisible: false,
      overlayVisibility: {
        bossOverlay: false,
        playerOverlay: false
      },
      bossPath: [],
      playerPath: [],
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
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.clearOverlays = this.clearOverlays.bind(this);
    this.findBossPath = this.findBossPath.bind(this);
    this.findPlayerPath = this.findPlayerPath.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.designLayout !== prevProps.designLayout) {
      if (
        !this.props.designLayout[0].borders.hasOwnProperty("up") ||
        !this.props.designLayout[0].borders.hasOwnProperty("down") ||
        !this.props.designLayout[0].borders.hasOwnProperty("right") ||
        !this.props.designLayout[0].borders.hasOwnProperty("left")
      ) {
        console.log("BORDER ERROR ALERT IN DESIGN MODULE CDU");
      }
      this.setState({ designLayout: this.props.designLayout });
    }

    if (this.props.stoplights !== prevProps.stoplights) {
      this.setState({ stoplights: this.props.stoplights });
    }
  }

  handleToolSelection(e) {
    this.setState({ selectedDesignTool: e.target.value });
  }

  handleBrushSelection(e) {}

  findBossPath() {
    let { bossHome, office, designLayout, bossPath } = this.state;

    for (let square of bossPath) {
      designLayout[square - 1].bossPath = false;
    }

    let pathInfo = findPath(
      designLayout[bossHome - 1],
      designLayout[office - 1],
      designLayout
    );

    if (!pathInfo) return null;

    this.setState({
      designLayout: pathInfo.layout,
      bossPath: pathInfo.pathStack
    });
    return pathInfo.pathStack;
  }

  findPlayerPath() {
    let { playerHome, office, designLayout, playerPath } = this.state;

    for (let square of playerPath) {
      designLayout[square - 1].playerPath = false;
    }

    let pathInfo = findPlayerPath(
      designLayout[playerHome - 1],
      designLayout[office - 1],
      designLayout
    );

    if (pathInfo.pathCount === 0) return null;


    this.setState({
      designLayout: pathInfo.layout,
      playerPath: pathInfo.pathStack
    })
    // console.log(
    //   playerPathSearch(
    //     designLayout[playerHome - 1],
    //     designLayout[office - 1],
    //     designLayout
    //   )
    // );
  }

  addSquareToDesign(e, drag = false) {
    e.persist();

    let {
      selectedDesignTool,
      designLayout,
      saveStates,
      playerHome,
      bossHome,
      office,
      stoplights,
      coffees
    } = this.state;

    let squareId = Number(e.currentTarget.id);
    let currentSquare = designLayout[squareId - 1];

    switch (selectedDesignTool) {
      case "playerHome":
        // let { playerHome } = this.state;

        if (playerHome === squareId) {
          playerHome = 0;
          currentSquare.type = "block";
        } else {
          if (playerHome > 0) {
            designLayout[playerHome - 1].type = "block";
          }
          playerHome = squareId;
          currentSquare.type = "street";
          currentSquare.type = "street";
        }

        saveStates.isSaved = false;

        this.setState({ playerHome, designLayout, saveStates });
        break;
      case "bossHome":
        // let { bossHome } = this.state;

        if (bossHome === squareId) {
          bossHome = 0;
          currentSquare.type = "block";
        } else {
          if (bossHome > 0) {
            designLayout[bossHome - 1].type = "block";
          }
          bossHome = squareId;
          currentSquare.type = "street";
        }

        saveStates.isSaved = false;

        this.setState({ bossHome, designLayout, saveStates }, () => {
          if (this.state.overlayVisibility.bossOverlay) this.findBossPath();
          if (this.state.overlayVisibility.playerOverlay) this.findPlayerPath();
        });
        break;
      case "office":
        // let { office } = this.state;

        if (office === squareId) {
          office = 0;
          currentSquare.type = "block";
        } else {
          if (office > 0) {
            designLayout[office - 1].type = "block";
          }
          office = squareId;
          currentSquare.type = "street";
        }

        saveStates.isSaved = false;

        this.setState({ office, designLayout, saveStates }, () => {
          if (this.state.overlayVisibility.bossOverlay) this.findBossPath();
          if (this.state.overlayVisibility.playerOverlay) this.findPlayerPath();
        });
        break;
      case "street":
        if (
          currentSquare.stoplight ||
          currentSquare.schoolZone ||
          currentSquare.coffee
        ) {
          currentSquare.schoolZone = false;
          currentSquare.stoplight = null;
          currentSquare.coffee = false;
          delete stoplights[squareId];
        } else if (!drag && currentSquare.type === "street") {
          currentSquare.type = "block";
        } else {
          currentSquare.type = "street";
        }

        saveStates.isSaved = false;

        this.setState({ designLayout, saveStates }, () => {
          if (this.state.overlayVisibility.bossOverlay) this.findBossPath();
          if (this.state.overlayVisibility.playerOverlay) this.findPlayerPath();
        });
        break;
      case "stoplight":
        if (!drag && stoplights.hasOwnProperty(squareId)) {
          currentSquare.stoplight = null;
          delete stoplights[squareId];
          saveStates.isSaved = false;
        } else if (currentSquare.type === "street") {
          currentSquare.stoplight = "green";
          stoplights[squareId] = randomNumBtwn(4, 12) * 1000;
          saveStates.isSaved = false;
          if (currentSquare.schoolZone) currentSquare.schoolZone = false;
        }

        this.setState({ designLayout, saveStates, stoplights });
        break;
      case "schoolzone":
        if (!drag && currentSquare.schoolZone === true) {
          currentSquare.schoolZone = false;
          saveStates.isSaved = false;
        } else if (
          currentSquare.type === "street" &&
          !currentSquare.stoplight
        ) {
          currentSquare.schoolZone = true;
          saveStates.isSaved = false;
        }
        this.setState({ designLayout, saveStates });
        break;
      case "coffee":
        if (!drag && currentSquare.coffee === true) {
          currentSquare.coffee = false;
          delete coffees[currentSquare.id];
          saveStates.isSaved = false;
        } else if (
          currentSquare.type === "street" &&
          currentSquare.stoplight === null
        ) {
          currentSquare.coffee = true;
          console.log("Saving coffee");
          console.log(currentSquare.id);
          coffees[currentSquare.id] = true;
          console.log(coffees);
          console.log("Coffees in state: ", this.state.coffees);
          saveStates.isSaved = false;
        }
        this.setState({ designLayout, saveStates, coffees });
        break;
      case "eraser":
        currentSquare.type = "block";

        if (squareId === playerHome) playerHome = 0;
        else if (squareId === bossHome) bossHome = 0;
        else if (squareId === office) office = 0;

        if (currentSquare.stoplight) {
          currentSquare.stoplight = null;
          delete stoplights[squareId];
        }

        if (currentSquare.schoolZone) {
          currentSquare.schoolZone = false;
        }

        if (currentSquare.coffee) {
          currentSquare.coffee = false;
        }

        saveStates.isSaved = false;

        this.setState(
          {
            designLayout,
            playerHome,
            bossHome,
            office,
            stoplights,
            saveStates
          },
          () => {
            if (this.state.overlayVisibility.bossOverlay) this.findBossPath();
            if (this.state.overlayVisibility.playerOverlay) this.findPlayerPath();
          }
        );
        break;
      default:
        return;
    }
  }

  clearBoard() {
    let { designLayout, playerHome, bossHome, office, stoplights } = this.state;
    designLayout = designLayout.map(square => {
      square.type = "block";
      square.stoplight = null;
      square.schoolZone = false;
      return square;
    });
    playerHome = bossHome = office = 0;
    stoplights = {};
    this.setState({ designLayout, playerHome, bossHome, office, stoplights });
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
      this.props.enterPlayMode(this.state.saveStates.currentLevel);

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
        let stoplights = levelInfo.stoplights;
        let coffees = levelInfo.coffees;
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
          stoplights,
          coffees,
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
      stoplights,
      coffees,
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
      stoplights: JSON.stringify(stoplights),
      coffees: JSON.stringify(coffees),
      layout: convertLayoutToJSONString(designLayout)
    };
    console.log("Level Info coffees going to database: ", levelInfo.coffees);

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
            });
          }, 1000);
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
    let {
      playerHome,
      bossHome,
      office,
      designLayout,
      stoplights,
      coffees,
      saveStates
    } = this.state;

    let levelInfo = {
      levelId: saveStates.currentLevel,
      playerHome,
      bossHome,
      office,
      coffees: JSON.stringify(coffees),
      stoplights: JSON.stringify(stoplights),
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

  toggleOverlay(overlay) {
    let { overlayVisibility } = this.state;
    overlayVisibility[overlay] = !overlayVisibility[overlay];
    //if toggling overlay OFF, we need to erase the previous path properties from square objects
    this.setState({ overlayVisibility }, () => {
      if (this.state.overlayVisibility.bossOverlay) {
        this.findBossPath();
      }
      if (this.state.overlayVisibility.playerOverlay) {
        this.findPlayerPath();
      }
    });
  }

  clearOverlays() {
    let { overlayVisibility } = this.state;
    overlayVisibility.playerOverlay = false;
    overlayVisibility.bossOverlay = false;
    this.setState({ overlayVisibility });
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
            <h4 className="designToolboxTitle">Overlays</h4>
            <OverlaySelector
              bossOverlay={this.state.overlayVisibility.bossOverlay}
              playerOverlay={this.state.overlayVisibility.playerOverlay}
              toggleOverlay={this.toggleOverlay}
              clearOverlays={this.clearOverlays}
            />
          </div>
          <div className="designer">
            <DesignField
              inputVisible={this.state.modalVisibility.inputLevelName}
              inputValue={this.state.levelName}
              playerHome={this.state.playerHome}
              bossHome={this.state.bossHome}
              office={this.state.office}
              stoplights={this.state.stoplights}
              designLayout={this.state.designLayout}
              addSquareToDesign={this.addSquareToDesign}
              handleInputChange={this.handleInputChange}
              saveLevel={this.saveLevelToDatabase}
              toggleModal={this.toggleModal}
              enterPlayMode={this.enterPlayMode}
              exiting={this.state.saveStates.exiting}
              overlays={this.state.overlayVisibility}
            />
            <div className="overlayInfo">
              <OverlayInfo
                bossOverlay={this.state.overlayVisibility.bossOverlay}
                bossPathLength={this.state.bossPath.length}
                playerOverlay={this.state.overlayVisibility.playerOverlay}
                playerPathLength={this.state.playerPath.length}
              />
            </div>
          </div>
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
              className="btn save"
              style={{
                display: !this.state.saveStates.isSaved ? "inline-flex" : "none"
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
              className="btn save"
              style={{
                display:
                  this.state.saveStates.currentLevel &&
                  !this.state.saveStates.isSaved
                    ? "inline-flex"
                    : "none"
              }}
              onClick={() => {
                this.toggleModal("inputLevelName");
              }}
            >
              Save As New Level
            </div>
            <div className="btn mode" onClick={this.enterPlayMode}>
              Test
            </div>
            <div
              style={{
                display: this.state.playButtonVisible ? "inline-flex" : "none"
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
