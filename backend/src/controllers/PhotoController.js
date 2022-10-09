/* eslint-disable no-restricted-syntax */
const jwt = require("jsonwebtoken");
const fs = require("fs");

const path = require("path");
const multer = require("multer");
const models = require("../models");

const postPhotoObject = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, null, path.join(__dirname, "../../public/assets/images/"));
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage }).single("file");
  upload(req, res, next, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      next();
    }
  });
};

const checkFile = (filename) => {
  try {
    fs.accessSync(
      path.join(__dirname, `../../public/assets/images/${filename}`)
    );
    return true;
  } catch (err) {
    return false;
  }
};

const deleteFile = (filename) => {
  if (checkFile(filename)) {
    fs.unlinkSync(
      path.join(__dirname, `../../public/assets/images/${filename}`)
    );
  }
  return true;
};

// Where Storage is located
const storage = multer.diskStorage({
  destination: (req, files, callback) => {
    callback(null, path.join(__dirname, "../../public/assets/images/"));
  },
  filename: (req, files, callback) => {
    req.body.name = `${Date.now()}_${files.originalname}`;
    callback(null, req.body.name);
  },
});

const checkFileType = (files, callback) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(
    path.extname(files.originalname).toLowerCase()
  ); // test() vérifie correspondance
  const mimetype = filetypes.test(files.mimetype); // mimetype example : jpg => 'images/jpg'

  if (extname && mimetype) {
    return callback(null, true);
  }
  return callback(
    "Error: Only images with the following extension : .jpeg, .jpg, .png"
  );
};

// Multer stuff
const upload = multer({
  storage,
  limits: { fileSize: 32000000 }, // Max size 32 Mo, here counted as bytes
  fileFilter: (data, files, callback) => {
    checkFileType(files, callback);
  },
}).single("image"); // <input name="image" type="file">

class PhotoController {
  // CRUD : Create, Read, Update, Delete

  static add = async (req, res) => {
    const photo = req.body;

    try {
      const fileState = await checkFile(req.body.name);
      if (!fileState) {
        return res.status(400).send("Problem with the file upload");
      }
      const object = await models.photos.validate({ ...photo });
      if (!object) {
        deleteFile(req.body.name);
        return res
          .status(400)
          .send("One of the required data is missing or incorrect");
      }
      const [result] = await models.photos.insert(photo);
      const [[photoCreated]] = await models.photos.find(result.insertId);
      return res.status(201).send(photoCreated);
    } catch (err) {
      deleteFile(req.body.name);
      return res.status(501).send(err.message);
    }
  };

  static postPhoto = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log("obj", obj);
    const photo = {
      name: obj.name,
      description: obj.description,
      games_id: obj.games_id,
    };
    console.log("photo", photo);
    try {
      const object = await models.photos.validate({ ...photo });
      console.log("object", object);
      if (!object) {
        return res
          .status(400)
          .send("One of the required data is missing or incorrect");
      }
      const [result] = await models.photos.insert(photo);
      const [[photoCreated]] = await models.photos.find(result.insertId);
      res.status(201).send(photoCreated);
    } catch (err) {
      res.status(501).send(err.message);
    }
    return next();
  };

  static browse = async (req, res) => {
    try {
      const [result] = await models.photos.findAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static read = async (req, res) => {
    const { id } = req.params;

    try {
      const [result] = await models.photos.find(id);
      if (!result[0]) {
        return res.sendStatus(404);
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static edit = async (req, res) => {
    try {
      const photoId = req.params.id;
      const photo = req.body;
      const [result] = await models.photos.find(photoId);
      if (!result) {
        return res.sendStatus(404);
      }
      const validUser = await models.photos.validate(photo, false);
      if (!validUser) {
        return res.sendStatus(400);
      }
      await models.photos.update(photo, photoId);
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;

    try {
      const [photo] = await models.photos.find(id);
      if (!photo[0]) {
        return res.status(400).send("Sector clear");
      }
      deleteFile(photo[0].name);
      return models.photos.delete(photo[0].id).then(() => {
        return res.sendStatus(204);
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static uploadImage = (req, res, next) => {
    console.log("req.body", req.body);
    postPhotoObject(req, res, (err) => {
      if (err) {
        return res.status(400).send(err);
      }
      req.body = { name: req.body.name, ...JSON.parse(req.body.description) };
      console.log("name", req.body.description);

      return next();
    });
  };

  // General Authorisation

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

  // Role Authorisation

  static isAdmin = (req, res, next) => {
    if (!req.userId || req.userRole !== "ADMIN") {
      return res.sendStatus(403);
    }

    return next();
  };
}

module.exports = PhotoController;
