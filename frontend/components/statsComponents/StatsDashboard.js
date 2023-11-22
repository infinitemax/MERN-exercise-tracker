import React from "react";
// import StatsCalculator from "@/statsCalculator";
import GoalStats from "./GoalStats";

const StatsDashboard = (props) => {
    
    return (
        <div>
            <div>Stats Dashboard</div>
            <GoalStats 
                userWithStats={props.userWithStats}
            />
        </div>
    );
};

export default StatsDashboard;
