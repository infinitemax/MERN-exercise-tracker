import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import apiClient from "@/apiClient";

const UpdateSettings = (props) => {
    // states for each of the inputs
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [avatar, setAvatar] = useState();

    // handle submit
    const [userNewData, setUserNewData] = useState({});
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [clickCount, setClickCount] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setClickCount(clickCount + 1);
        if (clickCount > 1) {
            setReadyToSubmit(true);
            console.log("hello");
            await setUserNewData({
                username,
                email,
                firstName,
                lastName,
                dateOfBirth,
                height,
                weight,
                avatar,
            });
            setReadyToSubmit(false);
            console.log("bye");
            props.closeModal();
        }
    };

    // prevent blank update behaviour when modal is opened
    useEffect(() => {
        const updateUser = async () => {
            await apiClient.updateUser(userNewData);
            props.handleDetailsUpdate();
        };
        if (readyToSubmit) {
            updateUser();
        }
    }, [userNewData]);

    useEffect(() => {
        console.log(`clickCount = ${clickCount}`);
    }, [clickCount]);

    return (
        <div className="absolute flex justify-center w-full">
            <div className="bg-white rounded-lg shadow-md">
                <form
                    action=""
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <h2 className="py-6 text-2xl text-center">
                        Update your details
                    </h2>
                    <ul className="px-4 ">
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Username:{" "}
                            </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Email:{" "}
                            </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                First name:{" "}
                            </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Last name:{" "}
                            </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Date of birth:{" "}
                            </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={
                                    props.userInfo.dateOfBirth || "dd/mm/yyyy"
                                }
                                onChange={(e) => {
                                    setDateOfBirth(
                                        new Date(e.target.value).toLocaleString(
                                            "en-GB",
                                            { timeZone: "Europe/London" }
                                        )
                                    );
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Height:{" "}
                            </label>
                            <input
                                type="number"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.height}
                                onChange={(e) => {
                                    setHeight(e.target.value);
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Weight:{" "}
                            </label>
                            <input
                                type="number"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.weight}
                                onChange={(e) => {
                                    setWeight(e.target.value);
                                }}
                            />
                        </li>
                        <li className="grid grid-cols-4 p-1">
                            <label htmlFor="" className="font-bold">
                                Avatar:{" "}
                            </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="col-span-3 px-2 py-1 rounded-md"
                                placeholder={props.userInfo.avatar}
                                onChange={(e) => {
                                    setAvatar(e.target.value);
                                }}
                            />
                        </li>
                    </ul>
                    <br />
                    <div className="flex justify-between px-4 py-3">
                        <button
                            className={`${
                                clickCount < 2
                                    ? "bg-teal-500 hover:bg-teal-600"
                                    : "bg-red-400 text-white hover:bg-red-500"
                            } rounded-full py-2 px-4 mr-2`} 
                        >
                            {clickCount < 2 ? "Submit" : "Sure?"}
                        </button>
                        <button
                            className="px-4 py-2 ml-2 text-white rounded-full bg-sky-500 hover:bg-sky-600"
                            onClick={() => {
                                props.closeModal();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSettings;
