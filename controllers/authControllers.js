const usersModel = require("../models/usersModel");
const tokensModel = require("../models/refreshModel");
const {
  generateAccessToken,
  generateRefreshAccessToken,
} = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let refreshTokens = [];

// function to refresh token
exports.refreshAccessToken = async (req, res, next) => {
  // getting the refresh token from the user
  const refreshToken = req.body.token;

  // send error if there is no token or its invalid
  if (!refreshToken) return res.status(401).json("you are not authenticated!");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json("refresh token is not valid");

  try {
    jwt.verify(
      refreshToken,
      process.env.ACCESS_REFRESH_TOKEN_KEY,
      (err, user) => {
        err && console.log(err);

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        // generate access token & refresh token
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshAccessToken(user);
        refreshTokens.push(newRefreshToken);

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


// function to log in
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("Email and password required");
  }

  try {
    const user = await usersModel.findOne({ username });
    if (user && user.password === password) {
      // generate access token & refresh token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshAccessToken(user);

      // const newRefreshToken = new tokensModel(refreshToken);
      // await newRefreshToken.save();
      refreshTokens.push(refreshToken);

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
exports.logout = async(req, res, next)=>{
  console.log(refreshTokens);
  const refreshToken = req.body.token;
  try {
    refreshTokens = refreshTokens.filter((token)=>token !== refreshToken);
    console.log(refreshTokens);
    res.status(200).json("user logged out");
  } catch (error) {
    next(error);
  }
}
