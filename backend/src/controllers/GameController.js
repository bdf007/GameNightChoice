const models = require("../models");

class GameController {
  static browse = (req, res) => {
    models.games
      .findAllWithPhotos()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error("error browse", err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.games
      .findOneWithPhotos(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const game = req.body;

    // TODO validations (length, format...)

    game.id = parseInt(req.params.id, 10);

    models.games
      .update(game)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(201).send({ ...game, id: result.insertId });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const game = req.body;

    // TODO validations (length, format...)
    models.games
      .insert(game)
      .then(([result]) => {
        res.status(201).send({ ...game, id: result.insertId });
      })
      .catch((err) => {
        console.error("error add", err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.games
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = GameController;
