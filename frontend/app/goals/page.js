"use client";
import React from "react";
import goalsApiClinet from "@/goalsApiClinet";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GoalsDashboard from "@/components/GoalsDashboard";

export default function goals() {

    const [userInfo, setUserInfo] = useState()
    const [isAuthorised, setIsAuthorised] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        try {
            const response = await goalsApiClinet.getUserGoals();

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

    // update user goals when promped by children
    const [updateGoals, setUpdateGoals] = useState(false)

    const handleGoalsUpdate = () => {
        setUpdateGoals(!updateGoals)
    }

    useEffect(() => {
        getUserData()
    }, [updateGoals])


 
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
                        // handleActivityUpdate={() => {handleActivityUpdate()}}
                    />}
                    {isAuthorised && 
                    <GoalsDashboard 
                        userInfo={userInfo}
                        handleGoalsUpdate={() => {handleGoalsUpdate()}}
                    />
                    }
            </>
        )}
         
        </div>
    )
}