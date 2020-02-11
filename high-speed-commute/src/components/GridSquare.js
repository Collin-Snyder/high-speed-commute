import React, { memo } from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";

class GameSquare extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      typeClass: "",
      keySquareClass: "",
      stoplightClass: "",
      centerLineClass: ""
    };
  }

  componentDidMount() {
    let keySquareClass;
    let stoplightClass;

    this.setState({
      typeClass:
        this.props.type === "block"
          ? " block"
          : this.props.type === "street"
          ? " street"
          : ""
    });

    switch (this.props.id) {
      case this.props.playerHome:
        keySquareClass = " playerHome";
        break;
      case this.props.bossHome:
        keySquareClass = " bossHome";
        break;
      case this.props.office:
        keySquareClass = " office";
        break;
      default:
        keySquareClass = "";
    }
    this.setState({ keySquareClass });

    switch (this.props.stoplight) {
      case "green":
        stoplightClass = " greenlight";
        break;
      case "yellow":
        stoplightClass = " yellowlight";
        break;
      case "red":
        stoplightClass = " redlight";
        break;
      default:
        stoplightClass = "";
    }
    this.setState({ stoplightClass });
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.setState({
        typeClass:
          this.props.type === "block"
            ? " block"
            : this.props.type === "street"
            ? " street"
            : ""
      });
    }

    if (
      this.props.playerHome !== prevProps.playerHome ||
      this.props.bossHome !== prevProps.bossHome ||
      this.props.office !== prevProps.office
    ) {
      let keySquareClass;
      switch (this.props.id) {
        case this.props.playerHome:
          keySquareClass = " playerHome";
          break;
        case this.props.bossHome:
          keySquareClass = " bossHome";
          break;
        case this.props.office:
          keySquareClass = " office";
          break;
        default:
          keySquareClass = "";
      }
      this.setState({ keySquareClass });
    }
  }

  render() {
    if (this.props.id === 41) console.log("UNNECESSARY SQAURE RERENDER");
    if (this.props.type === "block") {
      return (
        <div
          className={`gridSquare${this.state.keySquareClass} block`}
          id={this.props.id}
        >
          {this.props.tree ? (
            <span className="tree"></span>
          ) : this.props.house ? (
            <span className="house"></span>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <div
          className={`gridSquare street ${
            this.props.id === this.props.playerHome
              ? ` playerHome`
              : this.props.id === this.props.bossHome
              ? ` bossHome`
              : this.props.id === this.props.office
              ? ` office`
              : ``
          }${
            this.props.stoplight === `green`
              ? ` greenlight`
              : this.props.stoplight === `yellow`
              ? ` yellowlight`
              : this.props.stoplight === `red`
              ? ` redlight`
              : ``
          }${this.props.schoolzone ? ` schoolzone` : ``}`}
          id={this.props.id}
        >
          {this.props.playerCar ? (
            <PlayerCar />
          ) : this.props.bossCar ? (
            <BossCar />
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default GameSquare;
