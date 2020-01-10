const express = require("express");
const path = require("path");
const { saveLevel, getLevel, getUserLevels } = require("../db/queries");
const port = 5000;

const app = express();

// app.use(express.static(path.join(__dirname, "high-speed-commute/public/index.html")));
app.use(express.static("../high-speed-commute/public/"));
app.use(express.json({ limit: "50mb" }));

app.get("/api/levels/:id", (req, res) => {
  getLevel(req.params.id, result => {
    res.send(result);
  });
});

app.post("/api/levels", (req, res) => {
  saveLevel(req.body, err => {
    if (err) res.send(err);
    else res.send("Successfully saved your level!");
  });
});

app.get("/api/userlevels/:username", (req, res) => {
  getUserLevels(req.params.username, result => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
