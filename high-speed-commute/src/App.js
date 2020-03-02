import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";
import DesignModule from "./layoutDesigner/DesignModule";
import BossErrorModal from "./components/BossErrorModal";
import IntroModal from "./components/IntroModal";
import createDesignBoard from "./logic/createDesignBoard";
import { findPath } from "./logic/moveBoss";
import { prettify } from "./logic/prettify";
import { formatLayout } from "./levelHandling/JSONconverters";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "intro",
      status: "idle",
      user: "collin",
      loginInputs: {
        newUsername: "",
        existingUsername: ""
      },
      levelName: 1,
      playerHome: 281,
      bossHome: 681,
      office: 520,
      stoplights: {},
      coffees: {},
      playerCar: 281,
      playerColor: "blue",
      bossCar: 681,
      layout: [],
      designLayout: [],
      defaultLevels: [],
      userLevels: [],
      defaultLevelsVisible: false,
      userLevelsVisible: false,
      playerDirection: null,
      playerInterval: 275,
      caffeineCount: 0,
      playerMovable: true,
      bossMovable: true,
      schoolZoneState: {
        playerInSchoolZone: false,
        bossInSchoolZone: false,
        schoolZoneInterval: 1000
      },
      difficulty: "medium",
      difficultyIntervals: {
        easy: 500,
        medium: 350,
        hard: 250
      },
      collision: false,
      bossError: false,
      errors: {
        existingUsernameError: false,
        newUsernameError: false
      }
    };

    this.stoplightIntervals = {};

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.movePlayerCar = this.movePlayerCar.bind(this);
    this.startRace = this.startRace.bind(this);
    this.startBoss = this.startBoss.bind(this);
    this.startPlayer = this.startPlayer.bind(this);
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
    this.enterSchoolZone = this.enterSchoolZone.bind(this);
    this.exitSchoolZone = this.exitSchoolZone.bind(this);
    this.caffeinate = this.caffeinate.bind(this);
    this.decaffeinate = this.decaffeinate.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.submitExistingUsername = this.submitExistingUsername.bind(this);
    this.submitNewUsername = this.submitNewUsername.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.toggleLevelVisibility = this.toggleLevelVisibility.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    clearInterval(this.bossInterval);
    clearInterval(this.playerInterval);
    for (let interval in this.stoplightIntervals) {
      clearInterval(this.stoplightIntervals[interval]);
    }
  }

  submitExistingUsername(e) {
    axios
      .get(`/api/users/${this.state.loginInputs.existingUsername}`)
      .then(result => {
        if (!result.data) {
          let errors = { ...this.state.errors };
          errors.existingUsernameError = true;
          this.setState({ errors });
        } else {
          let errors = { ...this.state.errors };
          let loginInputs = { ...this.state.loginInputs };
          let { user } = this.state;
          user = result.data;
          loginInputs.existingUsername = "";
          loginInputs.newUsername = "";
          errors.newUsernameError = false;
          errors.existingUsernameError = false;
          this.setState({ mode: "play", errors, loginInputs, user }, () => {
            this.getUserLevels(user);
          });
        }
      })
      .catch(err => console.error(err));
  }

  submitNewUsername(e) {
    axios
      .post(`/api/users`, { username: this.state.loginInputs.newUsername })
      .then(result => {
        if (result.data.name && result.data.name === "error") {
          if (result.data.code === "23505") {
            let errors = { ...this.state.errors };
            errors.newUsernameError = true;
            this.setState({ errors });
          }
        } else {
          let errors = { ...this.state.errors };
          let loginInputs = { ...this.state.loginInputs };
          let { user } = this.state;

          user = loginInputs.newUsername;
          loginInputs.existingUsername = "";
          loginInputs.newUsername = "";
          errors.newUsernameError = false;
          errors.existingUsernameError = false;
          this.setState({ mode: "play", errors, loginInputs, user }, () => {
            this.getUserLevels(user);
          });
        }
      })
      .catch(err => console.log("err"));
  }

  handleUsernameInput(e) {
    e.persist();
    let { loginInputs } = this.state;

    loginInputs[e.currentTarget.id] = e.target.value;
    this.setState({ loginInputs });
  }

  handleKeyDown(e) {
    if (
      this.state.playerCar !== this.state.office &&
      this.state.bossCar !== this.state.office
    ) {
      if (e.keyCode === 37) {
        if (
          this.state.layout[this.state.playerCar - 1].borders.left &&
          this.state.layout[this.state.playerCar - 1].borders.left.type ===
            "street"
        ) {
          this.setState({ playerDirection: "left" });
        }
      } else if (e.keyCode === 38) {
        if (
          this.state.layout[this.state.playerCar - 1].borders.up &&
          this.state.layout[this.state.playerCar - 1].borders.up.type ===
            "street"
        ) {
          this.setState({ playerDirection: "up" });
        }
      } else if (e.keyCode === 39) {
        if (
          this.state.layout[this.state.playerCar - 1].borders.right &&
          this.state.layout[this.state.playerCar - 1].borders.right.type ===
            "street"
        ) {
          this.setState({ playerDirection: "right" });
        }
      } else if (e.keyCode === 40) {
        if (
          this.state.layout[this.state.playerCar - 1].borders.down &&
          this.state.layout[this.state.playerCar - 1].borders.down.type ===
            "street"
        ) {
          this.setState({ playerDirection: "down" });
        }
      }
    }
  }

  startRace() {
    this.setState({ status: "active" }, () => {
      for (let stoplight in this.state.stoplights) {
        setTimeout(() => {
          this.cycleStoplight(stoplight);
          this.stoplightIntervals[stoplight] = setInterval(() => {
            this.cycleStoplight(stoplight);
          }, this.state.stoplights[stoplight] + 7000);
        }, this.state.stoplights[stoplight]);
      }

      this.startBoss();
      this.startPlayer();
    });
  }

  startBoss() {
    let pathStack = this.findBossPath();

    if (!pathStack) {
      this.setState({ bossError: true });
      return;
    }

    this.bossInterval = setInterval(() => {
      if (this.state.bossMovable) {
        let nextMove = pathStack.pop();
        if (nextMove) {
          if (this.state.layout[nextMove - 1].stoplight === "red") {
            pathStack.push(nextMove);
          } else {
            this.moveBossCar(nextMove);
          }
        }
      }
    }, this.state.difficultyIntervals[this.state.difficulty]);
  }

  startPlayer() {
    this.playerInterval = setInterval(() => {
      if (this.state.playerMovable) {
        this.movePlayerCar(this.state.playerDirection);
      }
    }, 275 / (this.state.caffeineCount + 1));
  }

  resetPlayers() {
    let { playerCar, playerHome, bossCar, bossHome } = this.state;

    playerCar = playerHome;
    bossCar = bossHome;

    this.setState({ playerCar, bossCar });
  }

  movePlayerCar(direction) {
    //First, we check to ensure that the player is currently movable and
    //that a direction was properly passed in
    if (this.state.playerMovable && direction) {
      let { playerCar, bossCar, collision, layout, playerMovable } = this.state;
      let target = layout[playerCar - 1].borders[direction];

      //Next, we ensure the square they're moving to exists, that it's a valid street square,
      //and that it's not a red light
      if (target && target.type === "street" && target.stoplight !== "red") {
        //We move the player's car to the target square
        layout[playerCar - 1].playerCar = false;
        playerCar = target.id;
        layout[playerCar - 1].playerCar = true;

        //Now, we check if the player has reached the goal and handle the end
        //of the game accordingly
        if (playerCar === this.state.office) this.fullReset();
        //Next, we check if the player and the boss car are now in the same spot
        //and handle a collision accordingly
        else if (playerCar === bossCar) {
          collision = true;
          this.fullReset();

          //If the game is not over yet, we check for special squares
        } else {
          //If the player's new location contains a coffee bonus, we caffeinate the player
          //and remove that coffee from the board
          if (layout[playerCar - 1].coffee) {
            this.caffeinate();
            layout[playerCar - 1].coffee = false;
          }
          //Lastly we check if the player is currently in a school zone
          if (this.state.schoolZoneState.playerInSchoolZone) {
            //If the player was but is no longer in a school zone, we run the appropriate exit logic
            if (!layout[playerCar - 1].schoolZone) {
              this.exitSchoolZone("player");
              //If the player is still in a school zone, we reset their movability to false for
              //the remainder of the school zone interval
            } else {
              playerMovable = false;
            }
          }
        }
      }
      this.setState({ playerCar, layout, collision, playerMovable }, () => {
        //Once the player's information is updated in state, we check to see if they have entered a school zone
        if (
          layout[playerCar - 1].schoolZone &&
          !this.state.schoolZoneState.playerInSchoolZone
        ) {
          this.enterSchoolZone("player");
        }
      });
    }
  }

  findBossPath() {
    let { bossHome, office, layout } = this.state;

    let pathInfo = findPath(layout[bossHome - 1], layout[office - 1], layout);

    if (!pathInfo) return null;

    this.setState({ layout: pathInfo.layout });
    return pathInfo.pathStack;
  }

  moveBossCar(nextMove) {
    //We follow the same logic as moving the playerCar, but the stoplight and movability checks
    // are handled in the bossInterval due to the interaction with the boss's pathStack
    let { bossCar, playerCar, layout, bossMovable, collision } = this.state;

    layout[bossCar - 1].bossCar = false;
    bossCar = nextMove;
    layout[bossCar - 1].bossCar = true;

    if (this.state.bossCar === this.state.office) this.fullReset();
    else if (playerCar === bossCar) {
      collision = true;
      this.fullReset();
    }

    if (this.state.schoolZoneState.bossInSchoolZone) {
      if (!layout[bossCar - 1].schoolZone) {
        this.exitSchoolZone("boss");
      } else {
        bossMovable = false;
      }
    }

    this.setState({ bossCar: nextMove, layout, bossMovable, collision }, () => {
      if (
        layout[bossCar - 1].schoolZone &&
        !this.state.schoolZoneState.bossInSchoolZone
      ) {
        this.enterSchoolZone("boss");
      }
    });
  }

  cycleStoplight(squareId) {
    let { layout } = this.state;

    //Right away, set the square's stoplight to yellow
    layout[squareId - 1].stoplight = "yellow";

    //Update state with the yellow light
    this.setState({ layout });

    //While state is updating, set a timer for the light to turn red
    //after 2 seconds of yellow
    setTimeout(() => {
      let { layout } = this.state;
      layout[squareId - 1].stoplight = "red";
      this.setState({ layout });
    }, 2000);

    //Set a second timer to turn the light back to green after 7 seconds
    //(2 seconds of yellow plus 5 seconds of red)
    setTimeout(() => {
      let { layout } = this.state;
      layout[squareId - 1].stoplight = "green";
      this.setState({ layout });
    }, 7000);
  }

  enterSchoolZone(who) {
    let { schoolZoneState } = this.state;

    schoolZoneState[`${who}InSchoolZone`] = true;

    this.setState({ [`${who}Movable`]: false, schoolZoneState }, () => {
      this[`${who}SchoolZoneInterval`] = setInterval(() => {
        this.setState({ [`${who}Movable`]: true });
      }, this.state.schoolZoneState.schoolZoneInterval);
    });
  }

  exitSchoolZone(who) {
    let { schoolZoneState } = this.state;

    schoolZoneState[`${who}InSchoolZone`] = false;

    clearInterval(this[`${who}SchoolZoneInterval`]);

    this.setState({ [`${who}Movable`]: true, schoolZoneState });
  }

  caffeinate() {
    let { caffeineCount } = this.state;
    //Increment player's caffeineCount in state
    caffeineCount++;
    this.setState({ caffeineCount }, () => {
      //After updating state, clear player's current interval and
      //reset to a faster one based on new caffeineCount
      clearInterval(this.playerInterval);
      this.playerInterval = setInterval(() => {
        if (this.state.playerMovable) {
          this.movePlayerCar(this.state.playerDirection);
        }
      }, this.state.playerInterval / (this.state.caffeineCount + 1));

      //Then set a timer to slow player's interval back down after 5 seconds
      setTimeout(() => {
        this.decaffeinate();
      }, 5000);
    });
  }

  decaffeinate() {
    let { caffeineCount } = this.state;

    //Decrease player's caffeineCount by 1 and update in state
    if (caffeineCount > 0) caffeineCount--;

    this.setState({ caffeineCount }, () => {
      //After updating state, clear player's interval and reset to slower interval
      clearInterval(this.playerInterval);
      this.playerInterval = setInterval(() => {
        if (this.state.playerMovable) {
          this.movePlayerCar(this.state.playerDirection);
        }
      }, this.state.playerInterval / (this.state.caffeineCount + 1));
    });
  }

  changeDifficulty(e) {
    this.setState({ difficulty: e.target.value });
  }

  closeBossModal() {
    this.setState({ bossError: false });
  }

  enterDesignMode() {
    //First, clear all existing intervals
    clearInterval(this.bossInterval);
    clearInterval(this.playerInterval);
    for (let interval in this.stoplightIntervals) {
      clearInterval(this.stoplightIntervals[interval]);
    }

    //Then, create a blank design board
    let designLayout = createDesignBoard(40, 25);

    //Change state to design mode and apply new blank design layout
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
      //Hard-coded to my levels for now
      this.getUserLevels(this.state.user);
    });
  }

  toggleLevelVisibility(type) {
    let visible = this.state[`${type}LevelsVisible`];
    this.setState({ [`${type}LevelsVisible`]: !visible });
  }
  //Used specifically when transferring from Design Mode to Test/Play mode
  loadDesign(levelId) {
    this.loadLevel(levelId);
    //Hard-coded to my levels or now
    this.getUserLevels(this.state.user);
  }

  //Used anytime a level is loaded from the database into Game state for Testing/Playing
  loadLevel(levelId) {
    if (levelId) {
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
          let coffees = levelInfo.coffees;
          let unformattedLayout = levelInfo.layout;

          //Add circular object references back into layout
          let uglyLayout = formatLayout(unformattedLayout);

          //Add tree and house properties to squares for pretty rendering
          let layout = prettify(uglyLayout);

          //Set position of cars for rendering
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
              coffees,
              designLayout: layout
            },
            () => {
              this.fullReset();
            }
          );
        })
        .catch(err => console.error(err));
    }
  }

  deleteLevel(levelId) {
    axios
      .delete(`/api/levels`, { data: { levelId } })
      .then(result => {
        this.getUserLevels(this.state.user);
        this.loadLevel(
          this.state.userLevels[0] ? this.state.userLevels[0].id : null
        );
      })
      .catch(err => console.log(err));
  }

  // getDefaultLevels() {
  //   axios
  //     .get(`/api/levels/`)
  //     .then(data => {
  //       let defaultLevels = data.data.rows.sort((a, b) => {
  //         if (a.level_name.toLowerCase() > b.level_name.toLowerCase()) {
  //           return 1;
  //         } else if (a.level_name.toLowerCase() < b.level_name.toLowerCase()) {
  //           return -1;
  //         }
  //       });
  //       this.setState({ defaultLevels }, () => {
  //         if (this.state.defaultLevels.length > 0)
  //           this.loadLevel(this.state.defaultLevels[0].id);
  //       });
  //     })
  //     .catch(err => console.error(err));
  // }

  getUserLevels(username) {
    axios
      .get(`/api/userlevels/${username}`)
      .then(data => {
        let userLevels = data.data.userLevels.rows.sort((a, b) => {
          if (a.level_name.toLowerCase() > b.level_name.toLowerCase()) {
            return 1;
          } else if (a.level_name.toLowerCase() < b.level_name.toLowerCase()) {
            return -1;
          }
        });

        let defaultLevels = data.data.defaultLevels.rows.sort((a, b) => {
          if (a.level_name.toLowerCase() > b.level_name.toLowerCase()) {
            return 1;
          } else if (a.level_name.toLowerCase() < b.level_name.toLowerCase()) {
            return -1;
          }
        });

        this.setState({ defaultLevels, userLevels }, () => {
          // if (this.state.userLevels.length > 0)
          //   this.loadLevel(this.state.userLevels[0].id);
        });
      })
      .catch(err => console.error(err));
  }

  fullReset() {
    clearInterval(this.bossInterval);
    clearInterval(this.playerInterval);
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
      layout,
      playerDirection,
      caffeineCount
    } = this.state;

    if (mode !== "intro") mode = "play";
    status = "idle";
    layout[playerCar - 1].playerCar = false;
    layout[bossCar - 1].bossCar = false;
    playerCar = playerHome;
    bossCar = bossHome;
    layout[playerCar - 1].playerCar = true;
    layout[bossCar - 1].bossCar = true;
    collision = false;
    playerDirection = null;
    caffeineCount = 0;

    for (let coffeeSquare in this.state.coffees) {
      layout[coffeeSquare - 1].coffee = true;
    }

    this.setState({
      mode,
      status,
      playerCar,
      bossCar,
      collision,
      layout,
      playerDirection,
      caffeineCount
    });
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
          defaultLevels={this.state.defaultLevels}
          userLevels={this.state.userLevels}
          defaultLevelsVisible={this.state.defaultLevelsVisible}
          userLevelsVisible={this.state.userLevelsVisible}
          toggleLevelVisibility={this.toggleLevelVisibility}
          collision={this.state.collision}
          startRace={this.startRace}
          fullReset={this.fullReset}
          enterDesignMode={this.enterDesignMode}
          loadLevel={this.loadLevel}
          deleteLevel={this.deleteLevel}
          difficulty={this.state.difficulty}
          changeDifficulty={this.changeDifficulty}
          playerColor={this.state.playerColor}
        />
        <div className="designModuleContainer">
          <DesignModule
            designLayout={this.state.designLayout}
            stoplights={this.state.stoplights}
            display={this.state.mode === "design" ? "flex" : "none"}
            enterPlayMode={this.enterPlayMode}
            loadDesign={this.loadDesign}
            userLevels={this.state.userLevels}
            difficultyIntervals={this.state.difficultyIntervals}
          />
        </div>
        <div
          className="modal"
          style={{ display: this.state.bossError ? "block" : "none" }}
        >
          <BossErrorModal closeBossModal={this.closeBossModal} />
        </div>
        <div
          className="modal intro"
          style={{ display: this.state.mode === "intro" ? "block" : "none" }}
        >
          <IntroModal
            existingUsername={this.state.loginInputs.existingUsername}
            newUsername={this.state.loginInputs.newUsername}
            submitExistingUsername={this.submitExistingUsername}
            submitNewUsername={this.submitNewUsername}
            handleUsernameInput={this.handleUsernameInput}
            existingUsernameError={this.state.errors.existingUsernameError}
            newUsernameError={this.state.errors.newUsernameError}
          />
        </div>
      </div>
    );
  }
}

export default App;
