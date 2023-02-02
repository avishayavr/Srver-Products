const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://avishayav:mymdbaccount99@cluster0.mlivppk.mongodb.net/productsDB?retryWrites=true&w=majority", () => {
     try {
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
  }
})