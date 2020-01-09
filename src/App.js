import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";
import DesignModule from "./layoutDesigner/DesignModule";
import createSquares from "./logic/createSquares";
import createDesignBoard from "./logic/createDesignBoard";
import { getDirectionQueue } from "./logic/moveBoss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "play",
      status: "idle",
      level: 1,
      playerHome: 281,
      bossHome: 681,
      office: 520,
      playerCar: 281,
      bossCar: 681,
      bossCarPrevMove: null,
      bossCarPrevQueue: [],
      layout: [],
      designLayout: []
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayerCar = this.movePlayerCar.bind(this);
    this.startBoss = this.startBoss.bind(this);
    this.moveBossCar = this.moveBossCar.bind(this);
    this.resetPlayers = this.resetPlayers.bind(this);
    this.enterDesignMode = this.enterDesignMode.bind(this);
    this.enterPlayMode = this.enterPlayMode.bind(this);
    this.loadDesign = this.loadDesign.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    let layout = createSquares(40, 25);
    // setTimeout(() => {
    //   clearInterval(this.interval)
    // }, 8000)
    // setTimeout(() => {
    //   this.setState({ office: 3 });
    // }, 3000);
    // setTimeout(() => {
    //   this.setState({ office: 987 });
    // }, 6000);
    this.setState({ layout });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleKeyDown(e) {
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

  startBoss() {
    this.setState({ status: "active" }, () => {
      this.interval = setInterval(() => {
        this.moveBossCar();
      }, 100);
    });
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

    if (target && target.type === "street") {
      playerCar = target.id;
    }

    this.setState({ playerCar });
  }

  moveBossCar() {
    let {
      bossCar,
      bossCarPrevMove,
      bossCarPrevQueue,
      office,
      layout
    } = this.state;
    let directionQueue = getDirectionQueue(
      layout[bossCar - 1],
      layout[office - 1],
      bossCarPrevMove,
      bossCarPrevQueue
    );
    // console.log(`Direction queue at square: ${bossCar}`, directionQueue);

    while (directionQueue.length) {
      let direction = directionQueue.shift();
      if (direction) {
        let target = layout[bossCar - 1].borders[direction];

        if (target && target.type === "street") {
          bossCar = target.id;
          bossCarPrevMove = direction;
          bossCarPrevQueue = directionQueue;
          break;
        }
      }
    }

    this.setState({ bossCar, bossCarPrevMove }, () => {
      if (this.state.bossCar === this.state.office) {
        clearInterval(this.interval);
        this.setState({ status: "idle" });
      }
    });
  }

  enterDesignMode() {
    let designLayout = createDesignBoard(40, 25);
    this.setState({ mode: "design", designLayout });
  }

  enterPlayMode() {
    this.setState({ mode: "play" });
  }

  loadDesign(newLayout, newPlayerHome, newBossHome, newOffice) {
    let { layout, playerHome, bossHome, office, playerCar, bossCar } = this.state;
    layout = newLayout.slice();
    playerHome = newPlayerHome;
    playerCar = newPlayerHome;
    bossHome = newBossHome;
    bossCar = newBossHome;
    office = newOffice;
    this.setState({ layout, playerHome, bossHome, office, playerCar, bossCar });
  }

  render() {
    return (
      <div className="App">
        <GameModule
          mode={this.state.mode}
          status={this.state.status}
          playerCar={this.state.playerCar}
          playerHome={this.state.playerHome}
          bossCar={this.state.bossCar}
          bossHome={this.state.bossHome}
          office={this.state.office}
          layout={this.state.layout}
          designLayout={this.state.designLayout}
          startBoss={this.startBoss}
          resetPlayers={this.resetPlayers}
          enterDesignMode={this.enterDesignMode}
          enterPlayMode={this.enterPlayMode}
        />
        <div className="designModuleContainer">
          <DesignModule
            designLayout={this.state.designLayout}
            display={this.state.mode === "design" ? "flex" : "none"}
            enterPlayMode={this.enterPlayMode}
            loadDesign={this.loadDesign}
          />
        </div>
      </div>
    );
  }
}

export default App;
