const createSquares = (width, height) => {
    let squares = [];
    let squareCount = width * height;

    for (let s = 1; s <= squareCount; s++) {
        squares.push({id: s, row: Math.ceil(s / height), column: Math.ceil(s / width),})
    }

    return squares;
}

const addBorders = (square, squaresList, fieldWidth, fieldHeight) => {

}

export default createSquares;