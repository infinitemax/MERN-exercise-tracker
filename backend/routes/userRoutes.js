const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUserArea,
    logout,
    deleteUser,
    allUsers,
    updateUser,
} = require("../controllers/userController");
const {
    addActivity,
    deleteActivity,
    updateActivity,
} = require("../controllers/activityController");
const { getExerciseSuggestions } = require("../controllers/suggestionController");
const { protect } = require("../middleware/authMiddleware");
const { setGoal, displayGoals, deleteGoal } = require("../controllers/goalController");

//users
router.post("/register", register); // register a new user
router.post("/login", login); // log in a user
router.get("/logout", protect, logout); // log a user out
router.get("/all-users", protect, allUsers)
router.delete("/myarea/delete-user", protect, deleteUser); // delete a user
router.patch("/settings", protect, updateUser) // update a user


//activities
router.get("/myarea", protect, getUserArea); // serve a user their data
router.post("/myarea", protect, addActivity); // add new activities to a user's record
router.patch("/myarea/:id", protect, updateActivity)// update an activity
router.delete("/myarea/:id", protect, deleteActivity); // delete an activity


//goals
router.post("/goals", protect, setGoal);// add user's goals
router.get("/goals", protect, displayGoals);// get user's goals
router.delete("/goals/:id", protect, deleteGoal)// delete user's goals
// edit user's goals

router.get('/exercise-suggestions', protect, getExerciseSuggestions);




module.exports = router;
