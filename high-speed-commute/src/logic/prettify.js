export const prettify = layout => {
  for (let square of layout) {
    if (Math.random() < 0.4 && square.type === "block") {
      square.tree = true;
    }
    if (
      Math.random() < 0.3 &&
      square.type === "block" &&
      !square.hasOwnProperty("tree")
    ) {
      let valid = false;
      for (let border in square.borders) {
        if (
          square.borders[border] &&
          square.borders[border].type === "street"
        ) {
          valid = true;
          break;
        }
      }
      if (valid) square.house = true;
    }
  }
  return layout;
};
