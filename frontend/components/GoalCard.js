"use client"
import React, { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";
import Image from "next/image";


const GoalCard = (props) => {

    const { goal } = props


    // handle confirm delete
    const [clickCount, setClickCount] = useState(0);

    const handleDeleteClick = () => {
        setClickCount(clickCount + 1);
    };

    const deleteModalHanadler = (buttonChoice) => {
        console.log(buttonChoice)
        if (buttonChoice) {
          setClickCount(clickCount + 1)
        } else {
          setClickCount(0)
        }
    }

    useEffect(() => {
        if (clickCount > 1) {
            console.log("time to delete!");
            props.deleteGoalHandler(); // need to add
            props.handleGoalsUpdate();
            return;
        }
    }, [clickCount]);

    return (
        <>
            <div className="px-4 py-6 rounded-lg bg-teal-700 text-slate-200 border-2 border-teal-800 relative">
            {clickCount === 0 ? <button
                        className="absolute top-2 right-2"
                        onClick={() => {
                            handleDeleteClick();
                            ;
                        }}
                    >
                        <Image
                            src="/close-icon.png"
                            width={15}
                            height={15}
                            alt="logo"
                        />
                    </button> : <ConfirmModal 
                      deleteModalHanadler={(buttonClicked) => {deleteModalHanadler(buttonClicked)}}
                    />}
                <p>I would like to:</p>
                <p>{goal.activity === "any" ? "exercise" : <>{goal.activity}</>}</p>
                {/* repetition goals: */}
                {goal.goalType === 'repetition' && <p>{goal.target} times</p>}
                {/* duration goals: */}
                {goal.goalType === 'duration' && (
                    <p>for {goal.target} minutes</p>
                )}
                <p>
                    every {goal.goalPeriod}{" "}
                    {goal.goalPeriod > 1 ? "days" : "day"}
                </p>
                
            </div>
        </>
    );
};

export default GoalCard;
