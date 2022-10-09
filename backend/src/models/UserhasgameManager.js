/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserhasgameManager extends AbstractManager {
  static table = "users_has_games";

  findAllGamesWithPhotos(idUser) {
    return this.connection.query(
      `select g.id, g.name AS gameName, g.playerNumber, g.gameplayStyle, g.editor, g.ages, g.duration, p.id AS photoId, p.description, p.name AS photoName from games AS g LEFT JOIN users_has_games AS uhg ON g.id=uhg.games_id LEFT JOIN photos AS p ON g.id = p.games_id WHERE uhg.users_id=? ORDER BY gameName ASC`,
      [idUser]
    );
  }

  findOneGameWithPhotos(id) {
    const idGame = parseInt(id, 10);
    return this.connection.query(
      `SELECT g.name AS gameName, g.playerNumber, g.gameplayStyle, g.editor, g.ages, g.duration, p.id AS photoId, p.description, p.name AS photoName FROM games AS g LEFT JOIN photos AS p ON g.id=p.games_id WHERE g.id=?`,
      [idGame]
    );
  }

  findAllGamesByUser(id) {
    const idUser = parseInt(id, 10);
    return this.connection.query(
      `SELECT g.name AS gameName FROM games AS g LEFT JOIN users_has_games AS uhg ON g.id=uhg.games_id WHERE uhg.users_id=?`,
      [idUser]
    );
  }

  insert(users_has_games) {
    return this.connection.query(
      `INSERT INTO users_has_games (users_id, games_id) VALUES (?, ?)`,
      [users_has_games.users_id, users_has_games.games_id]
    );
  }

  update(users_has_games) {
    return this.connection.query(
      `UPDATE users_has_games SET users_id = ?, games_id = ?, WHERE games_id = ?`,
      [users_has_games.users_id, users_has_games.games_id, users_has_games.id]
    );
  }

  delete(id) {
    return this.connection.query(
      `DELETE FROM users_has_games WHERE games_id = ?`,
      [id]
    );
  }
}

module.exports = UserhasgameManager;
