import React from "react";
import DesignField from "./DesignField";
import DesignToolbox from "./DesignToolbox";

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
      office: 0
    };

    this.handleToolSelection = this.handleToolSelection.bind(this);
    this.handleBrushSelection = this.handleBrushSelection.bind(this);
    this.addSquareToDesign = this.addSquareToDesign.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.sendDesignToGame = this.sendDesignToGame.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
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
        designLayout[squareId - 1].type = "block"
      } else {
        playerHome = squareId;
        designLayout[squareId - 1].type = "street"
      }

      this.setState({ playerHome, designLayout });
    } else if (selectedDesignTool === "bossHome") {
      let { designLayout, bossHome } = this.state;

      if (bossHome === squareId) {
        bossHome = 0;
        designLayout[squareId - 1].type = "block"
      } else {
        bossHome = squareId;
        designLayout[squareId - 1].type = "street"
      }

      this.setState({ bossHome, designLayout });
    } else if (selectedDesignTool === "office") {
      let { designLayout, office } = this.state;

      if (office === squareId) {
        office = 0;
        designLayout[squareId - 1].type = "block"
      } else {
        office = squareId;
        designLayout[squareId - 1].type = "street"
      }

      this.setState({ office, designLayout });
    } else if (selectedDesignTool === "block") {
      let { designLayout } = this.state;

      if (designLayout[squareId - 1].type === "block") {
        designLayout[squareId - 1].type = "empty";
      } else {
        designLayout[squareId - 1].type = "block";
      }

      this.setState({ designLayout });
    } else if (selectedDesignTool === "street") {
      let { designLayout } = this.state;

      if (designLayout[squareId - 1].type === "street") {
        designLayout[squareId - 1].type = "empty";
      } else {
        designLayout[squareId - 1].type = "street";
      }

      this.setState({ designLayout });
    }
  }

  clearBoard() {}

  sendDesignToGame() {
    this.props.loadDesign(this.state.designLayout, this.state.playerHome, this.state.bossHome, this.state.office);
  }

  render() {
    return (
      <div className="designModule" style={{ display: this.props.display }}>
        <h3>Design Module</h3>
        <div className="designTools">
          <h4>Design Tools</h4>
          <DesignToolbox
            handleToolSelection={this.handleToolSelection}
            handleBrushSelection={this.handleBrushSelection}
            selectedDesignTool={this.state.selectedDesignTool}
            brushSize={this.state.brushSize}
          />
        </div>
        <DesignField
          playerHome={this.state.playerHome}
          bossHome={this.state.bossHome}
          office={this.state.office}
          designLayout={this.state.designLayout}
          addSquareToDesign={this.addSquareToDesign}
        />
        <div className="buttons">
          <button onClick={this.sendDesignToGame} >Load Design in Game</button>
          <button onClick={this.props.enterPlayMode}>
            Switch to Play Mode
          </button>
        </div>
      </div>
    );
  }
}
