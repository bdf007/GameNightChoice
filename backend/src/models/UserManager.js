const Joi = require("joi");
const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");

const roles = ["ADMIN", "USER"];

const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid(...roles),
});

const schemaForUpdate = Joi.object({
  id: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  username: Joi.string(),
  firstname: Joi.string(),
  lastname: Joi.string(),
  role: Joi.string().valid(...roles),
});

class UserManager extends AbstractManager {
  static table = "users";

  insert(user) {
    if (user.role) {
      return this.connection.query(
        `insert into ${UserManager.table} (username, email, hashedPassword, role, firstname, lastname) values (?, ?, ?, ?, ?, ?)`,
        [
          user.username,
          user.email,
          user.hashedPassword,
          user.role,
          user.firstname,
          user.lastname,
        ]
      );
    }
    return this.connection.query(
      `insert into ${UserManager.table} (email, hashedPassword, username, firstname, lastname) values (?, ?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.hashedPassword,
        user.firstname,
        user.lastname,
      ]
    );
  }

  update(user) {
    if (user.role === "ADMIN") {
      return this.connection.query(
        `update ${UserManager.table} set hashedPassword = ?, role = ? where id = ?`,
        [user.hashedPassword, user.role, user.id]
      );
    }
    return this.connection.query(
      `update ${UserManager.table} set hashedPassword = ? where id = ?`,
      [user.hashedPassword, user.id]
    );
  }

  emailAlreadyExists(email) {
    return this.connection
      .query(`SELECT id FROM ${UserManager.table} WHERE email=?`, [email])
      .then(([results]) => results.length);
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(user, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(user);
      } else {
        await schemaForUpdate.validateAsync(user);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyPassword(password, hashedPassword) {
    const passwordIsValid = await argon2.verify(hashedPassword, password);
    return passwordIsValid;
  }

  find(id) {
    return this.connection.query(
      `select id, username, email, role from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllUsers() {
    return this.connection.query(
      `SELECT id, firstname, lastname, username, email, role FROM users`
    );
  }

  findByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  updateAvatar({ id, avatar, avatarDescription }) {
    return this.connection.query(
      `UPDATE ${this.table} SET avatar=?, avatarDescription=? WHERE id=?`,
      [avatar, avatarDescription, id]
    );
  }

  delete(id) {
    return this.connection.query(`DELETE FROM users where id = ?`, [id]);
  }
}

module.exports = UserManager;
