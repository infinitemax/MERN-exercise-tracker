"use client";
import React from "react";
import apiClient from "@/apiClient";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Settings from "@/components/Settings";

export default function MyAreaPage() {

    const [userInfo, setUserInfo] = useState()
    const [isAuthorised, setIsAuthorised] = useState(true);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        try {
            const response = await apiClient.loadUserData();

            if (!response) {
                setIsAuthorised(false);
                setIsLoading(false);
                return
            }

            if (response?.status !== 200) {
                setIsAuthorised(false);
                setIsLoading(false);
                return
            }

            setUserInfo(response.data.user)
            setIsLoading(false);
            return

        } catch(error) {
            res.status(500).json({
                status: 200,
                message: "Internal server error"
            })
        }
    }

    // update user details when promped by children
    const [updateDetails, setUpdateDetails] = useState(false)

    const handleDetailsUpdate = () => {
        setUpdateDetails(!updateDetails)
    }

    useEffect(() => {
        getUserData()
    }, [updateDetails])



    return (
        <div>
            {isLoading && <h2>Loading...</h2>}
            {!isLoading && (
                <>
                    {!isAuthorised && (
                        <h2>
                            401 error - you are not authorised.{" "}
                            <a className="text-blue-700" href="/login">
                                Please login
                            </a>
                            .
                        </h2>
                    )}
                    {isAuthorised && <Navbar 
                        handleActivityUpdate={() => {handleActivityUpdate()}}
                    />}
                    {isAuthorised && 
                    <Settings 
                        userInfo={userInfo}
                        handleDetailsUpdate={() => {handleDetailsUpdate()}}
                    />}
            </>
        )}
        </div>
    )
}