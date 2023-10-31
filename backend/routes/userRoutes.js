const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userController")


router.post("/register", register) // register a new user.

module.exports = router;