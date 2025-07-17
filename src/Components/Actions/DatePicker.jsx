import React, { useEffect, useState } from "react";
import { addDays, isAfter } from "date-fns";
import { DateRangePicker } from "rsuite";
import { BsCalendarDate } from "react-icons/bs";
// import "rsuite/dist/rsuite.min.css";

export function DatePicker({
  dateRange,
  setDateRange,
  placeMent = "bottomEnd",
  placeholder = "Select Date",
}) {
  const predefinedRanges = [
    {
      label: "Today",
      value: [new Date(), new Date()],
      placement: "bottom",
    },
    {
      label: "Yesterday",
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: "bottom",
    },
    {
      label: "Last 7 Days",
      value: [addDays(new Date(), -6), new Date()],
      placement: "bottom",
    },
    {
      label: "Last 30 Days",
      value: [addDays(new Date(), -29), new Date()],
      placement: "bottom",
    },
    {
      label: "Last Year",
      value: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ],
      placement: "bottom",
    },
  ];

  const today = new Date();
  const [responsivePlacement, setResponsivePlacement] = useState(placeMent);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setResponsivePlacement(isMobile ? "auto" : placeMent);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [placeMent]);

  const handleChange = (value) => {
    if (Array.isArray(value) && value.length === 2) {
      setDateRange(value);
    } else {
      setDateRange([null, null]);
    }
  };

  useEffect(() => {
    console.log("dateRange", dateRange);
  }, [dateRange]);

  return (
    <div className="min-w-full md:min-w-min">
      <DateRangePicker
        value={dateRange}
        onChange={handleChange}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        disabledDate={(date) => isAfter(date, today)}
        caretAs={BsCalendarDate}
        cleanable={false}
        className="rounded-none text-primaryC border-borderC w-full z-[100]"
        placement={responsivePlacement}
        placeholder={placeholder}
        showOneCalendar
        ranges={predefinedRanges}
        showHeader={false}
        limitEndYear={1}
        limitStartYear={1}
      />
    </div>
  );
}
