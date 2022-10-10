const AbstractManager = require("./AbstractManager");

class GameManager extends AbstractManager {
  static table = "games";

  insert(game) {
    return this.connection.query(
      `insert into ${GameManager.table} (name, playerNumber, gameplayStyle, editor, ages, duration) values (?, ?, ?, ?, ?, ?)`,
      [
        game.name,
        game.playerNumber,
        game.gameplayStyle,
        game.editor,
        game.ages,
        game.duration,
      ]
    );
  }

  update(game) {
    return this.connection.query(
      `update ${GameManager.table} set (name = ?, playerNumber= ?, gameplayStyle= ?, editor= ?, ages= ?, duration= ?) where id = ?`,
      [
        game.name,
        game.playerNumber,
        game.gameplayStyle,
        game.editor,
        game.ages,
        game.duration,
        game.id,
      ]
    );
  }

  findAllWithPhotos() {
    return this.connection.query(
      `select g.id, g.name AS gameName, g.playerNumber, g.gameplayStyle, g.editor, g.ages, g.duration, p.id AS photoId, p.description, p.name AS photoName from games AS g LEFT JOIN photos AS p on g.id = p.games_id ORDER BY gameName ASC`
    );
  }

  findOneWithPhotos(id) {
    return this.connection.query(
      `SELECT g.id, g.name, g.playerNumber, g.gameplayStyle, g.editor, g.ages, g.duration, p.id AS photoId, p.description, p.name AS photoName FROM games AS g LEFT JOIN photos AS p ON g.id=p.games_id WHERE g.id=?`,
      [id]
    );
  }

  delete(id) {
    return this.connection.query(`DELETE FROM games WHERE id = ?`, [id]);
  }
}

module.exports = GameManager;
