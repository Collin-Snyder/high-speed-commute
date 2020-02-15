export const findPlayerPath = (playerHome, office, layout) => {
    if (!playerHome || !office) return null;
  
    let frontier = new PathQueue();
    // let has = Object.hasOwnProperty;
    let cameFrom = {};
    let pathStack = [];
    let foundTarget = false;
  
    //start the queue with the starting square (playerHome)
    frontier.put(playerHome);
    //assign playerHome's "cameFrom" property to null
    cameFrom[playerHome.id] = null;
  
    //run a loop to expand the frontier in every direction on each iteration and break if office is reached
    while (frontier.empty() === false) {
      let currentId = frontier.get();
  
      let currentSquare = layout[currentId - 1];
      // console.log(currentId);
       
  
      if (currentId === office.id) {
        // console.log("Found target!: ", currentId);
        foundTarget = true;
        break;
      }
  
      for (let direction in currentSquare.borders) {
  
        if (
          currentSquare.borders[direction] &&
          currentSquare.borders[direction].type === "street" &&
          !cameFrom.hasOwnProperty(currentSquare.borders[direction].id)
        ) {
          frontier.put(currentSquare.borders[direction]);
          cameFrom[currentSquare.borders[direction].id] = currentId;
          // currentSquare.borders[direction].pathOption = true;
        }
      }
      // console.log(frontier.empty())
      
    }
  
    if (!foundTarget) return null;
  
    let current = office.id;
    //loop backwards through the path taken to reach the office and add to stack
    while (current !== playerHome.id) {
      // console.log("Path back-tracing iteration: ", current);
      pathStack.push(current);
      layout[current - 1].playerPath = true;
      // console.log(layout[current - 1]);
      current = cameFrom[current];
    }
  
    return { pathStack, layout };
  };
  
  class PathQueue {
    constructor() {
      this.front = 0;
      this.end = -1;
      this.storage = {};
    }
  
    put(square) {
      this.end++;
      this.storage[this.end] = square.id;
    }
  
    get() {
      if (this.empty()) return null;
  
      let oldFront = this.front;
      let output = this.storage[oldFront];
  
      this.front++;
      delete this.storage[oldFront];
  
      return output;
    }
  
    empty() {
      return this.front > this.end;
    }
  }

export const playerPathSearch = (playerHome, office, layout) => {
  if (!playerHome || !office) return null;

  let cameFrom = {};
  let paths = [];
  let pathCount = 0;

  cameFrom[playerHome.id] = null;

  const search = (currentSquare, cameFromSquare, cameFromObj) => {
    if (
      !currentSquare ||
      currentSquare.type !== "street" ||
      cameFromObj[currentSquare.id] !== undefined
    ) {
      return;
    }

    cameFromObj[currentSquare.id] = cameFromSquare;

    if (currentSquare.id === office.id) {
    //   let newPath = [];
    //   let current = currentSquare.id;
    //   while (current !== playerHome.id) {
    //     newPath.push(current);
    //     if (layout[current - 1]) layout[current - 1].playerPath = true;
    //     current = cameFromObj[current];
    //   }
    //   if ()
    //   paths.push(newPath);
      pathCount++;
      cameFromObj[currentSquare.id] = undefined;
      return;
    }
    for (let border in currentSquare.borders) {
    //   console.log("Border: ", border, " of square ", currentSquare.id);
      search(currentSquare.borders[border], currentSquare.id, cameFromObj);
    }
    cameFromObj[currentSquare.id] = undefined;
    return;
  };

  for (let border in layout[playerHome.id - 1].borders) {
    // console.log("borders: ", border);
    search(layout[playerHome.id - 1].borders[border], playerHome.id, cameFrom);
  }
  console.log({ pathCount, paths, layout });
  return { pathCount, paths, layout };
};
