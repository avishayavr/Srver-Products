const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    // _id:String,
    title:String,
    price:Number,
    image:String
})

const model = mongoose.model("products", productsSchema);
module.exports = model;
