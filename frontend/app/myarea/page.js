"use client";
import React from "react";
import Dashboard from "@/components/Dashboard";
import apiClient from "@/apiClient";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ActivityRecorder from "@/components/ActivityRecorder";

export default function MyAreaPage() {
    const [data, setData] = useState();
    const [userInfo, setUserInfo] = useState();
    const [isAuthorised, setIsAuthorised] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        
        getUserData();
        console.log("how many times?")
    }, []);

    // load up the user's data
    const getUserData = async () => {
        try {
            const response = await apiClient.loadUserData();

            // if we don't get back 200, the user is not auth'd - set state and send message
            if (response.status !== 200) {
                setIsAuthorised(false);
                setIsLoading(false);
                return
            }

            // add user's activities to the activities variable
            setData(response.data.user.activities)

            setUserInfo(response.data.user)


            setIsLoading(false);
            return
        } catch (error) {
            console.log(error);
        }
    };

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
                    {isAuthorised && <Navbar />}
                    {isAuthorised && 
                    <Dashboard 
                        data={data}
                        userInfo={userInfo}
                        hello="hello"
                    />}
                </>
            )}
        </div>
    );
}
