const express = require("express");

const { UserhasgameController } = require("../controllers");

const router = express.Router();

router.get("/:id", UserhasgameController.browse);
router.get("/user/:id", UserhasgameController.browseNameList);
router.get("/detailGame/:id", UserhasgameController.read);
router.put("/:id", UserhasgameController.edit);
router.post("/", UserhasgameController.add);
router.delete("/:id", UserhasgameController.delete);

module.exports = router;
