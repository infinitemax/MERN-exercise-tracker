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
    const [readyToSubmit, setReadyToSubmit] = useState(false)
    const [clickCount, setClickCount] = useState(1)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await setClickCount(clickCount + 1) 
        if (clickCount > 1) {
            setReadyToSubmit(true)
            console.log("hello")
            await setUserNewData({
                username,
                email,
                firstName,
                lastName,
                dateOfBirth,
                height,
                weight,
                avatar
            })
            setReadyToSubmit(false)
            console.log("bye")
            props.closeModal()
        }       
    }

    // prevent blank update behaviour when modal is opened
    useEffect(() => {  
        const updateUser = async () => {
            await apiClient.updateUser(userNewData)
            props.handleDetailsUpdate()
        }
        if (readyToSubmit) {
            updateUser()
        }
    }, [userNewData])

    useEffect(() => {
        console.log(`clickCount = ${clickCount}`);
    }, [clickCount])
    


    return (
        <div className="absolute w-full flex justify-center">
            <div className="bg-slate-300 border-2 border-slate-500 rounded-lg">
                <form action="" onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <h2 className="text-2xl text-center py-6">Update your details</h2>
                    <ul className=" px-4">
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Username: </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Email: </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">First name: </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Last name: </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Date of birth: </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.dateOfBirth || "dd/mm/yyyy"}
                                onChange={(e) => {
                                    setDateOfBirth(new Date(e.target.value).toLocaleString("en-GB", {timeZone: "Europe/London"}))
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Height: </label>
                            <input
                                type="number"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.height}
                                onChange={(e) => {
                                    setHeight(e.target.value)
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Weight: </label>
                            <input
                                type="number"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.weight}
                                onChange={(e) => {
                                    setWeight(e.target.value)
                                }}
                            />
                        </li>
                        <li className="p-1 grid grid-cols-4">
                            <label htmlFor="">Avatar: </label>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="px-2 py-1 rounded-md col-span-3"
                                placeholder={props.userInfo.avatar}
                                onChange={(e) => {
                                    setAvatar(e.target.value)
                                }}
                            />
                        </li>
                    </ul>
                    <br />
                    <button className=
                    {`${clickCount < 2 ? "bg-teal-500 hover:bg-teal-600" : "bg-red-400 text-white hover:bg-red-500"}  rounded-full py-2 px-4 w-24`}>
                        {clickCount < 2 ? "Submit" : "Sure?"}
                    </button>
                    <button
                        className="bg-sky-500 hover:bg-sky-600 rounded-full py-2 px-4 w-24"
                        onClick={() => {
                            props.closeModal();
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateSettings;
