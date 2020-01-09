const { Client } = require("pg");
const dbConfig = require("../env/dbConfig");

const client = new Client(dbConfig);

client.connect();

module.exports.getUser = () => {};

module.exports.addUser = () => {};

module.exports.saveLevel = (levelInfo, callback) => {
  client.query(
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
  ).then(result => callback()).catch(err => callback(err));
};

module.exports.getLevel = () => {};

module.exports.getAllLevels = () => {};

module.exports.saveCompletedGame = () => {};

module.exports.saveIncompleteGame = () => {};

module.exports.getUserStats = () => {};
