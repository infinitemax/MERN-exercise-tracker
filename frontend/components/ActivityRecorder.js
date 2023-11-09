"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Slider from "./Slider";
import DateSelect from "./DateSelect";

const ActivityRecorder = (props) => {
    const [other, setOther] = useState(false);

    // SETTING AND GETTING THE DATE
    // state for getting selected date
    const [pickedDate, setPickedDate] = useState()
    // function to capture date
    const getDate = async (date) => {
        // setPickedDate(date);
        console.log(date)
    }

    // SUBMIT HANDLER

    const [activityData, setActivityData] = useState({})
    const submitHandler = () => {
        
    }



    return (
        <div className="relative flex justify-center">
            <div className="md:w-96 bg-slate-400 border-4 border-slate-300 absolute mt-24 z-10 rounded-lg px-6 py-6">
            {/* BTN TO CLOSE RECORDER */}
            <button className="absolute right-2 top-2" onClick={() => props.closeRecorder()}>
                <Image
                    src="/close-icon.png"
                    width={15}
                    height={15}
                    alt="logo"
                />
            </button>
                <form action="">

                    <h2 className="text-3xl text-slate-800 text-center">
                        Record an activity
                    </h2>
                    {/* BUTTONS FOR ACTIVITY */}
                    <ul className="activityBtns flex flex-wrap justify-center gap-6">
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="runBtn"
                                name="activtyBtn"
                                value="run"
                                onClick={() => setOther(false)}
                            />
                            <label htmlFor="runBtn">Run</label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="cylceBtn"
                                name="activtyBtn"
                                value="cycle"
                                onClick={() => setOther(false)}
                            />
                            <label htmlFor="cylceBtn">Cycle</label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="weightsBtn"
                                name="activtyBtn"
                                value="wieghts"
                                onClick={() => setOther(false)}
                            />
                            <label htmlFor="weightsBtn">Weights</label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="climbBtn"
                                name="activtyBtn"
                                value="climb"
                                onClick={() => setOther(false)}
                            />
                            <label htmlFor="climbBtn">Climb</label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="swimBtn"
                                name="activtyBtn"
                                value="swim"
                                onClick={() => setOther(false)}
                            />
                            <label htmlFor="swimBtn">Swim</label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="boxBtn"
                                name="activtyBtn"
                                value="boxing"
                                onClick={() => setOther(false)}
                            />
                            <label htmlFor="boxBtn">Box</label>
                        </li>
                        <li className="activityRadio">
                            <input
                                type="radio"
                                id="otherBtn"
                                name="activtyBtn"
                                value="NEED TO GRAB VALUE FROM INPUT BOX"
                                onClick={() => setOther(!other)}
                            />
                            <label htmlFor="otherBtn">Other</label>
                        </li>
                    </ul>
                    <div className="pt-4 flex justify-center h-30">
                        {other && (
                            <input
                                type="text"
                                id="otherInput"
                                name="otherInput"
                                className="otherInput rounded-md p-2"
                                placeholder="What did you do?"
                            />
                        )}
                        {!other && (
                            <div className="h-[30px] width-[200px]">
                            </div>
                        )}
                    </div>
                    {/* SELECTING TIME AND INTENSITY */}
                    {/* <div className="sliderParent relative">
                        <input type="range" min="1" max="120" value={time} onChange={() => console.log("hello")}/>
                    </div> */}
                    <Slider
                        title="Time"
                        min={1}
                        max={120}
                    />
                    <Slider
                        title="Intensity"
                        min={1}
                        max={10}
                    />
                    {/* // date selector - needs to pass the date up to parent. */}
                    <DateSelect
                        getDate={(date) => getDate(date)}
                    />
                    <textarea className="w-full bg-slate-100 rounded-lg mt-6 px-2" placeholder="Notes..."/>
                    <button className="py-2 px-3 rounded-full bg-slate-500 text-slate-100 border-2 border-slate-300 hover:bg-slate-600">Submit</button>
                </form> 
            </div>
        </div>
    );
};

export default ActivityRecorder;
