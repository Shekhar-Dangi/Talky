const User = require("../models/User");
const moment = require("moment");

const addContact = async (req, res) => {
  const { email } = req.body;
  const checkUser = await User.findOne({ email });
  if (!checkUser) return res.status(401).json({ message: "User not found!" });
  const userEmail = req.tokenData.email;
  const user = await User.updateOne(
    { email: userEmail },
    { $push: { contacts: email } }
  );
  const user2 = await User.updateOne(
    { email },
    { $push: { contacts: userEmail } }
  );
  res.status(200).json({ user, user2 });
};

const getContacts = async (req, res) => {
  const email = req.tokenData.email;
  const user = await User.findOne({ email });
  res.status(200).json({ contacts: user.contacts });
};

const getDetails = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email }).select("email name lastSeen image");
  res.status(200).json({ user });
};

const setLastSeen = async (req, res) => {
  const email = req.tokenData.email;
  const { online } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    { lastSeen: online ? "online" : moment().format("HH:mm") }
  ).select("email name lastSeen");
  res.status(200).json({ user });
};

module.exports = { addContact, getContacts, getDetails, setLastSeen };
