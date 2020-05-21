import React from "react";

import Coffee from "../components/Coffee";
import OverlayPathTile from "./OverlayPathTile";
import Tile from "../components/Tile";

class DesignSquare extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      typeClass: "",
      keySquareClass: "",
      stoplightClass: "",
      schoolZoneClass: ""
    };

    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    this.setState({
      typeClass:
        this.props.type === "block"
          ? " block"
          : this.props.type === "street"
          ? " dstreet"
          : ""
    });
  }

  componentDidUpdate(prevProps) {

    if (prevProps.type !== this.props.type) {
      this.setState(
        {
          typeClass:
            this.props.type === "block"
              ? " block"
              : this.props.type === "street"
              ? " dstreet"
              : ""
        },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (prevProps.stoplight !== this.props.stoplight) {
      this.setState(
        { stoplightClass: this.props.stoplight ? " greenlight" : "" },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (prevProps.schoolzone !== this.props.schoolzone) {
      this.setState(
        { schoolZoneClass: this.props.schoolzone ? " schoolzone" : "" },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (
      this.props.playerHome !== prevProps.playerHome ||
      this.props.bossHome !== prevProps.bossHome ||
      this.props.office !== prevProps.office
    ) {
      let keySquareClass;
      switch (this.props.id) {
        case this.props.playerHome:
          keySquareClass = " dplayerHome";
          break;
        case this.props.bossHome:
          keySquareClass = " dbossHome";
          break;
        case this.props.office:
          keySquareClass = " doffice";
          break;
        default:
          keySquareClass = "";
      }
      this.setState({ keySquareClass }, () => {
        this.forceUpdate();
      });
    }
  }

  handleDrag(e) {
    e.dataTransfer.setDragImage(document.getElementById("dragImage"), 0, 0);
  }

  render() {
    return (
      <div
        className={`designSquare${this.state.typeClass}${this.state.keySquareClass}${this.state.schoolZoneClass}`}
        id={this.props.squareInfo.id}
        onClick={e => {
          this.props.addSquareToDesign(e);
        }}
        draggable
        onDragStart={this.handleDrag}
        onDragEnter={e => {
          this.props.addSquareToDesign(e, true);
        }}
      >
        {this.props.id}
        {this.props.coffee ? <Coffee /> : <></>}
        {this.props.bossOverlay &&
        this.props.isBossPath &&
        this.props.id !== this.props.office ? (
          <OverlayPathTile path="boss" />
        ) : (
          <></>
        )}
        {this.props.playerOverlay &&
        this.props.isPlayerPath &&
        this.props.id !== this.props.office ? (
          <OverlayPathTile path="player" />
        ) : (
          <></>
        )}
        {this.props.stoplight ? <Stoplight color={this.props.stoplight} /> : <></>}
      </div>
    );
  }
}

export default DesignSquare;
