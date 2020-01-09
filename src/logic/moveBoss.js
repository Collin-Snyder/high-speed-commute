//1. I want to move toward my target starting with the direction in which I am furthest from it.
//2. If  two different directions will both move me equally toward my target, OR if I cannot move in the most optimal direction, I should continue moving the same direction as my previous move.
//3. If I cannot move in the same direction as my previous move, I should move perpendicular to my last move, away from the target.
//4. If I cannot move perpendicular to my last move, I should backtrack in the opposite direction as my last move until a better option opens up.

export const getDirectionQueue = (currentSquare, targetSquare, prevMove) => {
  let X = {};
  let Y = {};
  let backtrack =
    prevMove === "up"
      ? "down"
      : prevMove === "down"
      ? "up"
      : prevMove === "right"
      ? "left"
      : "right";
  let directionQueue = [];

  let directions = { up: "up", down: "down", right: "right", left: "left" };

  directionQueue[3] = backtrack;
  delete directions[backtrack];

  if (targetSquare.column > currentSquare.column) {
    X.diff = targetSquare.column - currentSquare.column;
    X.optimal = "right";
    X.standby = "left";
  } else if (targetSquare.column < currentSquare.column) {
    X.diff = currentSquare.column - targetSquare.column;
    X.optimal = "left";
    X.standby = "right";
  } else {
    X.diff = 0;
    X.optimal = directions.hasOwnProperty("left") ? "left" : "right";
    X.standby = backtrack;
  }

  if (targetSquare.row > currentSquare.row) {
    Y.diff = targetSquare.row - currentSquare.row;
    Y.optimal = "down";
    Y.standby = "up";
  } else if (targetSquare.row < currentSquare.row) {
    Y.diff = currentSquare.row - targetSquare.row;
    Y.optimal = "up";
    Y.standby = "down";
  } else {
    Y.diff = 0;
    Y.optimal = backtrack === "up" ? "down" : "up";
    Y.standby = Y.optimal === "up" ? "down" : "up";
  }

  console.log("X: ", X);
  console.log("Y: ", Y)

  if (X.diff > Y.diff) {
    if (X.optimal !== backtrack) {
      directionQueue[0] = X.optimal;
      delete directions[X.optimal];
    } else {
      directionQueue[0] = X.standby;
      delete directions[X.standby];
    }

    if (X.optimal === prevMove) {
      directionQueue[1] = Y.optimal;
      delete directions[Y.optimal];
    } else {
      directionQueue[1] = prevMove;
      delete directions[prevMove];
    }
  } else if (X.diff < Y.diff) {
    if (Y.optimal !== backtrack) {
      directionQueue[0] = Y.optimal;
      delete directions[Y.optimal];
    } else {
      directionQueue[0] = Y.standby;
      delete directions[Y.standby];
    }

    if (Y.optimal === prevMove) {
      directionQueue[1] = X.optimal;
      delete directions[X.optimal];
    } else {
      directionQueue[1] = prevMove;
      delete directions[prevMove];
    }
  } else if (X.diff === Y.diff) {
    directionQueue[0] = prevMove;
    delete directions[prevMove];

    if (prevMove === X.optimal) {
      directionQueue[1] = Y.optimal;
      delete directions[Y.optimal];
    } else {
      directionQueue[1] = X.optimal;
      delete directions[X.optimal];
    }
  }

  directionQueue[2] = Object.keys(directions)[0];

  return directionQueue;

  if (X.diff > Y.diff) {
    return X.optimal;
  } else if (X.diff < Y.diff) {
    return Y.optimal;
  } else {
    return X.optimal || Y.optimal;
  }

  //return a direction queue rather than one direction
  //
};
