import React, { useEffect, useState } from "react";
import { addDays, isAfter } from "date-fns";
import { DateRangePicker } from "rsuite";
import { BsCalendarDate } from "react-icons/bs";
import DatePicker from "react-datepicker";
// import "rsuite/dist/rsuite.min.css";
import "react-datepicker/dist/react-datepicker.css";

export function Datepicker(
  {
    // dateRange,
    // setDateRange,
    // placeMent = "bottomEnd",
    // placeholder = "Select Date",
  }
) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
  );
}
