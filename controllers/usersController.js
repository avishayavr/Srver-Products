const usersModel = require("../models/usersModel");

// get all users
exports.getData = async (req, res, next) => {
  try {
    const users = await usersModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// get user by id
exports.getUser = async (req, res, next) => {
  try {
    if(req.user.id !== req.params.id && !req.user.isAdmin) return res.status(401).json('user not authorized');
    const user = await usersModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// create new user
exports.createUser = async(req, res, next)=>{
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
exports.updateUser = async(req, res, next)=>{
    const obj = req.body;
    try {
      if(req.user.id !== req.params.id) return res.status(401).json('user not authorized');
        await usersModel.findByIdAndUpdate(req.params.id, obj);
        res.status(200).json("user updated");
    } catch (error) {
        next(error);
    }
}
// delete user
exports.deleteUser = async(req, res, next)=>{
    try {
      if(req.user.id !== req.params.id && !req.user.isAdmin) return res.status(401).json('user not authorized');
        await usersModel.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted");
    } catch (error) {
        next(error);
    }
}
