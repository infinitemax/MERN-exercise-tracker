import React from "react";

// a date selection component that allows the user to select today, or picka date from a date picker.
const DateSelect = (props) => {

    const [otherDate, setOtherDate] = useState(false)

    return (
        <div>
            <button className="p-4 border-2 border-slate-700 rounded-md">Today</button>
            <button>Pick date</button>
        </div>
    );
};

export default DateSelect;
