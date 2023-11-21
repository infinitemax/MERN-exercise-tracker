import React from "react";
import StatsCalculator from "@/statsCalculator";
import GoalStats from "./GoalStats";

const StatsDashboard = (props) => {
    const userWithStats = new StatsCalculator(props.userInfo);


    return (
        <div>
            <div>Stats Dashboard</div>
            <GoalStats 
                userWithStats={userWithStats}
            />
        </div>
    );
};

export default StatsDashboard;
