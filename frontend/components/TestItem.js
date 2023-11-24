"use client";
import React, { useState } from "react";
import TestComp from "./TestComp";

const TestItem = () => {
    const [showText, setShowText] = useState(false);

    return (
        <div>
            <div>Hello</div>
            <button>Click this</button>
            <div>
                <label htmlFor="randomText">Enter random text</label>
                <input id="randomText"></input>
            </div>
            <div>
                <label htmlFor="specificText">Enter specific text</label>
                <input id="specificText"></input>
            </div>
            <div>
                {showText && <span>This is the hidden text!</span>}
                <br />
                <button
                    onClick={() => {
                        setTimeout(() => {
                            setShowText(!showText);
                        }, 1100);
                    }}
                >
                    Click to show
                </button>
            </div>
            <TestComp 
                displayName="Max Max Max Max Max Max Max Max Max Max Max Max Max Max Max Max Max Max"
			username="infinitemax"
			email="max@max.com"
			isEmailVerified={true}
            />

        </div>
    );
};

export default TestItem;
