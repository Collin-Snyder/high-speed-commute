export const convertLayoutToJSONString = layout => {
  let convertibleLayout = layout.map(square => {
    for (let direction in square.borders) {
      if (square.borders[direction]) {
        let borderId = square.borders[direction].id;
        square.borders[direction] = borderId;
      }
    }
    return square;
  });

  return JSON.stringify(convertibleLayout);
};

export const formatLayout = parsedLayout => {
  let formattedLayout = parsedLayout.map((square, i, parsedLayout) => {
    for (let direction in square.borders) {
      if (square.borders[direction]) {
        let borderId = square.borders[direction];
        square.borders[direction] = parsedLayout[borderId - 1];
      }
    }
    return square;
  });

  return formattedLayout;
};
