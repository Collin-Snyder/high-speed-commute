import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";
import DesignModule from "./layoutDesigner/DesignModule";
import createSquares from "./logic/createSquares";
import createDesignBoard from "./logic/createDesignBoard";
import { findPath } from "./logic/moveBoss";
import { prettify } from "./logic/prettify";
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
      designLayout: [],
      userLevels: [],
      collision: false
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayerCar = this.movePlayerCar.bind(this);
    this.startBoss = this.startBoss.bind(this);
    this.findBossPath = this.findBossPath.bind(this);
    this.moveBossCar = this.moveBossCar.bind(this);
    this.resetPlayers = this.resetPlayers.bind(this);
    this.enterDesignMode = this.enterDesignMode.bind(this);
    this.loadDesign = this.loadDesign.bind(this);
    this.loadLevel = this.loadLevel.bind(this);
    this.getUserLevels = this.getUserLevels.bind(this);
    this.fullReset = this.fullReset.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    // let layout = createSquares(40, 25);
    this.loadLevel(13);
    this.getUserLevels("collin");
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
    let { playerCar, bossCar, collision, layout } = this.state;
    let target = layout[playerCar - 1].borders[direction];

    if (target && target.type === "street") {
      playerCar = target.id;
      if (playerCar === bossCar) {
        collision = true;
      }
      if (playerCar === this.state.office) {
        clearInterval(this.interval);
      }
    }

    this.setState({ playerCar, collision });
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
      } else if (this.state.bossCar === this.state.playerCar) {
        clearInterval(this.interval);
        this.setState({ collision: true });
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

  loadDesign( levelId) {
    this.loadLevel(levelId);
    this.getUserLevels("collin");
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

        let uglyLayout = formatLayout(unformattedLayout);
        let layout = prettify(uglyLayout);

        this.setState({
          levelName,
          boardHeight,
          boardWidth,
          playerHome,
          playerCar,
          bossHome,
          bossCar,
          office,
          layout,
          designLayout: layout
        }, () => {this.fullReset()});
      })
      .catch(err => console.error(err));
  }

  getUserLevels(username) {
    axios
      .get(`/api/userlevels/${username}`)
      .then(data => {
        console.log(data.data.rows[0]);
        this.setState({ userLevels: data.data.rows });
      })
      .catch(err => console.error(err));
  }

  fullReset() {
    let {
      mode,
      status,
      playerCar,
      playerHome,
      bossCar,
      bossHome,
      collision
    } = this.state;

    mode = "play";
    status = "idle";
    playerCar = playerHome;
    bossCar = bossHome;
    collision = false;

    this.setState({ mode, status, playerCar, bossCar, collision });
  }

  render() {
    return (
      <div className="App">
        <div className="appHeader">
          <h1 className="gameTitle">HIGH SPEED COMMUTE</h1>
        </div>
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
          userLevels={this.state.userLevels}
          collision={this.state.collision}
          startBoss={this.startBoss}
          resetPlayers={this.resetPlayers}
          fullReset={this.fullReset}
          enterDesignMode={this.enterDesignMode}
          loadLevel={this.loadLevel}
        />
        <div className="designModuleContainer">
          <DesignModule
            designLayout={this.state.designLayout}
            display={this.state.mode === "design" ? "flex" : "none"}
            enterPlayMode={this.enterPlayMode}
            loadDesign={this.loadDesign}
            userLevels={this.state.userLevels}
          />
        </div>
      </div>
    );
  }
}

export default App;
