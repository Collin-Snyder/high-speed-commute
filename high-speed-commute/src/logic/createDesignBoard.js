const createDesignBoard = (width, height) => {
  let squares = [];
  let squareCount = width * height;

  for (let s = 1; s <= squareCount; s++) {
    squares.push({
      id: s,
      row: Math.ceil(s / height),
      column: Math.floor(s % width) > 0 ? Math.floor(s % width) : width,
      type: "block",
      stoplight: null,
      playerCar: false,
      bossCar: false
    });
  }

  let squaresWithBorders = squares.map((square, i, squares) =>
    addBorders(square, squares, width, squareCount)
  );

  return squaresWithBorders;
};

const addBorders = (square, squaresList, fieldWidth, squareCount) => {
  square.borders = { left: null, right: null, up: null, down: null };

  if ((square.id - 1) % fieldWidth !== 0) {
    let squareIndex = square.id - 2;
    square.borders.left = squaresList[squareIndex];
  }

  if (square.id % fieldWidth !== 0) {
    let squareIndex = square.id;
    square.borders.right = squaresList[squareIndex];
  }

  if (square.id - fieldWidth > 0) {
    let squareIndex = square.id - fieldWidth - 1;
    square.borders.up = squaresList[squareIndex];
  }

  if (square.id + fieldWidth <= squareCount) {
    let squareIndex = square.id + fieldWidth - 1;
    square.borders.down = squaresList[squareIndex];
  }

  return square;
};

export default createDesignBoard;
