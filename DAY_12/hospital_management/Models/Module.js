const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    modulesnames: { type: String, required: true,unique:true},
});

module.exports = mongoose.model("Module", ModuleSchema);