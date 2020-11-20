const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
