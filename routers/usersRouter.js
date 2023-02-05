const express = require("express");
const router = express.Router();
const {
  getData,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getData);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
