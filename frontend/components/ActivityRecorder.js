"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Slider from "./Slider";
import DateSelect from "./DateSelect";
import apiClient from "@/apiClient";


const ActivityRecorder = (props) => {
    // state for when "other" activity is selected, to bring up or hide the "other" input box
    const [other, setOther] = useState(false);

    // various states for the different form elements
    const [pickedActivity, setPickedActivity] = useState();
    const [pickedDuration, setPickedDuration] = useState();
    const [pickedIntensity, setPickedIntensity] = useState();
    const [pickedDate, setPickedDate] = useState(new Date());
    const [notes, setNotes] = useState();
    const [activityData, setActivityData] = useState({});
    const [saveRecord, setSaveRecord] = useState(false)

    // SETTING AND GETTING THE DATE
    // function to capture date
    const getDate = async (date) => {
        setPickedDate(date);
    };

    // GETTING SLIDER VALUES
    const getDuration = async (value) => {
        setPickedDuration(value);
    };
    const getIntensity = async (value) => {
        setPickedIntensity(value);
    };

    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();
        setSaveRecord(true)
        await setActivityData({
            activity: pickedActivity,
            duration: pickedDuration,
            intensity: pickedIntensity,
            date: pickedDate,
            notes: notes
        });
        props.closeRecorder();
        setSaveRecord(false)
    };

    // this use effect stops blank activities being recorded when the activity recorder is opened.
    useEffect(() => {
        const callSave = async () => {
            await apiClient.saveUserActivity(activityData);
            props.handleActivityUpdate()
        }
        if (saveRecord) {
            callSave()
        }
    }, [saveRecord])


    return (
        <div className="relative flex justify-center">
            <div className="absolute z-10 px-6 py-6 mt-24 border-2 md:w-96 rounded-lg shadow-md bg-gradient-to-b from-white to-[#f2fff9] border-teal-50">
                {/* BTN TO CLOSE RECORDER */}
                <button
                    className="absolute right-2 top-2"
                    onClick={() => props.closeRecorder()}
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
                    <h2 className="text-3xl text-center text-slate-800">
                        Record an activity
                    </h2>
                    {/* BUTTONS FOR ACTIVITY */}
                    <ul className="flex flex-wrap justify-center gap-6 activityBtns">
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="runBtn"
                                name="activtyBtn"
                                value="run"
                                onClick={(e) => {
                                    setOther(false);
                                    setPickedActivity(e.target.value);
                                }}
                            />
                            <label htmlFor="runBtn"><Image 
                                src="/activity-icons/running-icon.png"
                                width={30}
                                height={30}
                                alt="running icon"
                            /></label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="cylceBtn"
                                name="activtyBtn"
                                value="cycle"
                                onClick={(e) => {
                                    setOther(false);
                                    setPickedActivity(e.target.value);
                                }}
                            />
                            <label htmlFor="cylceBtn"><Image 
                                src="/activity-icons/cycling-icon.png"
                                width={30}
                                height={30}
                                alt="cycling icon"
                            /></label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="weightsBtn"
                                name="activtyBtn"
                                value="weights"
                                onClick={(e) => {
                                    setOther(false);
                                    setPickedActivity(e.target.value);
                                }}
                            />
                            <label htmlFor="weightsBtn"><Image 
                                src="/activity-icons/weight-icon.png"
                                width={30}
                                height={30}
                                alt="weights icon"
                            /></label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="climbBtn"
                                name="activtyBtn"
                                value="climb"
                                onClick={(e) => {
                                    setOther(false);
                                    setPickedActivity(e.target.value);
                                }}
                            />
                            <label htmlFor="climbBtn"><Image 
                                src="/activity-icons/climb-icon.png"
                                width={30}
                                height={30}
                                alt="climbing icon"
                            /></label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="swimBtn"
                                name="activtyBtn"
                                value="swim"
                                onClick={(e) => {
                                    setOther(false);
                                    setPickedActivity(e.target.value);
                                }}
                            />
                            <label htmlFor="swimBtn"><Image 
                                src="/activity-icons/swimming-icon.png"
                                width={30}
                                height={30}
                                alt="swimming icon"
                            /></label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="boxBtn"
                                name="activtyBtn"
                                value="boxing"
                                onClick={(e) => {
                                    setOther(false);
                                    setPickedActivity(e.target.value);
                                }}
                            />
                            <label htmlFor="boxBtn"><Image 
                                src="/activity-icons/boxing-icon.png"
                                width={30}
                                height={30}
                                alt="boxing icon"
                            /></label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="otherBtn"
                                name="activtyBtn"
                                value="NEED TO GRAB VALUE FROM INPUT BOX"
                                onClick={() => setOther(!other)}
                            />
                            <label htmlFor="otherBtn"><p className="rotate-45">Other</p></label>
                        </li>
                    </ul>
                    <div className="flex justify-center pt-4 h-30">
                        {other && (
                            <input
                                type="text"
                                id="otherInput"
                                name="otherInput"
                                className="p-2 rounded-md otherInput border-2 border-slate-200"
                                placeholder="What did you do?"
                                onChange={(e) => {
                                    setPickedActivity(e.target.value);
                                }}
                            />
                        )}
                        {!other && (
                            <div className="h-[30px] width-[200px]"></div>
                        )}
                    </div>
                    {/* SELECTING TIME AND INTENSITY */}
                    <Slider
                        title="Time"
                        min={1}
                        max={120}
                        getValue={(value) => {
                            getDuration(value);
                        }}
                    />
                    <Slider
                        title="Intensity"
                        min={1}
                        max={10}
                        getValue={(value) => {
                            getIntensity(value);
                        }}
                    />
                    {/* // date selector - needs to pass the date up to parent. */}
                    <DateSelect getDate={(date) => getDate(date)} />
                    <textarea
                        className="w-full px-2 mt-6 rounded-lg bg-slate-100"
                        placeholder="Notes..."
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button className="px-3 py-2 border-2 rounded-full bg-slate-500 text-slate-100 border-slate-300 hover:bg-slate-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ActivityRecorder;
