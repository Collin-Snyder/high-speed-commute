import React from "react";
import axios from "axios";
import DesignField from "./DesignField";
import DesignToolbox from "./DesignToolbox";
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
      levelName: "",
      inputVisible: false,
      playButtonVisible: false,
      lastSavedLevel: null
    };

    this.handleToolSelection = this.handleToolSelection.bind(this);
    this.handleBrushSelection = this.handleBrushSelection.bind(this);
    this.addSquareToDesign = this.addSquareToDesign.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.sendDesignToGame = this.sendDesignToGame.bind(this);
    this.saveLevelToDatabase = this.saveLevelToDatabase.bind(this);
    this.loadSavedDesign = this.loadSavedDesign.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
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

  addSquareToDesign(e) {
    e.persist();

    let { selectedDesignTool } = this.state;
    let squareId = Number(e.currentTarget.id);

    if (selectedDesignTool === "playerHome") {
      let { designLayout, playerHome } = this.state;

      if (playerHome === squareId) {
        playerHome = 0;
        designLayout[squareId - 1].type = "block";
      } else {
        playerHome = squareId;
        designLayout[squareId - 1].type = "street";
      }

      this.setState({ playerHome, designLayout });
    } else if (selectedDesignTool === "bossHome") {
      let { designLayout, bossHome } = this.state;

      if (bossHome === squareId) {
        bossHome = 0;
        designLayout[squareId - 1].type = "block";
      } else {
        bossHome = squareId;
        designLayout[squareId - 1].type = "street";
      }

      this.setState({ bossHome, designLayout });
    } else if (selectedDesignTool === "office") {
      let { designLayout, office } = this.state;

      if (office === squareId) {
        office = 0;
        designLayout[squareId - 1].type = "block";
      } else {
        office = squareId;
        designLayout[squareId - 1].type = "street";
      }

      this.setState({ office, designLayout });
    } else if (selectedDesignTool === "eraser") {
      let { designLayout, playerHome, bossHome, office } = this.state;

      designLayout[squareId - 1].type = "block";

      if (squareId === playerHome) playerHome = 0;
      else if (squareId === bossHome) bossHome = 0;
      else if (squareId === office) office = 0;

      this.setState({ designLayout, playerHome, bossHome, office });
    } else if (selectedDesignTool === "street") {
      let { designLayout } = this.state;

      if (designLayout[squareId - 1].type === "street") {
        designLayout[squareId - 1].type = "block";
      } else {
        designLayout[squareId - 1].type = "street";
      }

      this.setState({ designLayout });
    }
  }

  clearBoard() {}

  sendDesignToGame() {
    this.props.loadDesign(
      this.state.lastSavedLevel,
      this.state.designLayout,
      this.state.playerHome,
      this.state.bossHome,
      this.state.office
    );
    this.setState({ playButtonVisible: false });
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

        this.setState({
          levelName,
          boardHeight,
          boardWidth,
          playerHome,
          playerCar,
          bossHome,
          bossCar,
          office,
          designLayout
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
      designLayout
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

    console.log(
      "Layout inside saveLevel function in Design Module: ",
      levelInfo.layout
    );

    axios
      .post("/api/levels", levelInfo)
      .then(res => {
        this.setState({ lastSavedLevel: res.data.rows[0].id });
      })
      .catch(err => {
        console.log("There was a problem saving your level.");
        console.error(err);
      });
  }

  toggleInput() {
    let { inputVisible, playButtonVisible, levelName } = this.state;

    if (inputVisible) {
      playButtonVisible = true;
      levelName = "";
    }

    this.setState({ inputVisible: !inputVisible, playButtonVisible, levelName });
  }

  handleInputChange(e) {
    this.setState({ levelName: e.target.value });
  }

  render() {
    return (
      <div className="designModule" style={{ display: this.props.display }}>
        {/* <h3 className="designModuleTitle">Design Mode</h3> */}
        <div className="designTools">
          <h4 className="designToolboxTitle">Design Tools</h4>
          <DesignToolbox
            handleToolSelection={this.handleToolSelection}
            handleBrushSelection={this.handleBrushSelection}
            loadSavedDesign={this.loadSavedDesign}
            selectedDesignTool={this.state.selectedDesignTool}
            brushSize={this.state.brushSize}
          />
        </div>
        <DesignField
          inputVisible={this.state.inputVisible}
          inputValue={this.state.levelName}
          playerHome={this.state.playerHome}
          bossHome={this.state.bossHome}
          office={this.state.office}
          designLayout={this.state.designLayout}
          addSquareToDesign={this.addSquareToDesign}
          handleInputChange={this.handleInputChange}
          saveLevel={this.saveLevelToDatabase}
          toggleInput={this.toggleInput}
        />
        <div className="buttons design">
          <button className="btn save design" onClick={this.toggleInput}>
            Save Level
          </button>
          <button
            style={{
              display: this.state.playButtonVisible ? "inline-block" : "none"
            }}
            className="btn play design"
            onClick={this.sendDesignToGame}
          >
            Play Now!
          </button>
          {/* <button
            className="btn mode design"
            onClick={this.props.enterPlayMode}
          >
            Switch to Play Mode
          </button> */}
        </div>
      </div>
    );
  }
}
