const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl1: {
      type: String,
      required: true
    },
    imageUrl2: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter'
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", CourseSchema);
