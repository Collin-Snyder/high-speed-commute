export const convertLayoutToJSONString = layout => {
  if (
    !layout[0].borders.hasOwnProperty("up") ||
    !layout[0].borders.hasOwnProperty("down") ||
    !layout[0].borders.hasOwnProperty("right") ||
    !layout[0].borders.hasOwnProperty("left")
  ) {
    console.log("BORDER ERROR ALERT IN CONVERT LAYOUT TO JSON - layout");
  }
  if (
    typeof layout[0].borders.up !== "object" ||
    typeof layout[0].borders.down !== "object" ||
    typeof layout[0].borders.left !== "object" ||
    typeof layout[0].borders.right !== "object"
  )
    console.log(
      "BORDER ERROR ALERT IN CONVERT LAYOUT TO JSON - BORDERS NOT OBJECTS: ", layout[0].borders
    );
  let convertibleLayout = layout.map(square => {
    square = {...square};
    square.borders = {...square.borders};
    for (let direction in square.borders) {
      if (square.borders[direction] !== null) {
        let borderId = square.borders[direction].id;
        square.borders[direction] = borderId;
      }
    }
    return square;
  });

  if (
    !convertibleLayout[0].borders.hasOwnProperty("up") ||
    !convertibleLayout[0].borders.hasOwnProperty("down") ||
    !convertibleLayout[0].borders.hasOwnProperty("right") ||
    !convertibleLayout[0].borders.hasOwnProperty("left")
  ) {
    console.log(
      "BORDER ERROR ALERT IN CONVERT LAYOUT TO JSON - convertibleLayout"
    );
  }

  return JSON.stringify(convertibleLayout);
};

export const formatLayout = parsedLayout => {

  let formattedLayout = parsedLayout.map((square, i, parsedLayout) => {
    for (let direction in square.borders) {
      if (square.borders[direction] !== null) {
        let borderId = square.borders[direction];
        square.borders[direction] = parsedLayout[borderId - 1];
      }
    }
    return square;
  });

  if (
    typeof formattedLayout[0].borders.up !== "object" ||
    typeof formattedLayout[0].borders.down !== "object" ||
    typeof formattedLayout[0].borders.left !== "object" ||
    typeof formattedLayout[0].borders.right !== "object"
  )
    console.log(
      "BORDER ERROR ALERT IN PARSE LAYOUT FROM JSON - BORDERS NOT OBJECTS: ", formattedLayout[0].borders
    );

  if (
    !formattedLayout[0].borders.hasOwnProperty("up") ||
    !formattedLayout[0].borders.hasOwnProperty("down") ||
    !formattedLayout[0].borders.hasOwnProperty("right") ||
    !formattedLayout[0].borders.hasOwnProperty("left")
  ) {
    console.log("BORDER ERROR ALERT IN PARSE LAYOUT FROM JSON");
  }
  return formattedLayout;
};
