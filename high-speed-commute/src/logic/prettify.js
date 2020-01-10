export const prettify = (layout) => {
    let treeInterval = randomFromRange(15, 30);
    let houseInterval = Math.floor((randomFromRange(20, 35) * 2) / 3);

    for (let t = 0; t < layout.length; t += treeInterval) {
        if (layout[t].type === "block") {
            layout[t].tree === true;
        }
    }

    for (let h = 0; h < layout.length; h += houseInterval) {
        if (layout[t].type === "block" && !layout[t].hasOwnProperty("tree")) {
            layout[t].house === true;
        }
    }

    return layout;
};

const randomFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}