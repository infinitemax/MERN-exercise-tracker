import { act } from "react-dom/test-utils";

export default class StatsCalculator {
    constructor(data) {
        this.userData = data;
    }

    hello() {
        return "hello";
    }

    giveUsername() {
        return this.userData.username;
    }

    totalActivities() {
        let count = 0;
        this.userData.activities.forEach((activity) => {
            count++;
        });
        return count;
    }

    getCutOff(period) {
        // takes a "period", which is the number of days we want to look at, and calculates the "cut off date", i.e. the date after which we're not interested in the activities
    
        let cutOff = new Date();
        cutOff.setHours(0, 0, 0, 0);
        cutOff.setDate(cutOff.getDate() - period);
        cutOff = new Date(cutOff);
        return cutOff

    }

    // this function takes a time period (days) as an input, and uses that to calculate how much time has been spent exercising in that number of days.
    totalDuration(period, sport) {
        let time = 0;

        // set cut off
        const cutOff = this.getCutOff(period)

        this.userData.activities.forEach((activity) => {
            let date = new Date(activity.date);
            date.setHours(23, 59, 59, 0);
            if (date < cutOff) {
                return time;
            }
            if (sport === "any" || activity.activity === sport) {
                time = time + activity.duration;
            }
        });
        return time;
    }

    arrayOfActivities(period) {
        // create array of all activities
        const activities = [];
        this.userData.activities.map((activity) => {
            activities.push(activity.activity);
        });
        return activities;
    }

    activitiesInOrder() {
        // create array of all activities
        const activities = this.arrayOfActivities()

        // create object of activities
        const activityObject = activities.reduce(
            (acc, cur) => ((acc[cur] = 0), acc),
            {}
        );

        // count through array and add to object
        activities.forEach((activity) => {
            activityObject[activity]++;
        });

        return activityObject;
    }
}
