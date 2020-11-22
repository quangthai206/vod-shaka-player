const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [
    {
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
    },
  ],
});

module.exports = mongoose.model("chapter", ChapterSchema);
