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

    getCutOff(period) {
        // takes a "period", which is the number of days we want to look at, and calculates the "cut off date", i.e. the date after which we're not interested in the activities
        if (period === 0) {
            return new Date("1970-11-14T00:00:00.000Z")
        }
        let cutOff = new Date();
        cutOff.setHours(0, 0, 0, 0);
        cutOff.setDate(cutOff.getDate() - period);
        cutOff = new Date(cutOff);
        return cutOff

    }

    totalActivities(period, sport) { 
        const cutOff = this.getCutOff(period)
        let count = 0;
        this.userData.activities.forEach((activity) => {
            const date = new Date(activity.date)
            date.setHours(23,59,59,0)
            if (date < cutOff) {
                return count
            }
            if (sport === "any" || activity.activity === sport) {
                count++;
            }
        });
        return count;
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

        const cutOff = this.getCutOff(period)
        // console.log(cutOff);

        // create array of all activities
        const activities = [];
        this.userData.activities.map((activity) => {
            let date = new Date(activity.date);
            date.setHours(23, 59, 59, 0);
            if (date < cutOff) {
                return activities;
            } 
            activities.push(activity.activity);
        });
        return activities;
    }

    activitiesWithCount(period) {
        const activities = this.arrayOfActivities(period)

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

    activitiesInOrder(period) {
        const activitiesObject = this.activitiesWithCount(period)

        // create an array of activities from the object
        const sortable = [];
        for (let activity in activitiesObject) {
            sortable.push([activity, activitiesObject[activity]])
        }
        // sort the array
        sortable.sort((a, b) => {return b[1] - a[1]})

        return sortable
    }

    // Is the user meeting their goals?

    
}
