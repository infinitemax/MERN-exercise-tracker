import React, { useEffect, useState } from "react";
import format from "date-fns/format";

const TopActivityCard = (props) => {
    const [loading, setLoading] = useState(true);
    const [topActivity, setTopActivity] = useState();
    const [period, setPeriod] = useState(7);
    const [activitiesInOrder, setActivitiesInOrder] = useState();
    const [firstActive, setFirstActive] = useState();

    const handleDateSelect = (value) => {
        setPeriod(value);
    };

    const loadActivities = async () => {
        setLoading(true);

        // get top activity:
        let activitiesInOrder = await props.userWithStats.activitiesInOrder(
            period
        );
        let mostCommon = activitiesInOrder[0];
        mostCommon =
            mostCommon[0].split("")[0].toUpperCase() + mostCommon[0].slice(1);
        setTopActivity(mostCommon);
        setActivitiesInOrder(activitiesInOrder);

        // get month and year of first activity
        let dateFirstActive =
            props.userInfo.activities[props.userInfo.activities.length - 1]
                .date;
        dateFirstActive = new Date(dateFirstActive);
        const formattedDate = format(dateFirstActive, "MMM yyyy");
        setFirstActive(formattedDate);

        setLoading(false);
    };

    useEffect(() => {
        loadActivities();
    }, []);

    useEffect(() => {
        loadActivities();
    }, [props.updateChildren]);

    useEffect(() => {
        if (period !== null) {
            loadActivities();
        }
    }, [period]);


    return (
        <div className="p-6 font-light rounded-lg shadow-md bg-gradient-to-b from-white to-[#f2fff9] w-96 text-slate-200">
            <h3 className="pb-2 text-3xl text-emerald-400">
                Your top activity
            </h3>
            <hr className="h-1 mt-1 border-0 rounded bg-slate-600 " />
            <div></div>
            <ul className="flex flex-wrap justify-center gap-6 mt-2 dateBtns text-slate-950">
                <li className="dateRadio">
                    <input
                        type="radio"
                        id="sevenDayBtn"
                        name="dateBtn"
                        defaultChecked
                        value={7}
                        onClick={(e) => {
                            handleDateSelect(e.target.value);
                        }}
                    />
                    <label htmlFor="sevenDayBtn" className="text-center">
                        7 days
                    </label>
                </li>
                <li className="dateRadio">
                    <input
                        type="radio"
                        id="twentyEightDayBtn"
                        name="dateBtn"
                        value={28}
                        onClick={(e) => {
                            handleDateSelect(e.target.value);
                        }}
                    />
                    <label htmlFor="twentyEightDayBtn" className="text-center">
                        28 days
                    </label>
                </li>
                <li className="dateRadio">
                    <input
                        type="radio"
                        id="allTimeBtn"
                        name="dateBtn"
                        value={30000}
                        onClick={(e) => {
                            handleDateSelect(e.target.value);
                        }}
                    />
                    <label htmlFor="allTimeBtn" className="text-center">
                        all time
                    </label>
                </li>
            </ul>
            {!loading && (
                <>
                    {topActivity && (
                        <h4 className="mt-6 mb-6 text-5xl text-center text-emerald-400">
                            {topActivity}
                        </h4>
                    )}
                    <p className="mb-4 text-center text-black sm:text-2xl font-extralight">
                        <span>{activitiesInOrder[0][1]}</span> {activitiesInOrder[0][1] > 1 ? `times` : `time`}
                        {period < 30000
                            ? ` in the last ${period} days`
                            : ` since ${firstActive}`}
                    </p>
                    <hr className="h-1 mt-1 border-0 rounded bg-slate-600 " />
                    <h4 className="py-4 text-xl text-emerald-400 ">The best of the rest</h4>
                    <ul style={{ listStyleType: 'square' }} className="pl-8">
                        {activitiesInOrder.map((activity, index) => {
                            if (index === 0) {
                                return
                            }
                            return (
                                <li key={index}>{activity[0]} - {activity[1]} {
                                    activity[1] > 1 ? 'times' : 'time'
                                }</li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default TopActivityCard;
