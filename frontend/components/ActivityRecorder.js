"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Slider from "./Slider";

const ActivityRecorder = (props) => {
    const [other, setOther] = useState(false);

    // state for managing sliders
    const [time, setTime] = useState(1);

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
                <h2 className="text-3xl text-slate-800 text-center">
                    Record an activity
                </h2>
                {/* BUTTONS FOR ACTIVITY */}
                <ul className="activityBtns flex flex-wrap justify-center gap-6">
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="runBtn"
                            name="activityBtn"
                            onClick={() => setOther(false)}
                        />
                        <label htmlFor="runBtn">Run</label>
                    </li>
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="cylceBtn"
                            name="activityBtn"
                            onClick={() => setOther(false)}
                        />
                        <label htmlFor="cylceBtn">Cycle</label>
                    </li>
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="weightsBtn"
                            name="activityBtn"
                            onClick={() => setOther(false)}
                        />
                        <label htmlFor="weightsBtn">Weights</label>
                    </li>
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="runBtn"
                            name="activityBtn"
                            onClick={() => setOther(false)}
                        />
                        <label htmlFor="runBtn">Climb</label>
                    </li>
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="cylceBtn"
                            name="activityBtn"
                            onClick={() => setOther(false)}
                        />
                        <label htmlFor="cylceBtn">Swim</label>
                    </li>
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="weightsBtn"
                            name="activityBtn"
                            onClick={() => setOther(false)}
                        />
                        <label htmlFor="weightsBtn">Box</label>
                    </li>
                    <li className="activityRadio">
                        <input
                            type="radio"
                            id="otherBtn"
                            name="activityBtn"
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
                

                <textarea className="w-full bg-slate-100 rounded-lg mt-6 px-2" placeholder="Notes..."/>
                
            </div>
        </div>
    );
};

export default ActivityRecorder;
