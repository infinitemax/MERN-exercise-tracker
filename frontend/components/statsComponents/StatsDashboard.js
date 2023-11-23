import React from "react";
// import StatsCalculator from "@/statsCalculator";
import GoalStats from "./GoalStats";

const StatsDashboard = (props) => {
    
    return (
        <div>
            <div className="pb-8 font-semibold uppercase text-slate-300">Stats</div>
            <GoalStats 
                userWithStats={props.userWithStats}
            />
        </div>
    );
};

export default StatsDashboard;
