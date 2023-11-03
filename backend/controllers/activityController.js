const { Activity } = require("../models/Activity");
const { User } = require("../models/User")

// ADD AN ACTIVITY - PROTECTED
// when a user adds an activity it is saved to the activiites collection, and the id of that activity is pushed to the user's activity array.
exports.addActivity = async (req, res) => {
    const { activity, duration, intensity, notes } = req.body
    
    // get user id from req (middleware)
    const userId = req.userId
    
    try {
        // add activity to activities collection
        const newActivity = new Activity({
            activity,
            duration,
            intensity,
            notes,
            user: userId
        });
        await newActivity.save();
        console.log(`newActivity._id = ${newActivity._id}`);

        // save activity id to user
        await User.findByIdAndUpdate(
            userId,
            { $push: { activities: newActivity._id }})
        
        const currentUser = await User.findById(userId)
            
        return res.status(200).json({
            status: 200,
            message: "activity successfully saved"
        })

        // I'm here - need to work out how to push the id to the user's activities array.
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "activity could not be saved due to an internal server error, please try again later."
        })
    }

}

// DELETE AN ACTIVITY - PROTECTED
// user can click an activity and it is deleted.
exports.deleteActivity = async (req, res) => {
    // NOTE - the id is coming from the url param, but is this the best/right approach? TBC...
    const activityToDelete = req.params.id
    
    console.log(`we are going to delete id: ${activityToDelete}`)

    // find the activity and delete it
    const deleted = await Activity.findByIdAndDelete(activityToDelete).exec()
    
    res.send(deleted)
    // does the user activity array need updating? No! Mega.
    
}

// UPDATE AN ACTIVITY - PROTECTED
