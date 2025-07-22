import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

export function Datepicker({
  dateRange,
  setDateRange,
  placeholderText = "MM-dd-yyyy - MM-dd-yyyy",
}) {
  const [startDate, endDate] = dateRange;

  return (
 <div className="relative w-full min-w-[250px]">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setDateRange(update)}
        dateFormat="MM-dd-yyyy"
        className="border border-borderC rounded focus:border-accentC text-sm text-textC pr-10 py-2 pl-3 !w-full outline-none focus:outline-none"
        placeholderText={placeholderText}
        maxDate={new Date()}
      />
      <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}
