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

export const formatLayoutFromDb = layout => {
  let formattedLayout = layout.map((square, i, layout) => {
    for (let direction in square.borders) {
      if (square.borders[direction]) {
        let borderId = square.borders[direction];
        square.borders[direction] = layout[borderId - 1];
      }
    }
    return square;
  });

  return formattedLayout;
};
