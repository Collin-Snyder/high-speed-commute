const createSquares = (width, height) => {
  let squares = [];
  let squareCount = width * height;

  for (let s = 1; s <= squareCount; s++) {
    squares.push({
      id: s,
      row: Math.ceil(s / height),
      column: Math.floor(s % width) > 0 ? Math.floor(s % width) : width
    });
  }

  let squaresWithBorders = squares.map((square, i, squares) =>
    addBorders(square, squares, width, squareCount)
  );

  let blockList = {
    700: true,
    660: true,
    620: true,
    580: true,
    540: true,
    500: true,
    501: true,
    541: true,
    581: true,
    621: true,
    661: true,
    701: true,
    740: true,
    741: true,
    780: true,
    781: true,
    546: true,
    506: true,
    466: true,
    426: true,
    386: true,
    346: true,
    306: true,
    266: true,
    358: true,
    398: true,
    438: true,
    478: true,
    518: true,
    558: true,
    598: true,
    638: true,
    678: true
  };

  let squaresWithBlocks = addBlocks(squaresWithBorders, blockList);

  return squaresWithBlocks;
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

const addBlocks = (squaresList, blockSquares) => {
  let squaresWithBlocks = squaresList.map(square => {
    square.type = blockSquares.hasOwnProperty(square.id) ? "block" : "street";
    return square;
  });
  return squaresWithBlocks;
};

export default createSquares;
