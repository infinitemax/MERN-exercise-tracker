import React from "react";
// import StatsCalculator from "@/statsCalculator";
import GoalStats from "./GoalStats";
import TopActivityCard from "./TopActivityCard";

const StatsDashboard = (props) => {
    
    return (
        <div className="px-12 flex flex-wrap gap-8 justify-center">

            <GoalStats 
                userWithStats={props.userWithStats}
            />
            <TopActivityCard 
                userWithStats={props.userWithStats}
                userInfo={props.userInfo}
            />
        </div>
    );
};

export default StatsDashboard;
