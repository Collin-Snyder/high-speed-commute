import React from "react";
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
        this.props.squareInfo.type === "block"
          ? " block"
          : this.props.squareInfo.type === "street"
          ? " street"
          : ""
    });

    switch (this.props.squareInfo.id) {
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

    switch (this.props.squareInfo.stoplight) {
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

  shouldComponentUpdate(nextProps) {
    if (
      this.props.squareInfo.type != nextProps.squareInfo.type ||
      this.props.playerHome != nextProps.playerHome ||
      this.props.bossHome != nextProps.bossHome ||
      this.props.office != nextProps.office ||
      this.props.squareInfo.bossCar != nextProps.bossCar ||
      this.props.squareInfo.playerCar != nextProps.playerCar ||
      this.props.squareInfo.stoplight != nextProps.squareInfo.stoplight
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.squareInfo.type !== prevProps.squareInfo.type) {
      this.setState({
        typeClass:
          this.props.squareInfo.type === "block"
            ? " block"
            : this.props.squareInfo.type === "street"
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
      switch (this.props.squareInfo.id) {
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

    // if (this.props.squareInfo.stoplight !== prevProps.stoplight) {
    //   let stoplightClass;
    //   switch (this.props.squareInfo.stoplight) {
    //     case "green":
    //       stoplightClass = " greenlight";
    //       break;
    //     case "yellow":
    //       stoplightClass = " yellowlight";
    //       break;
    //     case "red":
    //       stoplightClass = " redlight";
    //       break;
    //     default:
    //       stoplightClass = "";
    //   }
    //   setTimeout(() => {this.setState({ stoplightClass })}, 0)
    //   // this.setState({ stoplightClass });
    // }
  }

  render() {
    if (this.props.squareInfo.type === "block") {
      return (
        <div
          className={`gridSquare${this.state.keySquareClass}${this.state.typeClass}`}
          id={this.props.squareInfo.id}
        >
          {this.props.squareInfo["tree"] ? (
            <span className="tree"></span>
          ) : this.props.squareInfo["house"] ? (
            <span className="house"></span>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <div
          className={`gridSquare${this.state.keySquareClass}${this.props.squareInfo.stoplight === "green" ? " greenlight" : this.props.squareInfo.stoplight === "yellow" ? " yellowlight" : this.props.squareInfo.stoplight === "red" ? " redlight" : ""}${this.state.typeClass}`}
          id={this.props.squareInfo.id}
        >
          {this.props.squareInfo.playerCar ? (
            <PlayerCar />
          ) : this.props.squareInfo.bossCar ? (
            <BossCar />
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

// const GridSquare = ({
//   squareInfo,
//   playerCar,
//   playerHome,
//   bossCar,
//   bossHome,
//   office
// }) => {
//   let typeClass = "";
//   let keySquareClass = "";
//   let stoplightClass = "";
//   let centerLineClass = "";
//   // let pathClass = "";
//   let classList;

//   typeClass =
//     squareInfo.type === "block"
//       ? " block"
//       : squareInfo.type === "street"
//       ? " street"
//       : "";

//   switch (squareInfo.id) {
//     case playerHome:
//       keySquareClass = " playerHome";
//       break;
//     case bossHome:
//       keySquareClass = " bossHome";
//       break;
//     case office:
//       keySquareClass = " office";
//       break;
//     default:
//       keySquareClass = "";
//   }

//   switch (squareInfo.stoplight) {
//     case "green":
//       stoplightClass = " greenlight";
//       break;
//     case "yellow":
//       stoplightClass = " yellowlight";
//       break;
//     case "red":
//       stoplightClass = " redlight";
//       break;
//     default:
//       stoplightClass = "";
//   }

//   // if (squareInfo.pathOption || squareInfo.finalPath) {
//   //   if (squareInfo.finalPath) {
//   //     pathClass = " finalPath";
//   //   } else {
//   //     pathClass = " pathOption";
//   //   }
//   // }

//   classList = typeClass + keySquareClass + centerLineClass + stoplightClass;
//   if (squareInfo.type === "block") {
//     return (
//       <div className={`gridSquare${classList}`} id={squareInfo.id}>
//         {squareInfo["tree"] ? (
//           <span className="tree"></span>
//         ) : squareInfo["house"] ? (
//           <span className="house"></span>
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div className={`gridSquare${classList}`} id={squareInfo.id}>
//         {playerCar === squareInfo.id ? (
//           <PlayerCar />
//         ) : bossCar === squareInfo.id ? (
//           <BossCar />
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   }
// };

export default GameSquare;
