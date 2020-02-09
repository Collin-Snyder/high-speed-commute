const express = require("express");
const path = require("path");
const { saveNewLevel, updateLevel, getLevel, getUserLevels } = require("../db/queries");
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
  saveNewLevel(req.body, result => {
    res.send(result);
  });
});

app.patch("/api/levels", (req, res) => {
  updateLevel(req.body, result => {
    res.send(result);
  })
})

app.get("/api/userlevels/:username", (req, res) => {
  getUserLevels(req.params.username, result => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
