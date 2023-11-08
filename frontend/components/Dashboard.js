import React from "react";
import ActivityCard from "./ActivityCard";

const Dashboard = (props) => {
    console.log(props.data);
    console.log(props.hello);

    return (
        <div className="pt-20">
            <h1 className="text-3xl text-slate-800 text-center pb-12 pt-8">User's dashboard</h1>

            {props.data.map((activity) => {
                return <ActivityCard {...activity} />;
            })}
        </div>
    );
};

export default Dashboard;
