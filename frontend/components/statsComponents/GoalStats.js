"use client";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GoalStats = (props) => {
    const [goals, setGoals] = useState("");
    const [loading, setLoading] = useState(true);

    // const goals = props.userWithStats.checkAllGoals();

    useEffect(() => {
        setGoals(props.userWithStats.checkAllGoals());
        setLoading(false);
    }, []);

    const circleText = 8;

    return (
        <div className="bg-slate-600 border-2 border-slate-700 w-96 rounded-lg text-slate-200 p-6 font-light">
            <h3 className="text-3xl text-emerald-400 pb-2">Your goals</h3>
            <hr className="h-1 bg-sky-600 my-1 border-0 rounded " />
            {!loading && (
                <>
                    <div className="flex flex-wrap gap-2 my-4">
                        <div className="w-[48%] flex items-center">
                            <p className="text-xl font-extralight">
                                You are currently meeting {goals.completed} of your {goals.total}{" "}
                                goals
                            </p>
                        </div>
                        <div className="w-[48%]">
                            <CircularProgressbar value={goals.completed} maxValue={goals.total} text={`${goals.completed}/${goals.total}`} />
                        </div>
                    </div>
                    <hr className="h-1 bg-sky-600 my-1 border-0 rounded " />
                    
                    {goals.goalsWithCompletion.map((goal, index) => {
                        const activity = goal.activity.toUpperCase();
                        return (
                            <p key={goal._id}>
                                {index + 1}. {activity}: {goal.completion}%
                            </p>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default GoalStats;
