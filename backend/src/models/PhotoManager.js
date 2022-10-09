const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

const validationScheme = (data, isCreated) => {
  const parameter = isCreated ? "required" : "optional";

  return Joi.object({
    name: Joi.string().max(255).presence(parameter),
    description: Joi.string().max(255).presence(parameter),
    games_id: Joi.number().presence("optional"),
  }).validate(data, { abortEarly: false }).error;
};

class PhotoManager extends AbstractManager {
  static table = "photos";

  findAll() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  find(id) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE id =?`, [
      id,
    ]);
  }

  insert(photo) {
    // eslint-disable-next-line no-restricted-syntax
    console.log("insert photo", photo);
    return this.connection.query(
      `INSERT INTO photos (description, name, games_id) VALUES (?, ?, ?)`,
      [photo.description, photo.name, photo.games_id]
    );
  }

  delete(id) {
    return this.connection.query(`DELETE FROM photos WHERE id = ?`, [id]);
  }

  update(photo) {
    return this.connection.query(
      `UPDATE ${PhotoManager.table} SET description = ?, game_id = ?, WHERE id = ?`,
      [photo.description, photo.game_id, photo.id]
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(data, creationState = true) {
    try {
      await validationScheme(data, creationState);
      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  }
}

module.exports = PhotoManager;
