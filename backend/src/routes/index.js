const express = require("express");

const gameRoutes = require("./games.routes");
const userRoutes = require("./users.routes");
const photoRoutes = require("./photos.routes");
const userhasgameRoutes = require("./userhasgames.routes");

const router = express.Router();

router.use("/game", gameRoutes);
router.use("/user", userRoutes);
router.use("/photo", photoRoutes);
router.use("/userhasgame", userhasgameRoutes);

module.exports = router;
