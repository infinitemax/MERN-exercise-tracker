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
        <div className="bg-slate-600 border-2 border-slate-700 w-96 rounded-lg text-slate-200 p-6 font-light">
            <h3 className="text-3xl text-emerald-400 pb-2">Your goals</h3>
            <hr className="h-1 bg-sky-600 my-1 border-0 rounded " />
            {!loading && <><p>
                You are meeting {goals.completed} out of {goals.total} goals
            </p>
            {goals.goalsWithCompletion.map((goal, index) => {
                const activity = goal.activity.toUpperCase()
                return (
                    
                <p key={goal._id}>{index + 1}. {activity}: {goal.completion}%</p>
                )
            })}</>}
        </div>
    );
};

export default GoalStats;
