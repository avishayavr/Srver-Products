const usersModel = require("../models/usersModel");

// get all users
const getData = async (req, res, next) => {
  try {
    const users = await usersModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// get user by id
const getUser = async (req, res, next) => {
    const {id} = req.params
  try {
    const users = await usersModel.findById(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// create new user
const createUser = async(req, res, next)=>{
    const obj = req.body;
    try {
        const newUser = new usersModel(obj);
        await newUser.save();
        res.status(200).json("created");
    } catch (error) {
        next(error);
    }
}
// update user
const updateUser = async(req, res, next)=>{
    const obj = req.body;
    const {id} = req.params;
    try {
        await usersModel.findByIdAndUpdate(id, obj);
        res.status(200).json("user updated");
    } catch (error) {
        next(error);
    }
}
// delete user
const deleteUser = async(req, res, next)=>{
    const {id} = req.params;
    try {
        await usersModel.findByIdAndDelete(id);
        res.status(200).json("user deleted");
    } catch (error) {
        next(error);
    }
}



module.exports = { getData, createUser, getUser, updateUser, deleteUser };
