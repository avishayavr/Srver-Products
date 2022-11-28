const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://avishayav:mymdbaccount99@cluster0.mlivppk.mongodb.net/productsDB?retryWrites=true&w=majority", () => {
    console.log("Connected to Database")
})