import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import EmptyDashboard from "./EmptyDashboard";
import apiClient from "@/apiClient";
import StatsDashboard from "./statsComponents/StatsDashboard";


const Dashboard = (props) => {
    // this useState, function, and useEffect check to see if any activities have been logged so far, and if they haven't renders a message on the page.
    const [isEmpty, setIsEmpty] = useState(false);
    const emptyDataCheck = (data) => {
        if (data.length === 0) {

            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    };
    useEffect(() => {
        emptyDataCheck(props.data);
    }, [props.data]);

    // Grab and capitalise usersame for heading
    let username = props.userInfo.username;
    username = username?.split("")[0]?.toUpperCase() + username.slice(1);

    

    // CONFIRM AND DELETE

    // handler function to delete activity (originally in activityCard)
    const deleteEntryHandler = async (id) => {
        await apiClient.deleteActivity(id);
    };

    return (
        <div className="pt-20">
            <h1 className="test-test text-4xl text-slate-800 text-center pb-12 pt-8">
                {username}'s dashboard
            </h1>

            <StatsDashboard 
                userWithStats={props.userWithStats}
                userInfo={props.userInfo && props.userInfo}
            />


            {isEmpty && <EmptyDashboard />}
            {!isEmpty && 
            <><h2 className="text-3xl text-slate-800 text-center pb-12 pt-8">Your activities</h2>

            {props?.data?.map((activity) => {
                return (
                    <ActivityCard
                        {...activity}
                        key={activity._id}
                        handleActivityUpdate={() => {
                            props.handleActivityUpdate();
                        }}
                        deleteEntryHandler={() => {
                            deleteEntryHandler(activity._id);
                        }}
                        
                    />
                );
            })}</>}
        </div>
    );
};

export default Dashboard;
