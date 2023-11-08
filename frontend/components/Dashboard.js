import React from "react";
import ActivityCard from "./ActivityCard";

const Dashboard = (props) => {
    
    // Grab and capitalise usersame for heading
    let username = props.userInfo.username
    username = username.split('')[0].toUpperCase() + username.slice(1)

    return (
        <div className="pt-20">
            <h1 className="text-3xl text-slate-800 text-center pb-12 pt-8">{username}'s dashboard</h1>

            {props.data.map((activity) => {
                return <ActivityCard {...activity} />;
            })}
        </div>
    );
};

export default Dashboard;
