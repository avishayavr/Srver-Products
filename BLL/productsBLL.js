const productsModel = require("../models/productsModel");

// function for getting data
exports.getAllData = async () => {
  return await productsModel.find({});
};

// function to getting data by id
exports.getDataById = async (id) => {
  return await productsModel.findById(id);
};

// function to create item
exports.createProduct = async (obj) => {
  try {
    const newProduct = new productsModel({
      title: obj.title,
      price: obj.price,
      quantity: obj.quantity,
      image: obj.image,
    });

    await newProduct.save();
    return "created";
  } catch (error) {
    return `${error}`;
  }
};

// function to update item
exports.updateProduct = async (id, obj) => {
  try {
    await productsModel.findByIdAndUpdate(id, obj);
    return "product updated";
  } catch (error) {
    return `${error}`;
  }
};

// function to delete product
exports.deleteProduct = async (id) => {
  try {
    await productsModel.findByIdAndDelete(id);
    return "deleted";
  } catch (error) {
    return `${error}`;
  }
};
