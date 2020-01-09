import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";
import DesignModule from "./layoutDesigner/DesignModule";
import createSquares from "./logic/createSquares";
import createDesignBoard from "./logic/createDesignBoard";
import { findPath } from "./logic/moveBoss";
import { formatLayout } from "./levelHandling/JSONconverters";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "play",
      status: "idle",
      levelName: 1,
      playerHome: 281,
      bossHome: 681,
      office: 520,
      playerCar: 281,
      bossCar: 681,
      layout: [],
      designLayout: []
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayerCar = this.movePlayerCar.bind(this);
    this.startBoss = this.startBoss.bind(this);
    this.findBossPath = this.findBossPath.bind(this);
    this.moveBossCar = this.moveBossCar.bind(this);
    this.resetPlayers = this.resetPlayers.bind(this);
    this.enterDesignMode = this.enterDesignMode.bind(this);
    this.enterPlayMode = this.enterPlayMode.bind(this);
    this.loadDesign = this.loadDesign.bind(this);
    this.loadLevel = this.loadLevel.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    // let layout = createSquares(40, 25);
    this.loadLevel(13);
    // this.setState({ layout });
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
    let pathStack = this.findBossPath();
    this.setState({ status: "active" }, () => {
      this.interval = setInterval(() => {
        let nextMove = pathStack.pop();
        if (nextMove) this.moveBossCar(nextMove);
      }, 300);
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

  findBossPath() {
    let { bossHome, office, layout } = this.state;

    let pathInfo = findPath(layout[bossHome - 1], layout[office - 1], layout);

    this.setState({ layout: pathInfo.layout });
    return pathInfo.pathStack;
  }

  moveBossCar(nextMove) {
    // let {
    //   bossCar,
    //   bossCarPrevMove,
    //   bossCarPrevQueue,
    //   office,
    //   layout
    // } = this.state;
    // let directionQueue = getDirectionQueue(
    //   layout[bossCar - 1],
    //   layout[office - 1],
    //   bossCarPrevMove,
    //   bossCarPrevQueue
    // );
    // // console.log(`Direction queue at square: ${bossCar}`, directionQueue);
    // while (directionQueue.length) {
    //   let direction = directionQueue.shift();
    //   if (direction) {
    //     let target = layout[bossCar - 1].borders[direction];
    //     if (target && target.type === "street") {
    //       bossCar = target.id;
    //       bossCarPrevMove = direction;
    //       bossCarPrevQueue = directionQueue;
    //       break;
    //     }
    //   }
    // }
    this.setState({ bossCar: nextMove }, () => {
      if (this.state.bossCar === this.state.office) {
        clearInterval(this.interval);
        this.setState({ status: "idle" });
      }
    });
  }

  enterDesignMode() {
    clearInterval(this.interval);
    let designLayout = createDesignBoard(40, 25);
    this.setState({ mode: "design", designLayout, status: "idle" }, () => {
      this.resetPlayers();
    });
  }

  enterPlayMode() {
    this.setState({ mode: "play" });
  }

  loadDesign(newLayout, newPlayerHome, newBossHome, newOffice) {
    let {
      layout,
      playerHome,
      bossHome,
      office,
      playerCar,
      bossCar
    } = this.state;
    layout = newLayout.slice();
    playerHome = newPlayerHome;
    playerCar = newPlayerHome;
    bossHome = newBossHome;
    bossCar = newBossHome;
    office = newOffice;
    this.setState({ layout, playerHome, bossHome, office, playerCar, bossCar });
  }

  loadLevel(levelId) {
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

        let layout = formatLayout(unformattedLayout);

        this.setState({
          levelName,
          boardHeight,
          boardWidth,
          playerHome,
          playerCar,
          bossHome,
          bossCar,
          office,
          layout
        });
      })
      .catch(err => console.error(err));
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
