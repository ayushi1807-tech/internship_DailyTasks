const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      unique: true,
      required: true   // (you wrote `require: true`, it should be `required`)
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
