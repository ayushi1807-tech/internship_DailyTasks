const { required } = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    age: { type: Number, required: true },
    phone: {type: String, required:true},
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Std_table", studentSchema);
