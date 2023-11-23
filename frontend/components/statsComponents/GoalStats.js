"use client"
import React, { useState, useEffect } from "react";

const GoalStats = (props) => {

    const [goals, setGoals] = useState("")
    const [loading, setLoading] = useState(true)

    // const goals = props.userWithStats.checkAllGoals();

    useEffect(() => {
        setGoals(props.userWithStats.checkAllGoals())
        setLoading(false)
    }, [])

    return (
        <div className="p-2 font-light bg-white rounded-lg shadow-md w-96 text-slate-200">
            <h1 className="text-black">Your goals</h1>
            {!loading && <><p className="text-black">
                You are currently meeting {goals.completed} out of {goals.total} goals
            </p>
            {goals.goalsWithCompletion.map((goal, index) => {
                const activity = goal.activity.toUpperCase()
                return (
                    
                <p className="text-black">{index + 1}. {activity}: {goal.completion}%</p>
                )
            })}</>}
        </div>
    );
};

export default GoalStats;
