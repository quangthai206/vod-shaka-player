const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course'
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lesson'
    }
  ],
});

module.exports = mongoose.model("chapter", ChapterSchema);
