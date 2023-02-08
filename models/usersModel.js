const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    // _id:String,
    username:{ type: String, required: true },
    email:{ type: String, required: false },
    phone:{ type: String, required: false },
    password:{ type: String, required: true },
    isAdmin:{type:Boolean, required:true},
    refreshToken:[{type:String, required:false}]
})

const model = mongoose.model("users", usersSchema);
module.exports = model;
