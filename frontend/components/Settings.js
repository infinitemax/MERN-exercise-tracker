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
        <div className="relative">
            {isUpdating && <UpdateSettings 
                userInfo={userInfo}
                closeModal={() => {closeModal()}}
                handleDetailsUpdate={() => props.handleDetailsUpdate()}
            />}
            <h1>{userInfo.username}'s settings</h1>
            <p>View and update your settings below</p>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
            <p>Date of birth: {userInfo?.dateOfBirth}</p>
            <p>Height: {userInfo?.height} {userInfo?.height && "cm"}</p>
            <p>Weight: {userInfo?.weight} {userInfo?.weight && "kg"}</p>
            <p>Avatar: {userInfo?.avatar}</p>
            <button className="py-2 px-4 bg-slate-600 hover:bg-slate-700 text-slate-200 rounded-full" onClick={() => {setIsUpdating(true)}}>Update details</button>
        </div>
    );
};

export default Settings;
