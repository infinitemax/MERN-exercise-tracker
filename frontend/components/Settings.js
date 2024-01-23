"use client"
import React, { useState, useEffect } from "react";
import UpdateSettings from "./UpdateSettings";
import format from "date-fns/format";


const Settings = (props) => {
    // get user data
    const { userInfo } = props

    // bring up edit modal
    const [isUpdating, setIsUpdating] = useState(false)

    const [dob, setDob] = useState()

    useEffect(()=> {
        let date = new Date(userInfo?.dateOfBirth)
        date = format(date, "dd MMM yyyy")
        setDob(date)
    }, [])


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
                dateOfBirthObj={userInfo?.dateOfBirth}
            />}

            <div className="px-8 pt-16 pb-8 mt-24 rounded-4xl shadow-md bg-gradient-to-b from-white to-[#f2fff9] min-w-96 max-w-[700px]">
                <h1 className="pb-2 text-2xl text-center">{userInfo.username}'s settings</h1>
                <hr className="h-1 border-0 rounded bg-slate-600" />
                <div className=" flex flex-col gap-3 pt-4">
                    <p>View and update your details</p>
                    <p>Username: {userInfo.username}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
                    <p>Date of birth: {    
                        format(new Date(userInfo?.dateOfBirth), "dd MMM yyyy")
                    }</p>
                    <p>Height: {userInfo?.height} {userInfo?.height && "cm"}</p>
                    <p>Weight: {userInfo?.weight} {userInfo?.weight && "kg"}</p>
                <button className="px-4 py-2 mt-8 mx-auto rounded-full bg-slate-900 hover:bg-slate-700 text-slate-200" onClick={() => {setIsUpdating(true)}}>Update details</button>
                </div>
            </div>

        </div>
    );
};

export default Settings;
