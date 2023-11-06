const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUserArea,
    logout,
    deleteUser,
    allUsers,
} = require("../controllers/userController");
const {
    addActivity,
    deleteActivity,
    updateActivity,
} = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

//users
router.post("/register", register); // register a new user
router.post("/login", login); // log in a user
router.get("/logout", protect, logout); // log a user out
router.get("/all-users", protect, allUsers)
router.delete("/myarea/delete-user", protect, deleteUser); // delete a user


//activities
router.get("/myarea", protect, getUserArea); // serve a user their data
router.post("/myarea", protect, addActivity); // add new activities to a user's record
router.patch("/myarea/:id", protect, updateActivity)// update an activity
router.delete("/myarea/:id", protect, deleteActivity); // delete an activity




module.exports = router;
