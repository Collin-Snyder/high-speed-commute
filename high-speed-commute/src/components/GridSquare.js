import React from "react";
import PlayerCar from "./PlayerCar";
import BossCar from "./BossCar";
import Coffee from "./Coffee";
import Stoplight from "./Stoplight";
import PlayerHomeTile from "./PlayerHomeTile";
import BossHomeTile from "./BossHomeTile";
import OfficeTile from "./OfficeTile";

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
    this.setState({
      typeClass:
        this.props.type === "block"
          ? " block"
          : this.props.type === "street"
          ? " street"
          : ""
    });

    if (
      this.props.id === this.props.playerHome ||
      this.props.id === this.props.bossHome ||
      this.props.id === this.props.office
    ) {
      this.setState({ keySquareClass: " keySquare" });
    }
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
      this.setState({ keySquareClass: " keySquare" });
    }
  }

  render() {
    if (this.props.type === "block") {
      return (
        <div
          className={`gridSquare${this.state.typeClass}`}
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
            this.props.id === this.props.playerHome ||
            this.props.id === this.props.bossHome ||
            this.props.id === this.props.office
              ? ` keySquare`
              : ``
          }${this.props.schoolzone ? ` schoolzone` : ``}`}
          id={this.props.id}
        >
          {this.props.id === this.props.playerHome ? (
            <PlayerHomeTile color={this.props.playerColor} />
          ) : this.props.id === this.props.bossHome ? (
            <BossHomeTile />
          ) : this.props.id === this.props.office ? (
            <OfficeTile />
          ) : (
            <></>
          )}
          {this.props.stoplight ? (
            <Stoplight color={this.props.stoplight} />
          ) : (
            <></>
          )}
          {this.props.playerCar ? (
            <PlayerCar />
          ) : this.props.bossCar ? (
            <BossCar />
          ) : (
            <></>
          )}
          {this.props.coffee ? <Coffee /> : ""}
        </div>
      );
    }
  }
}

export default GameSquare;
