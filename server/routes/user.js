const express = require("express");
const {
  addContact,
  getContacts,
  getDetails,
  setLastSeen,
} = require("../Controllers/user");
const validateToken = require("../Middlewares/auth");
const router = express.Router();

router.put("/addContact", validateToken, addContact);
router.get("/getContacts", validateToken, getContacts);
router.get("/getDetails", validateToken, getDetails);
router.put("/setLastSeen", validateToken, setLastSeen);

module.exports = router;
