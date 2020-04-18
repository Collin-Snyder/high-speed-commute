import React from "react";
import Tile from "./Tile";

class GameSquare extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      typeClass: "",
      keySquareClass: "",
    };
  }

  componentDidMount() {
    this.setState({
      typeClass:
        this.props.type === "block"
          ? " block"
          : this.props.type === "street"
          ? " street"
          : "",
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
            : "",
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
        <div className={`gridSquare${this.state.typeClass}`} id={this.props.id}>
          {this.props.tree ? (
            <Tile type="tree"/>
          ) : this.props.house ? (
            <Tile type="house"/>
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
          }
          
          `}
          id={this.props.id}
        >
          {this.props.schoolzone ? <Tile type="schoolZone"/> : <></>}
          {this.props.id === this.props.playerHome ? (
            <Tile type="playerHome" color={this.props.playerColor} />
          ) : this.props.id === this.props.bossHome ? (
            <Tile type="bossHome" />
          ) : this.props.id === this.props.office ? (
            <Tile type="office" />
          ) : (
            <></>
          )}
          {this.props.stoplight ? (
            <Tile type="stoplight" color={this.props.stoplight} />
          ) : (
            <></>
          )}
          {this.props.playerCar ? (
            <Tile type="playerCar" />
          ) : this.props.bossCar ? (
            <Tile type="bossCar" />
          ) : (
            <></>
          )}
          {this.props.coffee ? <Tile type="coffee" /> : <></>}
        </div>
      );
    }
  }
}

export default GameSquare;
