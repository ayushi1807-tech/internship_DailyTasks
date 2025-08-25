const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {},
    age: {},
    course: {
          type: String,
          enum: ["CSE", "CS", "IT", "AI_ML", "DATA_SCIENCE", "CE"]
    }
});
const User = mongoose.model('User', userSchema);
module.exports = {User}
