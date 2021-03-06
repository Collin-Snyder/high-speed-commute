const express = require("express");
const path = require("path");
const {
  getUser,
  addUser,
  saveNewLevel,
  updateLevel,
  getLevel,
  getUserLevels,
  deleteLevel
} = require("../db/queries");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "/../high-speed-commute/build")));
app.use(express.json({ limit: "50mb" }));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../high-speed-commute/build/index.html'))
// })

app.get("/api/users/:username", (req, res) => {
  getUser(req.params.username, result => res.send(result));
});

app.get("/api/levels/:id", (req, res) => {
  getLevel(req.params.id, result => {
    res.send(result);
  });
});

app.post("/api/users", (req, res) => {
  addUser(req.body.username, result => res.send(result));
});

app.post("/api/levels", (req, res) => {
  saveNewLevel(req.body, result => {
    res.send(result);
  });
});

app.patch("/api/levels", (req, res) => {
  updateLevel(req.body, result => {
    res.send(result);
  });
});

app.delete("/api/levels", (req, res) => {
  deleteLevel(req.body.levelId, result => {
    res.send(result);
  });
});

app.get("/api/userlevels/:username", (req, res) => {
  const levels = {};
  getUserLevels("default", result => {
    levels.defaultLevels = result;
    getUserLevels(req.params.username, result => {
      levels.userLevels = result;
      res.send(levels);
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Now listening on port ${app.get("port")}`);
});
