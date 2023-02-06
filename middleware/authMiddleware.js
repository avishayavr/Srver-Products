const jwt = require("jsonwebtoken");

require("dotenv").config();

// function to generate access token
exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "40s",
    }
  );
};

// function to generate refresh access token
exports.generateRefreshAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.ACCESS_REFRESH_TOKEN_KEY
  );
};

// function to verify token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};
