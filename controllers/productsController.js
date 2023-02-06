const productsModel = require("../models/productsModel");

// function for getting data
exports.getAllData = async (req, res, next) => {
  try {
    const products = await productsModel.find({});
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// function to getting data by id
exports.getDataById = async (req, res, next) => {
  const { id } = req.params;
  try {
    // if (req.product._id === req.params.id){
    const product = await productsModel.findById(id);
    res.status(200).json(product);
    // }
    // res.status(401).json('product not authorized');
  } catch (error) {
    next(error);
  }
};

// function to create item
exports.createProduct = async (req, res, next) => {
  const obj = req.body;
  try {
    const newProduct = new productsModel({
      title: obj.title,
      price: obj.price,
      image: obj.image,
    });

    await newProduct.save();
    res.status(200).json("created");
  } catch (error) {
    next(error);
  }
};

// function to update item
exports.updateProduct = async (req, res, next) => {
  const obj = req.body;
  const { id } = req.params;
  try {
    // if(req.product._id === id){
    await productsModel.findByIdAndUpdate(id, obj);
    res.status(200).json("product updated");
    // }
    // res.status(401).json('product not authorized');
  } catch (error) {
    next(error);
  }
};

// function to delete product
exports.deleteProduct = async (req, res, next) => {
  const {id} = req.params
  try {
    // if (req.product._id === id) {
      await productsModel.findByIdAndDelete(id);
      res.status(200).json("product Deleted");
    // }
    // res.status(401).json("product not authorized");
  } catch (err) {
    next(err);
  }
};


