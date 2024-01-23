import React, { useState, useEffect } from "react";
import Image from "next/image";
import goalsApiClient from "@/goalsApiClinet";

const AddGoalModal = (props) => {
    const { userInfo } = props;

    const [goalType, setGoalType] = useState();
    const [target, setTarget] = useState(0);
    const [activity, setActivity] = useState();
    const [goalPeriod, setGoalPeriod] = useState(0);
    const [goal, setGoal] = useState({});
    const [saveGoal, setSaveGoal] = useState(false);
    const [goalRecordCounter, setGoalRecordCounter] = useState(0);

    useEffect(() => {
        console.log(goal);
    }, [goal]);

    //handle goal submission
    const submitHandler = async (e) => {
        e.preventDefault();
        setSaveGoal(true);
        await setGoal({
            goalType,
            target,
            activity,
            goalPeriod,
        });
        setSaveGoal(false);
        props.handleGoalsUpdate();
        props.toggleGoalModal();
        
    };

    // use effect to stop blank goals being saved
    useEffect(() => {
        const saveNewGoal = async () => {
            await goalsApiClient.addGoal(goal)
            // TODO - update goals list
        };
        if (saveGoal) {
            saveNewGoal()
        }
    }, [saveGoal]);

    return (
        <div className="relative flex justify-center pt-8">
            <div className="bg-white shadow-md absolute z-10 rounded-lg px-6 py-6 h-[480px]">
                <button
                    className="absolute right-2 top-2"
                    onClick={() => props.toggleGoalModal()}
                >
                    <Image
                        src="/close-icon.png"
                        width={15}
                        height={15}
                        alt="logo"
                    />
                </button>
                <form
                    action=""
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h2 className="pb-8 text-3xl text-center text-slate-800">
                        Set a goal!
                    </h2>
                    <ul className="pb-6">
                        <li className="pb-4 goalTypeRadio">
                            <input
                                type="radio"
                                id="repetitionBtn"
                                name="goalTypeBtn"
                                value="repetition"
                                onClick={(e) => {
                                    setGoalType(e.target.value);
                                    setGoalRecordCounter(1)
                                }}
                            />
                            <label htmlFor="repetitionBtn">
                                <strong>Repetition</strong> - set a goal based
                                on how often you want to exercise in a given
                                period
                            </label>
                        </li>
                        <li className="goalTypeRadio">
                            <input
                                type="radio"
                                id="durationBtn"
                                name="goalTypeBtn"
                                value="duration"
                                onClick={(e) => {
                                    setGoalType(e.target.value);
                                    setGoalRecordCounter(1)
                                }}
                            />
                            <label htmlFor="durationBtn">
                                <strong>Duration</strong> - set a goal about how
                                long you want to exercise over a given period
                            </label>
                        </li>
                    </ul>
                    {goalRecordCounter >= 1 && <><div className="pb-4">
                        <label htmlFor="selectActivity" className="pr-2">
                            Do you want to do a specific exercise?
                        </label>
                        <select
                            className="rounded-md border-2 border-slate-300"
                            id="selectActivity"
                            onChange={(e) => {
                                setActivity(e.target.value)
                                setGoalRecordCounter(2)
                            }}
                        >   
                            <option disabled selected value></option>
                            <option value="any">Any</option>
                            <option value="run">Run</option>
                            <option value="cycle">Cycle</option>
                            <option value="weights">Weights</option>
                            <option value="climb">Climb</option>
                            <option value="swim">Swim</option>
                            <option value="box">Box</option>
                            <option value="other">Other</option>
                        </select>
                    </div></>}

                    {goalRecordCounter >= 2 && <><div className="h-6">
                        {goalType === "repetition" && (
                            <div>
                                <label htmlFor="numberOfReps" className="pr-2">
                                    How many times are you going to try to do
                                    it?
                                </label>
                                <input
                                    className="w-12 rounded-md border-2 border-slate-300"
                                    type="number"
                                    id="numberOfReps"
                                    onChange={(e) => {
                                        setTarget(e.target.value);
                                        setGoalRecordCounter(3)
                                    }}
                                ></input>
                            </div>
                        )}
                        {goalType === "duration" && (
                            <div>
                                <label htmlFor="duration">
                                    How long would you like to do it for?{" "}
                                    <input
                                        className="w-12 rounded-md border-2 border-slate-300"
                                        type="number"
                                        id="duration"
                                        onChange={(e) => {
                                            setTarget(e.target.value);
                                            setGoalRecordCounter(3)
                                        }}
                                    ></input>{" "}
                                    minutes
                                </label>
                            </div>
                        )}
                    </div></>}

                    <br />
                    {goalRecordCounter >= 3 && <><label htmlFor="goalPeriod">
                        Over each{" "}
                        <input
                            className="w-12 rounded-md border-2 border-slate-300"
                            type="number"
                            id="goalPeriod"
                            onChange={(e) => {
                                setGoalPeriod(e.target.value);
                                setGoalRecordCounter(4)
                            }}
                        ></input>{" "}
                        day period
                    </label></>}

                    {activity && (
                        <p className="py-8 text-2xl">
                            I, {userInfo.username}, am aiming to
                            {activity === "any" ? " exercise" : ` ${activity}`}
                            {target != 0 && (
                                <>
                                    {target && (
                                        <>
                                            {goalType === "repetition"
                                                ? ` at least ${target} times`
                                                : ` for at least ${target} minutes `}
                                        </>
                                    )}
                                </>
                            )}
                            {goalPeriod != 0 && (
                                <>
                                    {goalPeriod && (
                                        <> every {goalPeriod} days!</>
                                    )}
                                </>
                            )}
                        </p>
                    )}
                    {goalRecordCounter === 4 && <><button
                        type="submit"
                        className="px-4 py-2 mx-auto rounded-full bg-slate-800 hover:bg-slate-500 text-slate-200"
                    >
                        Submit goal!
                    </button></>}
                </form>
            </div>
        </div>
    );
};

export default AddGoalModal;
