const express = require("express");

const { UserController } = require("../controllers");

const router = express.Router();

router.get(
  "/",
  UserController.authorization,
  UserController.isAdmin,
  UserController.browse
);
router.get("/logout", UserController.authorization, UserController.clearCookie);
router.get("/:id", UserController.read);
router.put(
  "/:id",
  UserController.authorization,
  UserController.isSameId,
  UserController.edit
);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.delete("/:id", UserController.delete);

module.exports = router;
