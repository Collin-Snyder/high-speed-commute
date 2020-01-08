const createGrid = (width, height) => {
    let grid = [];
    let counter = 1;

    for (let r = 0; r < height; r++) {
        let row = [];
        for (let c = 0; c < width; c++) {
            row.push({row: r, column: c, id: counter});
            counter++;
        }
        grid.push(row);
    }

    return grid;
}

export default createGrid;