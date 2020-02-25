const randomNumBtwn = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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

export const handleStoplight = (
  currentSquare,
  saveStates,
  stoplights,
  drag
) => {
  if (!drag && stoplights.hasOwnProperty(currentSquare.id)) {
    currentSquare.stoplight = null;
    delete stoplights[currentSquare.id];
    saveStates.isSaved = false;
  } else if (currentSquare.type === "street") {
    currentSquare.stoplight = "green";
    stoplights[currentSquare.id] = randomNumBtwn(4, 12) * 1000;
    saveStates.isSaved = false;
    if (currentSquare.schoolZone) currentSquare.schoolZone = false;
  }
};

export const handleSchoolZone = (currentSquare, saveStates, drag) => {
  if (!drag && currentSquare.schoolZone === true) {
    currentSquare.schoolZone = false;
    saveStates.isSaved = false;
  } else if (currentSquare.type === "street" && !currentSquare.stoplight) {
    currentSquare.schoolZone = true;
    saveStates.isSaved = false;
  }
};

export const handleCoffee = (currentSquare, saveStates, coffees, drag) => {
  if (!drag && currentSquare.coffee === true) {
    currentSquare.coffee = false;
    delete coffees[currentSquare.id];
    saveStates.isSaved = false;
  } else if (currentSquare.type === "street" && !currentSquare.stoplight) {
    currentSquare.coffee = true;
    coffees[currentSquare.id] = true;
    saveStates.isSaved = false;
  }
};

export const handleEraser = (
  currentSquare,
  keySquares,
  stoplights,
  saveStates
) => {
  currentSquare.type = "block";

  if (currentSquare.id === keySquares.playerHome) keySquares.playerHome = 0;
  else if (currentSquare.id === keySquares.bossHome) keySquares.bossHome = 0;
  else if (currentSquare.id === keySquares.office) keySquares.office = 0;

  if (currentSquare.stoplight) {
    currentSquare.stoplight = null;
    delete stoplights[currentSquare.id];
  }

  if (currentSquare.schoolZone) {
    currentSquare.schoolZone = false;
  }

  if (currentSquare.coffee) {
    currentSquare.coffee = false;
  }

  saveStates.isSaved = false;
};
