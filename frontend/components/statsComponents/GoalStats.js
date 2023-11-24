"use client";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "@ramonak/react-progress-bar";


const GoalStats = (props) => {
    const [goals, setGoals] = useState("");
    const [loading, setLoading] = useState(true);
    const [goalStrings, setGoalStrings] = useState([]);
    const [update, setUpdate] = useState(false);

    // const goals = props.userWithStats.checkAllGoals();

    const getGoalsData = () => {
        setGoals(props.userWithStats.checkAllGoals());
        setLoading(false);
    };

    // load goals and goal strings
    useEffect(() => {
        getGoalsData();
    }, []);

    useEffect(() => {
        console.log(goals);
        setGoalStrings(createGoalStrings(goals));
    }, [goals]);

    //update goals and strings when record is used in parent (myarea page)

    useEffect(() => {
        getGoalsData();
    }, [props.updateChildren]);


    // useEffect(() => {
    //     setGoals((prevGoals) => props.userWithStats.checkAllGoals());
    // }, [goals])

    const createGoalStrings = (input) => {
        if (input.goalsWithCompletion) {
            const goalStringsArray = input.goalsWithCompletion.map((goal) => {
                let exercise = "";
                if (goal.activity === "any") {
                    exercise = "exercise";
                } else {
                    exercise = goal.activity;
                }
                exercise =
                    exercise.split("")[0].toUpperCase() + exercise.slice(1);

                if (goal.goalType === "repetition") {
                    return `${exercise} ${goal.target} times every ${goal.goalPeriod} days`;
                }
                if (goal.goalType === "duration") {
                    return `${exercise} for ${goal.target} minutes every ${goal.goalPeriod} days`;
                }
            });

            return goalStringsArray;
        }
    };

    return (
        <div className="p-6 font-light  rounded-lg bg-gradient-to-b from-white to-[#f2fff9] shadow-md border-slate-700 w-96 text-slate-200">
            <h3 className="pb-2 text-3xl text-emerald-400">Your goals</h3>
            <hr className="h-1 my-1 border-0 rounded bg-slate-600" />
            {!loading && (
                <>
                    <div className="flex flex-wrap gap-2 my-4">
                        <div className="w-[48%] flex items-center">
                            <p className="text-xl font-extralight text-slate-950">
                                You are currently meeting {goals.completed} of
                                your {goals.total} goals
                            </p>
                        </div>
                        <div className="w-[48%]">
                            <CircularProgressbar
                                value={goals.completed}
                                maxValue={goals.total}
                                text={`${goals.completed}/${goals.total}`}
                            />
                        </div>
                    </div>
                    <hr className="h-1 my-1 border-0 rounded bg-slate-600" />

                    {goals.goalsWithCompletion.map((goal, index) => {
                        return (
                            <div key={goal._id}>
                                <p className="py-2 text-slate-950">
                                    {goalStrings && goalStrings[index]}
                                </p>
                                <ProgressBar
                                    completed={goal.completion}
                                    bgColor="#34d399"
                                    baseBgColor="#64748b"
                                    labelColor="#334155"

                                />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default GoalStats;
