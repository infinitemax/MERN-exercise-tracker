import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// a date selection component that allows the user to select today, or picka date from a date picker.
const DateSelect = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (

            <DatePicker 
            
            wrapperClassName="datePicker" dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => {
                    setStartDate(date)
                    props.getDate(date)
                }}
                showTimeSelect
            />

    );
};

export default DateSelect;
