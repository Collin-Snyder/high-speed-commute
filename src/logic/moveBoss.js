//check if office column is >, <, or = to current column
//by how much? store X as difference
//X: {diff: 40}
//if office col is greater than current col, store direction as "right" (X: {diff: 40, direction: "right"})
//else store direction as "left" (X: {diff: 40, direction: "left"})
//check if office row is >, <, or = to current row
//by how much? store Y as difference
//Y: {diff: 5}
//if office row is greater than current row, store direction as "down" (Y: {diff: 5, direction: "down"})
//else store direction as "up" (Y: {diff: 5, direction: "up"})

//check X.diff vs Y.diff
//if X.diff > Y.diff
//move X.direction
//if X.diff < Y.diff
//move Y.direction
//if X.diff = Y.diff
//move X.direction

export const determineDirection = (currentSquare, targetSquare) => {
    console.log("Inside determineDirection");
  let X = {};
  let Y = {};

  if (targetSquare.column > currentSquare.column) {
    X.diff = targetSquare.column - currentSquare.column;
    X.direction = "right";
  } else if (targetSquare.column < currentSquare.column) {
    X.diff = currentSquare.column - targetSquare.column;
    X.direction = "left";
  } else {
    X.diff = 0;
    X.direction = null;
  }

  if (targetSquare.row > currentSquare.row) {
    Y.diff = targetSquare.row - currentSquare.row;
    Y.direction = "down";
  } else if (targetSquare.row < currentSquare.row) {
    Y.diff = currentSquare.row - targetSquare.row;
    Y.direction = "up";
  } else {
    Y.diff = 0;
    Y.direction = null;
  }

  if (X.diff > Y.diff) {
    return X.direction;
  } else if (X.diff < Y.diff) {
    return Y.direction;
  } else {
    return X.direction || Y.direction;
  }
};
