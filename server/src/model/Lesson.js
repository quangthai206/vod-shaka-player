const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video",
  },
});

module.exports = mongoose.model("lesson", LessonSchema);
