const { Client } = require("pg");
const dbConfig = require("../env/dbConfig");

const client = new Client(dbConfig);

client.connect();

module.exports.getUser = (username, callback) => {
  client
    .query(
      "SELECT username FROM users WHERE EXISTS (SELECT username FROM users WHERE username = $1);",
      [username]
    )
    .then(result => {
      if (result.rowCount > 0) {
        callback(result.rows[0].username);
      } else {
        callback(null);
      }
    })
    .catch(err => callback(err));
};

module.exports.addUser = (username, callback) => {
  client
    .query("INSERT INTO users (username) VALUES ($1);", [username])
    .then(result => {
      callback(result);
    })
    .catch(err => callback(err));
};

module.exports.saveNewLevel = (levelInfo, callback) => {
  client
    .query(
      "INSERT INTO user_levels (user_id, level_name, board_height, board_width, player_home, boss_home, office, layout, stoplights) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
      [
        levelInfo.userId,
        levelInfo.levelName,
        levelInfo.boardHeight,
        levelInfo.boardWidth,
        levelInfo.playerHome,
        levelInfo.bossHome,
        levelInfo.office,
        levelInfo.layout,
        levelInfo.stoplights
      ]
    )
    .then(result => callback(result))
    .catch(err => callback(err));
};

module.exports.updateLevel = (levelInfo, callback) => {
  client
    .query(
      "UPDATE user_levels SET player_home = $1, boss_home = $2, office = $3, layout = $4, stoplights = $5, coffees = $6 WHERE id = $7",
      [
        levelInfo.playerHome,
        levelInfo.bossHome,
        levelInfo.office,
        levelInfo.layout,
        levelInfo.stoplights,
        levelInfo.coffees,
        levelInfo.levelId
      ]
    )
    .then(result => callback(result))
    .catch(err => callback(err));
};

module.exports.deleteLevel = (levelId, callback) => {
  client
    .query("DELETE FROM user_levels WHERE id = $1", [levelId])
    .then(result => callback(result))
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
