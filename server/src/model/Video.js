const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    fileLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("video", VideoSchema);
