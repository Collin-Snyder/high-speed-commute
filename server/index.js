const express = require("express");
const path = require("path");
const port = 5000;

const app = express();

// app.use(express.static(path.join(__dirname, "high-speed-commute/public/index.html")));
app.use(express.static("../high-speed-commute/public/"));

app.get("/api/levels", (req, res) => {
    res.send("Sending a level your way!");
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

