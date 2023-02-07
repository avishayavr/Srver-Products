const router = require("express").Router();
const {login, logout, refreshAccessToken} = require("../controllers/authControllers");
const {verifyToken} = require("../middleware/authMiddleware");


router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/refresh", refreshAccessToken);

module.exports = router;