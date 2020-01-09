export const convertLayoutToJSONString = layout => {
  let convertableLayout = layout.map(square => {
    for (let direction in square.borders) {
      if (square.borders[direction]) {
        let borderId = square.borders[direction].id;
        square.borders[direction] = borderId;
      }
    }
    return square;
  });

  return JSON.stringify(convertableLayout);
};

export const formatLayoutFromDb = () => {};
