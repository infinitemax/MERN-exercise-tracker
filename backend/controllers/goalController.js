const { Goal } = require("../models/Goals");
const { User } = require("../models/User")

exports.setGoal = async (req, res) => {

    const { goalType, activity, target, goalPeriod } = req.body.goal;

    const { userId } = req;

    try {
        // add a goal to the goals collection
        const newGoal = new Goal({
            goalType,
            activity,
            target,
            goalPeriod,
            userId,
        });

        console.log('New goal:')
        console.log(newGoal);
        await newGoal.save();
        console.log(`new goal._id = ${newGoal._id}`);

        // save goal to user
        await User.findByIdAndUpdate(
            userId,
            { $push: { goals: newGoal._id}}
        )
        
        return res.status(200).json({
            status: 200,
            message: "goal successfully saved"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "goal could not be saved due to an internal server error, please try again later."
        })
    }
};

exports.displayGoals = async (req, res) => {
    const { userId } = req;

    if (!userId) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorised"
        })
    }

    try {
        const user = await User.findById(userId).populate("goals")

        return res.status(200).json({
            message: "user goals route",
            username: user.username,
            user,
            goals: user.goals
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "error retrieving goals."
        })
    }
}


exports.deleteGoal = async (req, res) => {
    const { userId }= req
    const goalToDelete = req.params.id

    console.log(`attempting to delete goal: ${goalToDelete}`);

    try {
        
        // delete goal
        const deleted = await Goal.findByIdAndDelete(goalToDelete).exec()
        
        // remove link from user
        const user = await User.findById(userId)
        user.goals.pull(goalToDelete)
        user.save()

        res.send(user.goal)
    } catch(error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "goal could not be deleted due to an internal server error, please try again later."
        })
    }
}