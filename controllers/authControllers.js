const express = require("express");
const usersModel = require("../models/usersModel");
const { generateAccessToken, generateRefreshAccessToken } = require("../middleware/authMiddleware");
let refreshTokens = [];

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
      refreshTokens.push(refreshToken);

      res.json({ username: user.username, isAdmin:user.isAdmin, accessToken, refreshToken });
    } else {
      res.status(400).json("Username or password incorrect!");
    }
  } catch (error) {
    next(error);
  }
};
