const router = require("express").Router();
const {register, login, logout, refreshAccessToken} = require("../controllers/authControllers");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout/:id", verifyToken, logout);
router.post("/refresh/:id", refreshAccessToken);

module.exports = router;