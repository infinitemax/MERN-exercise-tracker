"use client";
import React from "react";
import apiClient from "@/apiClient";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function MyAreaPage() {

    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        try {
            const respones = await apiClient.loadUserData();

            


        } catch(error) {

        }
    }

    return (
        <div>
            <Navbar />
        </div>
    )
}