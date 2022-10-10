/* eslint-disable camelcase */
const models = require("../models");

class UserhasgameController {
  static browse = (req, res) => {
    models.users_has_games
      .findAllGamesWithPhotos(req.params.id)
      .then(([rows]) => {
        const result = [];
        rows.forEach((game) => {
          if (result.length === 0 || result[result.length - 1].id !== game.id) {
            const gamePhoto = {
              id: game.id,
              name: game.gameName,
              playerNumber: game.playerNumber,
              gameplayStyle: game.gameplayStyle,
              editor: game.editor,
              ages: game.ages,
              duration: game.duration,
              photo: game.photoName,
              photoDescription: game.description,
            };
            result.push(gamePhoto);
          } else if (result[result.length - 1].id === game.id) {
            result[result.length - 1].photos.push({
              id: game.id,
              photoDescription: game.description,
              photo: game.name,
            });
          }
        });
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static browseNameList = (req, res) => {
    const iduser = req.params.id;
    models.users_has_games
      .findAllGamesByUser(iduser)
      .then(([rows]) => {
        const result = [];
        rows.forEach((game) => {
          result.push(game.gameName);
        });
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.users_has_games
      .findOneGameWithPhotos(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const users_has_games = req.body;
    users_has_games.id = parseInt(req.params.id, 10);

    models.users_has_games
      .update(users_has_games)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const users_has_games = req.body;
    models.users_has_games
      .insert(users_has_games)
      .then(() => {
        res.status(201).send({ ...users_has_games });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.users_has_games
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
module.exports = UserhasgameController;
