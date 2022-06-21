const express = require("express");
const {
  addMessage,
  getMessages,
  updateSeen,
  updateMultiSeen,
} = require("../Controllers/message");
const validateToken = require("../Middlewares/auth");
const router = express.Router();

router.post("/send", validateToken, addMessage);
router.get("/recieve", validateToken, getMessages);
router.put("/updateSeen", validateToken, updateSeen);
router.put("/updateMultiSeen", validateToken, updateMultiSeen);

module.exports = router;
