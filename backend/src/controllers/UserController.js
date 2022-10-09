const jwt = require("jsonwebtoken");
const models = require("../models");

class UserController {
  static browse = async (req, res) => {
    try {
      const [results] = await models.users.findAllUsers();
      return res.status(200).json(results);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  };

  static read = (req, res) => {
    models.users
      .find(req.params.id)
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

  static edit = async (req, res) => {
    const { password, role } = req.body;
    const id = parseInt(req.params.id, 10);

    try {
      // TODO validations (length, format...)
      console.warn(id, password, role);
      const validUser = await models.users.validate(
        { id, password, role },
        false
      );
      // console.warn(validUser);
      if (!validUser) {
        return res
          .status(400)
          .send("You must provide a valid password and/or role");
      }

      // Hash password
      const hashedPassword = await models.users.hashPassword(password);

      const [result] = await models.users.update({ id, hashedPassword, role });

      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static register = async (req, res) => {
    const { email, password, role, username, firstname, lastname } = req.body;

    try {
      // TODO validations (length, format...)
      const validUser = await models.users.validate({
        email,
        password,
        role,
        username,
        firstname,
        lastname,
      });
      if (!validUser) {
        return res
          .status(400)
          .send("You must provide a valid email and password");
      }

      // Check if email already exists
      const emailAlreadyUsed = await models.users.emailAlreadyExists(email);
      if (emailAlreadyUsed) {
        return res.status(400).send("Email already Used");
      }

      // Hash password
      const hashedPassword = await models.users.hashPassword(password);

      const [result] = await models.users.insert({
        username,
        firstname,
        lastname,
        email,
        hashedPassword,
        role,
      });
      const [[userCreated]] = await models.users.find(result.insertId);

      delete userCreated.hashedPassword;

      return res.status(201).json(userCreated);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = (req, res) => {
    console.log("delete", req.params.id);
    models.users
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("You must provide an email and a passowrd");
    }
    try {
      const [[user]] = await models.users.findByEmail(email);

      if (!user) {
        return res.status(403).send("Invalid email or password");
      }
      if (await models.users.verifyPassword(password, user.hashedPassword)) {
        // Create token
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.ACCESS_JWT_SECRET,
          { expiresIn: process.env.ACCESS_JWT_EXPIRESIN }
        );
        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            firstname: user.firstname,
          });
      }

      return res.status(403).send("Invalid email or password");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static authorization = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.userId = decoded.id;
      req.userRole = decoded.role;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static isAdmin = (req, res, next) => {
    if (!req.userId || !req.userRole || req.userRole !== "ADMIN") {
      return res.sendStatus(403);
    }

    return next();
  };

  static clearCookie = (req, res) => {
    return res.clearCookie("accessToken").sendStatus(200);
  };

  static isSameId = (req, res, next) => {
    let { id } = req.params;

    id = parseInt(id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).send("You must provide a valid id");
    }

    if (id !== req.userId) {
      return res.sendStatus(403);
    }

    return next();
  };

  static editAvatar = async (req, res) => {
    // on modifie l'user id 3
    const userId = 3;

    try {
      const [result] = await models.user.updateAvatar({
        id: userId,
        avatar: req.pictureData.avatar,
        avatarDescription: req.pictureData.description,
      });
      if (result.affectedRows === 0) {
        return res.status(404).send("user not found");
      }
      const [[userUpdated]] = await models.user.find(userId);
      return res.status(201).json(userUpdated);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = UserController;
