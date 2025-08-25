const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Country", countrySchema);

//689d815a10a5291d476e8b10