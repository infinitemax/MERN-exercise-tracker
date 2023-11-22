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
        <div className="bg-slate-600 border-2 border-slate-700 w-96 rounded-lg text-slate-200 p-2 font-light">
            <h1>Your goals</h1>
            {!loading && <><p>
                You are currently meeting {goals.completed} out of {goals.total} goals
            </p>
            {goals.goalsWithCompletion.map((goal, index) => {
                const activity = goal.activity.toUpperCase()
                return (
                    
                <p>{index + 1}. {activity}: {goal.completion}%</p>
                )
            })}</>}
        </div>
    );
};

export default GoalStats;
