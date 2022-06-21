const moment = require("moment");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    require: true,
  },
  timeStamp: {
    type: String,
    default: moment().format("HH:mm"),
  },
  message: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("message", MessageSchema);
