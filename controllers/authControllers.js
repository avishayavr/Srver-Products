const usersModel = require("../models/usersModel");
const {
  generateAccessToken,
  generateRefreshAccessToken,
} = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// function to refresh token
exports.refreshAccessToken = async (req, res, next) => {
  // getting the refresh token from the user
  const refreshToken = req.body.token;

  // send error if there is no token or its invalid
  if (!refreshToken) return res.status(401).json("you are not authenticated!");

  try {
    // get the user
    const currentUser = await usersModel.findById(req.params.id);
    if (!currentUser.refreshToken.includes(refreshToken))
      return res.status(403).json("refresh token is not valid");

    jwt.verify(
      refreshToken,
      process.env.ACCESS_REFRESH_TOKEN_KEY,
      async (err, user) => {
        err && console.log(err);

        console.log(currentUser);
        //  deleting the current refresh token
        currentUser.refreshToken = currentUser.refreshToken.filter(
          (token) => token !== refreshToken
        );

        // generate access token & refresh token
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshAccessToken(user);

        // updating the data
        currentUser.refreshToken.push(newRefreshToken);
        await usersModel.findByIdAndUpdate(currentUser._id, currentUser);

        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

// function to register (create new user)
exports.register = async (req, res, next) => {
  const data = req.body;
  if (!data.email || !data.password) res.status(400).json(`Email and password required!`);

  // console.log(data.email);
  const users = await usersModel.find({} );
  const user = users.filter((user) => user.username = data.username);
  if (user) res.status(400).json("User exist!");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    data.password = hashedPassword;
    const newUser = usersModel(data);
    await newUser.save();
    res.status(200).json("user created");
  } catch (error) {
    next(error);
  }
};

// function to log in
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("Email and password required");
  }

  try {
    const user = await usersModel.findOne({ username });
    console.log(password);
    if (user
      //  && await bcrypt.compare(password, user.password)
      ) {
      // generate access token & refresh token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshAccessToken(user);

      //  adding refresh token to the user data
      user.refreshToken.push(refreshToken);
      await usersModel.findByIdAndUpdate(user._id, user);

      res.json({
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json("Username or password incorrect!");
    }
  } catch (error) {
    next(error);
  }
};

// function to log out
exports.logout = async (req, res, next) => {
  const refreshToken = req.body.token;
  try {
    // get the user
    const currentUser = await usersModel.findById(req.params.id);

    // deleting the tokens and updating the data
    currentUser.refreshToken = currentUser.refreshToken.filter(
      (token) => token !== refreshToken
    );
    await usersModel.findByIdAndUpdate(currentUser._id, currentUser);
    res.status(200).json("user logged out");
  } catch (error) {
    next(error);
  }
};
