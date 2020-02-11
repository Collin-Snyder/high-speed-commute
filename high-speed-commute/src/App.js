import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";
import DesignModule from "./layoutDesigner/DesignModule";
import BossErrorModal from "./components/BossErrorModal";
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
      stoplights: {},
      playerCar: 281,
      bossCar: 681,
      layout: [],
      designLayout: [],
      userLevels: [],
      collision: false,
      bossError: false
    };

    this.stoplightIntervals = {};

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
    this.deleteLevel = this.deleteLevel.bind(this);
    this.getUserLevels = this.getUserLevels.bind(this);
    this.fullReset = this.fullReset.bind(this);
    this.closeBossModal = this.closeBossModal.bind(this);
    this.cycleStoplight = this.cycleStoplight.bind(this);
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
    for (let interval in this.stoplightIntervals) {
      clearInterval(this.stoplightIntervals[interval]);
    }
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
    if (!pathStack) {
      console.log(
        "There is no possible path for the Boss to reach the goal. Make changes to your level and try again."
      );
      this.setState({ bossError: true });
      return;
    }
    this.setState({ status: "active" }, () => {
      for (let stoplight in this.state.stoplights) {
        setTimeout(() => {
          this.cycleStoplight(stoplight);
          this.stoplightIntervals[stoplight] = setInterval(() => {
            this.cycleStoplight(stoplight);
          }, this.state.stoplights[stoplight] + 7000);
        }, this.state.stoplights[stoplight]);
      }

      this.interval = setInterval(() => {
        let nextMove = pathStack.pop();
        if (nextMove) {
          if (this.state.layout[nextMove - 1].stoplight === "red") {
            pathStack.push(nextMove);
          } else {
            this.moveBossCar(nextMove);
          }
        }
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

    if (target && target.type === "street" && target.stoplight !== "red") {
      layout[playerCar - 1].playerCar = false;
      playerCar = target.id;
      layout[playerCar - 1].playerCar = true;
      if (playerCar === bossCar) {
        collision = true;
        clearInterval(this.interval);
        for (let interval in this.stoplightIntervals) {
          clearInterval(this.stoplightIntervals[interval]);
        }
      }
      if (playerCar === this.state.office) {
        clearInterval(this.interval);
        for (let interval in this.stoplightIntervals) {
          clearInterval(this.stoplightIntervals[interval]);
        }
      }
    }

    this.setState({ playerCar, layout, collision });
  }

  findBossPath() {
    let { bossHome, office, layout } = this.state;

    let pathInfo = findPath(layout[bossHome - 1], layout[office - 1], layout);

    if (!pathInfo) return null;

    this.setState({ layout: pathInfo.layout });
    return pathInfo.pathStack;
  }

  moveBossCar(nextMove) {
    let {bossCar, layout} = this.state;
    layout[bossCar - 1].bossCar = false;
    bossCar = nextMove;
    layout[bossCar - 1].bossCar = true;
    this.setState({ bossCar: nextMove, layout }, () => {
      if (this.state.bossCar === this.state.office) {
        clearInterval(this.interval);
        for (let interval in this.stoplightIntervals) {
          clearInterval(this.stoplightIntervals[interval]);
        }
        this.setState({ status: "idle" });
      } else if (this.state.bossCar === this.state.playerCar) {
        clearInterval(this.interval);
        for (let interval in this.stoplightIntervals) {
          clearInterval(this.stoplightIntervals[interval]);
        }
        this.setState({ collision: true });
      }
    });
  }

  cycleStoplight(squareId) {
    let { layout } = this.state;
    layout[squareId - 1].stoplight = "yellow";
    this.setState({ layout });
    setTimeout(() => {
      let { layout } = this.state;
      layout[squareId - 1].stoplight = "red";
      this.setState({ layout });
    }, 2000);
    setTimeout(() => {
      let { layout } = this.state;
      layout[squareId - 1].stoplight = "green";
      this.setState({ layout });
    }, 7000);
  }

  closeBossModal() {
    this.setState({ bossError: false });
  }

  enterDesignMode() {
    clearInterval(this.interval);
    for (let interval in this.stoplightIntervals) {
      clearInterval(this.stoplightIntervals[interval]);
    }
    let designLayout = createDesignBoard(40, 25);
    if (
      !designLayout[0].borders.hasOwnProperty("up") ||
      !designLayout[0].borders.hasOwnProperty("down") ||
      !designLayout[0].borders.hasOwnProperty("right") ||
      !designLayout[0].borders.hasOwnProperty("left")
    ) {
      console.log("BORDER ERROR ALERT IN APP - enterDesignMode");
    }
    this.setState(
      { mode: "design", designLayout, status: "idle", stoplights: {} },
      () => {
        this.resetPlayers();
      }
    );
  }

  enterPlayMode(levelId) {
    this.loadLevel(levelId);
    this.setState({ mode: "play", status: "idle" }, () => {
      this.getUserLevels("collin");
    });
  }

  loadDesign(levelId) {
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
        let stoplights = levelInfo.stoplights;
        let unformattedLayout = levelInfo.layout;

        let uglyLayout = formatLayout(unformattedLayout);
        let layout = prettify(uglyLayout);

        layout[playerHome - 1].playerCar = true;
        layout[bossHome - 1].bossCar = true;

        this.setState(
          {
            levelName,
            boardHeight,
            boardWidth,
            playerHome,
            playerCar,
            bossHome,
            bossCar,
            office,
            layout,
            stoplights,
            designLayout: layout
          },
          () => {
            this.fullReset();
          }
        );
      })
      .catch(err => console.error(err));
  }

  deleteLevel(levelId) {
    axios
      .delete(`/api/levels`, { data: { levelId } })
      .then(result => {
        console.log(result);
        this.getUserLevels("collin");
        this.loadLevel(13);
      })
      .catch(err => console.log(err));
  }

  getUserLevels(username) {
    axios
      .get(`/api/userlevels/${username}`)
      .then(data => {
        this.setState({ userLevels: data.data.rows });
      })
      .catch(err => console.error(err));
  }

  fullReset() {
    clearInterval(this.interval);
    for (let interval in this.stoplightIntervals) {
      clearInterval(this.stoplightIntervals[interval]);
    }
    let {
      mode,
      status,
      playerCar,
      playerHome,
      bossCar,
      bossHome,
      collision,
      layout
    } = this.state;

    mode = "play";
    status = "idle";
    layout[playerCar - 1].playerCar = false;
    layout[bossCar - 1].bossCar = false;
    playerCar = playerHome;
    bossCar = bossHome;
    layout[playerCar - 1].playerCar = true;
    layout[bossCar - 1].bossCar = true;
    collision = false;

    this.setState({ mode, status, playerCar, bossCar, collision, layout });
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
          deleteLevel={this.deleteLevel}
        />
        <div className="designModuleContainer">
          <DesignModule
            designLayout={this.state.designLayout}
            stoplights={this.state.stoplights}
            display={this.state.mode === "design" ? "flex" : "none"}
            enterPlayMode={this.enterPlayMode}
            loadDesign={this.loadDesign}
            userLevels={this.state.userLevels}
          />
        </div>
        <div
          className="modal"
          style={{ display: this.state.bossError ? "block" : "none" }}
        >
          <BossErrorModal closeBossModal={this.closeBossModal} />
        </div>
      </div>
    );
  }
}

export default App;
