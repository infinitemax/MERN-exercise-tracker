import React from "react";
import Image from "next/image";

const AddGoalModal = (props) => {
    return (
        <div className="relative flex justify-center">
            <div className="md:w-96 bg-slate-400 border-4 border-slate-300 absolute mt-24 z-10 rounded-lg px-6 py-6">
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
                    <h2 className="text-3xl text-slate-800 text-center">
                        Set a goal!
                    </h2>
                    <ul>
                        <li className="genreRadio">
                            <input 
                                type="radio"
                                id=""
                                name="genreBtn"
                                value=""
                                onClick={(e) => {
                                    setGoalType()
                                }}
                            />
                        </li>
                        <li className="genreRadio">
                            <input 
                                type="radio"
                                id=""
                                name="genreBtn"
                                value=""
                                onClick={(e) => {
                                    setGoalType()
                                }}
                            />
                        </li>
                    </ul>
                    <select>
                        <option value="run">Run</option>
                        <option value="cylce">Cycle</option>
                        <option value="weights">Weights</option>
                        <option value="climb">Climb</option>
                        <option value="swim">Swim</option>
                        <option value="box">Box</option>
                        <option value="other">Other</option>
                    </select>
                </form>

            </div>
        </div>
    );
};

export default AddGoalModal;
