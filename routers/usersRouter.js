const express = require("express");
const router = express.Router();
const {
  getData,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const {verifyToken} = require("../middleware/authMiddleware")

router.get("/", getData);
router.get("/:id", verifyToken, getUser);
router.post("/", createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
