const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema({
   refreshToken:{type:String, required:true}
})

const model = mongoose.model("tokens", tokensSchema);
module.exports = model;
