import React from "react";
import "./styles/App.css";
import GameModule from "./components/GameModule";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      playerHome: 281,
      bossHome: 681,
      office: 520,
      playerCar: 281,
      bossCar: 681
    };
  }
  render() {
    return (
      <div className="App">
        <GameModule playerCar={this.state.playerCar} />
      </div>
    );
  }
}

export default App;
