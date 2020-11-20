const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseScheama = new Schema(
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
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chapters: [
      {
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", CourseScheama);
