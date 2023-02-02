const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    // _id:String,
    userName:{ type: String, unique: true },
    email:{ type: String, unique: true },
    password:{ type: String, unique: true },
})

const model = mongoose.model("users", usersSchema);
module.exports = model;
