const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fileLink: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("video", VideoSchema );