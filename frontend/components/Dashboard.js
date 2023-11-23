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
            <h1 className="pt-8 pb-12 text-4xl font-bold text-center text-white test-test">
                {username}'s dashboard
            </h1>
            <div className="flex items-center justify-center pb-6">
  <div className="pt-6 text-center">
    <StatsDashboard 
      userWithStats={props.userWithStats}
      userInfo={props.userInfo && props.userInfo}
    />
  </div>
</div>
            {isEmpty && <EmptyDashboard />}
            {!isEmpty && 
            <><h2 className="pt-4 pb-12 font-semibold text-center uppercase text-slate-300">Your activities</h2>

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
