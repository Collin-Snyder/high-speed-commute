const { Client } = require("pg");
const dbConfig = require("../env/dbConfig");

const client = new Client(dbConfig);

client.connect();

module.exports.getUser = () => {};

module.exports.addUser = () => {};

module.exports.saveLevel = (levelInfo, callback) => {
  console.log("Layout inside query function: ", levelInfo.layout);
  client
    .query(
      "INSERT INTO user_levels (user_id, level_name, board_height, board_width, player_home, boss_home, office, layout) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        levelInfo.userId,
        levelInfo.levelName,
        levelInfo.boardHeight,
        levelInfo.boardWidth,
        levelInfo.playerHome,
        levelInfo.bossHome,
        levelInfo.office,
        levelInfo.layout
      ]
    )
    .then(result => callback())
    .catch(err => callback(err));
};

module.exports.getLevel = (levelId, callback) => {
  client
    .query("SELECT * FROM user_levels WHERE id = $1", [levelId])
    .then(result => callback(result))
    .catch(err => callback(err));
};

module.exports.getUserLevels = (username, callback) => {
  client
    .query(
      "SELECT l.id, l.level_name FROM user_levels l INNER JOIN users u ON u.id = l.user_id WHERE u.username = $1",
      [username]
    )
    .then(result => callback(result))
    .catch(err => callback(err));
};

module.exports.saveCompletedGame = () => {};

module.exports.saveIncompleteGame = () => {};

module.exports.getUserStats = () => {};
