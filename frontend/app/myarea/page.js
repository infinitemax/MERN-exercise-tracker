"use client";
import React from "react";
import Dashboard from "@/components/Dashboard";
import apiClient from "@/apiClient";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatsCalculator from "@/statsCalculator";
import Link from "next/link";


export default function MyAreaPage() {
    const [data, setData] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [isAuthorised, setIsAuthorised] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [userWithStats, setUserWithStats] = useState("");
    const [updateChildren, setUpdateChildren] = useState(false);    
    
    useEffect(() => {
        
        getUserData();
    }, []);




    // load up the user's data
    const getUserData = async () => {
        try {

            const response = await apiClient.loadUserData();

            // check whether we've had a response at all
            if (!response) {
                setIsAuthorised(false);
                setIsLoading(false);
                return
            }

            // if we don't get back 200, the user is not auth'd - set state and send message
            if (response?.status !== 200) {
                setIsAuthorised(false);
                setIsLoading(false);
                return
            }

            if (response) {
                // add user's activities to the activities variable
                
                setData(response?.data.user.activities || [])
                setUserInfo(response?.data.user || {})
                const goalStats = new StatsCalculator(response?.data.user || {})
                setUserWithStats(goalStats);
                setIsLoading(false);
                setUpdateChildren(!updateChildren)
                return response
            } 

            return
        } catch (error) {
            console.log(error)
        }
    };


    // update user data when prompted by children
    const [updateData, setUpdateData] = useState(false)

    const handleActivityUpdate = () => {
        setUpdateData(!updateData)
        
    }

    useEffect(() => {
        getUserData()
    }, [updateData])

    useEffect(() => {
        console.log("page");
        console.log(userWithStats)
    }, [userWithStats])

    return (
        <div>
            
                 {isLoading && <h2>Loading...</h2>}
                {!isLoading && (
                    <>
                        {!isAuthorised && (
                            <h2>
                                401 error - you are not authorised.{" "}
                                <Link className="text-blue-700" href="/login">
                                    Please login
                                </Link>
                                .
                            </h2>
                        )}
                        {isAuthorised && <Navbar 
                            handleActivityUpdate={() => {handleActivityUpdate()}}
                        />}
                        {isAuthorised && 
                        <Dashboard 
                            data={data}
                            userInfo={userInfo}
                            userWithStats={userWithStats}
                            handleActivityUpdate={() => {handleActivityUpdate()}}
                            updateChildren={updateChildren}
                    />}
                </>
             )} 
        </div>                  
    );
}
