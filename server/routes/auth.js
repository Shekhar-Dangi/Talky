const express = require("express");
const { register, login } = require("../Controllers/auth");
const upload = require("../multer/multer");
const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
module.exports = router;
