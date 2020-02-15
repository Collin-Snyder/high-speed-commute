import React, { memo } from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";
import Coffee from "./Coffee";
import Stoplight from "./Stoplight";

class GameSquare extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      typeClass: "",
      keySquareClass: "",
      centerLineClass: "",
      schoolZoneShadows: ""
    };
  }

  componentDidMount() {
    let keySquareClass;
    let schoolZoneClass = "";

    this.setState({
      typeClass:
        this.props.type === "block"
          ? " block"
          : this.props.type === "street"
          ? " street"
          : ""
    });

    // if (this.props.schoolzone) {
    //   if (this.props.borders.up === null) schoolZoneClass += " szup";
    //   if (this.props.borders.down === null) schoolZoneClass += " szdown";
    //   if (this.props.borders.left === null) schoolZoneClass += " szleft";
    //   if (this.props.borders.right === null) schoolZoneClass += " szright";
    //   this.setState({ schoolZoneClass });
    // }

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

    // let schoolZoneShadows = [];

    // if (
    //   this.props.schoolzone !== prevProps.schoolzone &&
    //   this.props.schoolzone
    // ) {
    //   // if (this.props.borders.up && this.props.borders.up.type === "block")
    //   //   schoolZoneShadows.push("0px 5px #ffd300 inset");
    //   // if (this.props.borders.down && this.props.borders.down.type === "block")
    //   //   schoolZoneShadows.push("0px -5px #ffd300 inset");
    //   // if (this.props.borders.left && this.props.borders.left.type === "block")
    //   //   schoolZoneShadows.push("5px 0px #ffd300 inset");
    //   // if (this.props.borders.right && this.props.borders.right.type === "block")
    //   //   schoolZoneShadows.push("-5px 0px #ffd300 inset");
    //   if (this.props.borders.up && this.props.borders.up.schoolZone === false)
    //     schoolZoneShadows.push("0px 5px #ffd300 inset");
    //   if (this.props.borders.down && this.props.borders.down.schoolZone === false)
    //     schoolZoneShadows.push("0px -5px #ffd300 inset");
    //   if (this.props.borders.left && this.props.borders.left.schoolZone === false)
    //     schoolZoneShadows.push("5px 0px #ffd300 inset");
    //   if (this.props.borders.right && this.props.borders.right.schoolZone === false)
    //     schoolZoneShadows.push("-5px 0px #ffd300 inset");
    //   let shadows = schoolZoneShadows.join(", ");
    //   this.setState({ schoolZoneShadows }, () => {
    //     this.forceUpdate();
    //   });
    // }

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
          }${this.props.schoolzone ? ` schoolzone` : ``}`}
          id={this.props.id}
          style={{ "box-shadow": this.state.schoolZoneShadows }}
        >
          {this.props.stoplight ? <Stoplight color={this.props.stoplight} /> : <></>}
          {this.props.playerCar ? (
            <PlayerCar />
          ) : this.props.bossCar ? (
            <BossCar />
          ) : (
            ""
          )}
          {this.props.coffee ? <Coffee /> : ""}
        </div>
      );
    }
  }
}

export default GameSquare;
