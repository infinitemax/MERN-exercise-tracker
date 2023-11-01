const express = require("express");
const router = express.Router();
const { register, login, getUserArea } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")


router.post("/register", register) // register a new user
router.post("/login", login) // log in a user
router.get("/myarea", protect, getUserArea) // serve a user their data


module.exports = router;