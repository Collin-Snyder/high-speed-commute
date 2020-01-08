import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";
import createSquares from "./logic/createSquares";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      playerHome: 281,
      bossHome: 681,
      office: 520,
      playerCar: 281,
      bossCar: 681,
      layout: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayerCar = this.movePlayerCar.bind(this);
    this.resetPlayers = this.resetPlayers.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    let layout = createSquares(40, 25);
    this.setState({ layout });
  }

  handleKeyDown(e) {
    console.log("Keydown Event Triggered: ", e.keyCode);
    if (
      this.state.playerCar !== this.state.office &&
      this.state.bossCar !== this.state.office
    ) {
      if (e.keyCode === 37) {
        this.movePlayerCar("left");
      } else if (e.keyCode === 38) {
        this.movePlayerCar("up");
      } else if (e.keyCode === 39) {
        this.movePlayerCar("right");
      } else if (e.keyCode === 40) {
        this.movePlayerCar("down");
      }
    }
  }

  resetPlayers() {
    let { playerCar, playerHome, bossCar, bossHome } = this.state;

    playerCar = playerHome;
    bossCar = bossHome;

    this.setState({ playerCar, bossCar });
  }

  movePlayerCar(direction) {
    let { playerCar, layout } = this.state;
    let target = layout[playerCar - 1].borders[direction];
    if (target) {
      playerCar = target.id;
    }
    this.setState({ playerCar });
  }

  render() {
    return (
      <div className="App">
        <GameModule
          playerCar={this.state.playerCar}
          bossCar={this.state.bossCar}
          office={this.state.office}
          layout={this.state.layout}
          resetPlayers={this.resetPlayers}
        />
      </div>
    );
  }
}

export default App;
