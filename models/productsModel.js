const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    // _id:{type:mongoose.Types.ObjectId, required:false},
    title:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:String, required:true}
})

const model = mongoose.model("products", productsSchema);
module.exports = model;
