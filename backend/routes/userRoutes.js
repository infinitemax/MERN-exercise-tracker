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
const { getExerciseOptions, getExerciseSuggestions, saveSelectedSuggestion, getLatestSuggestion } = require("../controllers/suggestionController");
const { protect } = require("../middleware/authMiddleware");

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

//Suggestions
router.get('/exercise-options', protect, getExerciseOptions); // fetch exercise options like types and difficulties automatically
router.get('/exercise-suggestions', protect, getExerciseSuggestions); //fetch exercise suggestions based on user-selected criteria
router.post('/save-selected-suggestion', protect, saveSelectedSuggestion);  // save a selected suggestion
router.get('/latest-suggestion', protect, getLatestSuggestion); // fetch latest suggestion for the user

module.exports = router;
