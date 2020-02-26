export const prettify = (layout) => {
    // let treeInterval = randomFromRange(28, 28);
    // let houseInterval = randomFromRange(22, 22);

    // for (let t = 0; t < layout.length; t += treeInterval) {
    //     if (layout[t].type === "block") {
    //         layout[t].tree = true;
    //     }
    // }

    for (let square of layout) {
        if (Math.random() < 0.4 && square.type === "block") {
            square.tree = true;
        }
        if (Math.random() < 0.3 && square.type === "block" && !square.hasOwnProperty("tree")) {
            let valid = false;
            for (let border in square.borders) {
                if (square.borders[border] && square.borders[border].type === "street") {
                    valid = true;
                    break;
                }
            }
            if (valid) square.house = true;
        }
    }

    // for (let h = 0; h < layout.length; h += houseInterval) {
    //     if (layout[h].type === "block" && !layout[h].hasOwnProperty("tree")) {
    //         layout[h].house = true;
    //     }
    // }

    return layout;
};

const randomFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}