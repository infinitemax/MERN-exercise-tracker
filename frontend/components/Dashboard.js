import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import EmptyDashboard from "./EmptyDashboard";
import apiClient from "@/apiClient";
import ConfirmModal from "./ConfirmModal";

const Dashboard = (props) => {
    // this useState, function, and useEffect check to see if any activities have been logged so far, and if they haven't renders a message on the page.
    const [isEmpty, setIsEmpty] = useState(false);
    const emptyDataCheck = (data) => {
        if (data.length === 0) {
            setIsEmpty(true);
            console.log("hello");
        } else {
            setIsEmpty(false);
        }
    };
    useEffect(() => {
        emptyDataCheck(props.data);
    });

    // Grab and capitalise usersame for heading
    let username = props.userInfo.username;
    username = username.split("")[0].toUpperCase() + username.slice(1);

    // CONFIRM AND DELETE
    const [showConfirm, setShowConfirm] = useState(false);

    // bring up modal
    const showConfirmModal = () => {
        setShowConfirm(!showConfirm)
    }

    // confirm user wants to delete
    const confirmDelete = (confirmation) => {
        if (confirmation) {
            console.log("confirmed");
        } else {
            console.log("not confirmed");
        }
    };

    // handler function to delete activity (originally in activityCard)
    const deleteEntryHandler = async (id) => {
        await apiClient.deleteActivity(id);
    };

    return (
        <div className="pt-20">
            <h1 className="test-test text-3xl text-slate-800 text-center pb-12 pt-8">
                {username}'s dashboard
            </h1>

            {isEmpty && <EmptyDashboard />}

            {/* {showConfirm && <ConfirmModal 
                deleteEntryHandler={() => {deleteEntryHandler()}}
            />} */}

            {props.data.map((activity) => {
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
                        showConfirmModal={() => showConfirmModal()}
                    />
                );
            })}
        </div>
    );
};

export default Dashboard;
