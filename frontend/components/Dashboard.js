import React from "react";
import ActivityCard from "./ActivityCard";

const Dashboard = (props) => {
    console.log(props.data);
    console.log(props.hello);

    return (
        <>
            <div>Welcome to the dashboard</div>

            {props.data.map((activity) => {
                return <ActivityCard {...activity} />;
            })}
        </>
    );
};

export default Dashboard;
