import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

export function Datepicker({
  dateRange,
  setDateRange,
  placeholderText = "MM-dd-yyyy - MM-dd-yyyy",
}) {
  const [startDate, endDate] = dateRange;

  const setPreset = (type) => {
    const today = new Date();
    let start, end;

    switch (type) {
      case "lastWeek":
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        end = today;
        break;
      case "lastMonth":
        start = new Date(today);
        start.setMonth(today.getMonth() - 1);
        end = today;
        break;
      case "lastYear":
        start = new Date(today);
        start.setFullYear(today.getFullYear() - 1);
        end = today;
        break;
      default:
        start = null;
        end = null;
    }

    setDateRange([start, end]);
  };

  // Custom container with presets below the calendar
  const CustomCalendarContainer = ({ className, children }) => (
    <div className={className}>
      {children} {/* Calendar */}
      <div className="flex gap-2 mt-2 px-3 py-2 border-t border-gray-200 bg-gray-50 rounded-b">
        <button
          type="button"
          className="text-sm cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
          onClick={() => setPreset("lastWeek")}
        >
          Last Week
        </button>
        <button
          type="button"
          className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
          onClick={() => setPreset("lastMonth")}
        >
          Last Month
        </button>
        <button
          type="button"
          className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
          onClick={() => setPreset("lastYear")}
        >
          Last Year
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-w-[250px] relative">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          const [start, end] = update;
          if (start && !end) {
            setDateRange([start]);
          } else if (start && end) {
            setDateRange([start, end]);
          }
        }}
        dateFormat="MM-dd-yyyy"
        placeholderText={placeholderText}
        maxDate={new Date()}
        calendarContainer={CustomCalendarContainer}
        className="border border-gray-300 rounded-md leading-tight focus:border-blue-500 text-sm text-gray-700 pr-10 py-2 pl-3 w-full outline-none focus:outline-none"
      />
      <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
