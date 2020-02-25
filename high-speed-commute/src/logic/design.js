export const handleKeySquare = (
  selectedTool,
  keySquares,
  currentSquare,
  designLayout,
  saveStates
) => {
  let keySquareId = keySquares[selectedTool];

  if (keySquareId === currentSquare.id) {
    keySquares[selectedTool] = 0;
    currentSquare.type = "block";
  } else {
    if (keySquareId > 0) {
      designLayout[keySquareId - 1].type = "block";
    }
    keySquares[selectedTool] = currentSquare.id;
    currentSquare.type = "street";
  }

  saveStates.isSaved = false;

  return keySquares;
};

export const handleStreet = (currentSquare, saveStates, stoplights, drag) => {
  if (
    currentSquare.stoplight ||
    currentSquare.schoolZone ||
    currentSquare.coffee
  ) {
    currentSquare.schoolZone = false;
    currentSquare.stoplight = null;
    currentSquare.coffee = false;
    delete stoplights[currentSquare.id];
  } else if (!drag && currentSquare.type === "street") {
    currentSquare.type = "block";
  } else {
    currentSquare.type = "street";
  }

  saveStates.isSaved = false;

  return { saveStates };
};

export const handleStoplight = () => {};

export const handleSchoolZone = () => {};

export const handleCoffee = () => {};

export const handleEraser = () => {};
