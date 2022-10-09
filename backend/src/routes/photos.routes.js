const express = require("express");

const { PhotoController } = require("../controllers");

const router = express.Router();

router.get("/", PhotoController.browse);
router.get("/:id", PhotoController.read);
router.put("/:id", PhotoController.edit);
router.post("/", PhotoController.postPhoto);
router.delete("/:id", PhotoController.delete);

module.exports = router;
