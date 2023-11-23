"use client"
import React, { useState, useEffect } from "react";
import UpdateSettings from "./UpdateSettings";


const Settings = (props) => {
    // get user data
    const { userInfo } = props

    // bring up edit modal
    const [isUpdating, setIsUpdating] = useState(false)


    // close modal
    const closeModal = () => {
        return setIsUpdating(false)
    }

    return (
        <div className="relative flex justify-center">
            {isUpdating && <UpdateSettings 
                userInfo={userInfo}
                closeModal={() => {closeModal()}}
                handleDetailsUpdate={() => props.handleDetailsUpdate()}
            />}
            <div className="px-4 py-8 mt-24 rounded-4xl shadow-md bg-gradient-to-b from-white to-[#f2fff9]">
                <h1 className="pb-4 text-2xl text-center">{userInfo.username}'s settings</h1>
                <p className="pb-2">View and update your details below</p>
                <p>Username: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
                <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
                <p>Date of birth: {userInfo?.dateOfBirth}</p>
                <p>Height: {userInfo?.height} {userInfo?.height && "cm"}</p>
                <p>Weight: {userInfo?.weight} {userInfo?.weight && "kg"}</p>
                <p>Avatar: {userInfo?.avatar}</p>
                <button className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-700 text-slate-200" onClick={() => {setIsUpdating(true)}}>Update details</button>
            </div>
        </div>
    );
};

export default Settings;
