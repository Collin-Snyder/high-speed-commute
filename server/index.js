const express = require("express");
const path = require("path");
const { saveLevel } = require("../db/queries");
const port = 5000;

const app = express();

// app.use(express.static(path.join(__dirname, "high-speed-commute/public/index.html")));
app.use(express.static("../high-speed-commute/public/"));
app.use(express.json({limit: "50mb"}));

app.get("/api/levels", (req, res) => {
  res.send("Sending a level your way!");
});

app.post("/api/levels", (req, res) => {
    console.log(req.body);
    saveLevel(req.body, (err) => {
        if (err) res.send(err);
        else res.send("Successfully saved your level!")
    });
})
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
