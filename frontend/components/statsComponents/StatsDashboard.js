import React, { useEffect } from "react";
// import StatsCalculator from "@/statsCalculator";
import GoalStats from "./GoalStats";
import TopActivityCard from "./TopActivityCard";

const StatsDashboard = (props) => {


    return (
        <div className="px-12 flex flex-wrap gap-8 justify-center">

            <GoalStats 
                userWithStats={props.userWithStats}
                updateChildren={props.updateChildren}
    
            />
            <TopActivityCard 
                userWithStats={props.userWithStats}
                userInfo={props.userInfo}
                updateChildren={props.updateChildren}
            />
        </div>
    );
};

export default StatsDashboard;
