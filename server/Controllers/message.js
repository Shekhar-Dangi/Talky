const Message = require("../models/Message");

const addMessage = async (req, res) => {
  try {
    const email = req.tokenData.email;
    const { to, message } = req.body;
    const data = await Message.create({ from: email, to, message, message });
    res.status(201).json({ message: data });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getMessages = async (req, res) => {
  try {
    const email = req.tokenData.email;
    const { emails } = req.query;
    const messages = {};
    for (let i = 0; i < emails.length; i++) {
      messages[emails[i]] = await Message.find({
        to: { $in: [emails[i], email] },
        from: { $in: [emails[i], email] },
      });
    }
    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

const updateSeen = async (req, res) => {
  try {
    const email = req.tokenData.email;
    const { id } = req.body;
    const message = await Message.findByIdAndUpdate(id, { seen: true });
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const updateMultiSeen = async (req, res) => {
  try {
    const { ids } = req.body;
    const message = await Message.updateMany(
      {
        _id: { $in: ids },
      },
      { $set: { seen: true } }
    );
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { addMessage, getMessages, updateSeen, updateMultiSeen };
