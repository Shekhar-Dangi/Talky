const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  contacts: {
    default: ["test@gmail.com"],
    type: Array,
  },
  lastSeen: {
    type: String,
    default: "online",
  },
  image: String,
});

module.exports = mongoose.model("user", UserSchema);
