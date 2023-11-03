const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUserArea,
    logout,
    deleteUser,
} = require("../controllers/userController");
const {
    addActivity,
    deleteActivity,
} = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register); // register a new user
router.post("/login", login); // log in a user
router.get("/logout", protect, logout); // log a user out
router.get("/myarea", protect, getUserArea); // serve a user their data
router.post("/myarea", protect, addActivity); // add new activities to a user's record
// update an activity
router.delete("/myarea/:id", protect, deleteActivity); // delete an activity
router.delete("/myarea/delete-user", protect, deleteUser); // delete a user


// TODO
// show all users
// delete specified user?

module.exports = router;
