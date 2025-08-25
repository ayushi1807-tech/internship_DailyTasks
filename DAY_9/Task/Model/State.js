const mongoose = require("mongoose");
const stateSchema = new mongoose.Schema(
  {
    name: { type: String,  },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true }
  },
  { timestamps: true }
);
module.exports = mongoose.model("State", stateSchema);
//689d85e7cb7d13eb11f5f64a