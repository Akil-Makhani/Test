import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { RiProgress5Fill } from "react-icons/ri";
import { Button } from "@mui/material";
import StateAutocomplete from "./StateAutocomplete"; // Adjust the import path as needed

const SearchProperties = ({
  setState,
  dataa,
  guest,
  setguest,
  handleChange,
  handleSubmit,
  setHeaderSearch,
  loading,
  size = "small",
}) => {
  const [dates, setDates] = useState([
    dataa?.checkIn ? new Date(dataa.checkIn) : null,
    dataa?.checkOut ? new Date(dataa.checkOut) : null,
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guestNum, setGuestNum] = useState(false);
  const guestInputRef = useRef(null); // Create a ref for the div
  const guestNumberRef = useRef(null);

  const incrementGuest = () => {
    if (guest < 10) {
      setguest(guest + 1);
    }
  };

  const decrementGuest = () => {
    if (guest > 0) {
      setguest(guest - 1);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (dates) => {
    setDates(dates);

    const formattedCheckIn = formatDate(dates[0]);
    const formattedCheckOut = formatDate(dates[1]);

    handleChange({
      target: {
        value: {
          checkIn: formattedCheckIn,
          checkOut: formattedCheckOut,
        },
        name: "dateRange",
      },
    });
  };

  const DateInputWithPlaceholder = ({ placeholder }) => {
    const formattedStartDate = dates[0]
      ? format(dates[0], "dd-MMM")
      : "Check In";
    const formattedEndDate = dates[1]
      ? format(dates[1], "dd-MMM")
      : "Check Out";

    return (
      <div className="relative">
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <CiCalendar
            className="text-xl"
            onClick={() => setCalendarOpen(true)}
          />
          <DatePicker
            calendarClassName="custom-calendar"
            selected={dates[0]}
            onChange={handleDateChange}
            dateFormat="dd-MMM-yyyy"
            selectsRange
            startDate={dates[0]}
            endDate={dates[1]}
            placeholderText={placeholder}
            monthsShown={2}
            open={calendarOpen}
            onClickOutside={() => setCalendarOpen(false)}
            customInput={
              <div className="flex w-full p-1 items-center justify-between cursor-pointer">
                <span
                  className={`text-base ${formattedStartDate || formattedEndDate ? "text-black" : "text-gray-400"} pointer-events-none font-semibold`}
                >
                  {formattedStartDate} - {formattedEndDate}
                </span>
              </div>
            }
          />
        </div>
      </div>
    );
  };

  const NumberInputWithPlaceholder = ({
    placeholder,
    value,
    onChange,
    onFocus,
    min,
    max,
    step,
  }) => {
    return (
      <div className="relative">
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <FiUserPlus className="text-2xl" />
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            className={`w-full p-1 placeholder-black cursor-pointer font-semibold ${size === "large" ? "text-base" : "text-xs"}`}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            style={{ outline: "none" }}
          />
        </div>
      </div>
    );
  };

  const containerClasses =
    size === "large"
      ? "w-full lg:w-[70%] md:py-3 py-2 px-4 md:px-16"
      : "w-full w-[54.69%] lg:w-[82%] md:py-1 md:px-9";

  const textSizeClasses = size === "large" ? "text-sm" : "text-xs";

  return (
    <>
      <div className="px-5">
        <div className="font-manrope bg-white border max-w-[1055px] mx-auto w-full sm:flex lg:justify-between items-center border-slate-105 rounded-2xl sm:rounded-full sm:pl-8 sm:pr-4 sm:py-2 p-5 shadow-xl">
          <div
            className={`lg:w-[40%] md:w-[38%] flex items-start flex-col sm:border-r border-b sm:border-b-0 border-slate-105 h-full ${size === "large" ? "sm:py-4 py-3" : "px-3 "}`}
          >
            {/* <h4 className={`text-neutral-400 mb-2 ${textSizeClasses}`}>
              Location
            </h4> */}
            <div
              className={`flex justify-start w-full font-bold text-black ${textSizeClasses}`}
            >
              <StateAutocomplete setState={setState} />
            </div>
          </div>
          <div
            className={`md:w-[33%] lg:w-[30%] flex items-start flex-col sm:border-r border-b sm:border-b-0 border-slate-105 h-full ${size === "large" ? "sm:px-2 md:px-4 lg:px-9 sm:py-4 py-3" : "sm:px-3 "}`}
          >
            {/* <h4 className={`text-neutral-400 mb-2 ${textSizeClasses}`}>
              Check-In / Check-Out
            </h4> */}
            <div
              className={`flex w-full font-bold text-black ${textSizeClasses}`}
              onClick={() => setCalendarOpen(true)}
            >
              <DateInputWithPlaceholder placeholder="Select Dates" />
            </div>
          </div>
          <div
            className={`flex-1 flex items-start flex-col h-full ${size === "large" ? "sm:px-2 md:px-4 lg:px-9 py-1" : "sm:px-2 "}`}
          >
            {/* <h4 className={`text-neutral-400 mb-2 ${textSizeClasses}`}>
              Guests
            </h4> */}
            <div
              className={`relative flex w-full font-bold text-black ${textSizeClasses}`}
            >
              <div
                onClick={() => {
                  setGuestNum(!guestNum);
                }}
              >
                <NumberInputWithPlaceholder
                  placeholder="1"
                  value={guest}
                  onChange={(e) => setguest(Number(e.target.value))}
                />
              </div>
              {guestNum && (
                <div
                  // ref={guestNumberRef}
                  className="w-full min-w-40 rounded-2xl p-3 z-50 bg-white shadow-lg absolute left-0 lg:left-[-30px] sm:top-[65px] top-[45px] max-w-32"
                >
                  <div className="flex items-center text-sm">
                    <Button
                      className="w-12 h-12 min-w-0 p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                      onClick={decrementGuest}
                    >
                      <FaMinus />
                    </Button>
                    <input
                      type="number"
                      value={guest}
                      className="appearance-none w-10 text-center text-black placeholder:text-black"
                      readOnly
                    />
                    <Button
                      className="w-12 h-12 min-w-0 p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                      onClick={incrementGuest}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            className={`md:w-[15%] min-w-0 sm:w-12 sm:h-12 mx-auto sm:px-2 px-4 text-black text-xs flex items-center justify-center gap-2 bg-primary-blue md:text-sm outline-none rounded-full font-semibold capitalize ${size === "large" ? "py-3 md:py-5" : "py-3"}`}
            onClick={() => {
              if (setHeaderSearch) {
                setHeaderSearch(true);
              }
              handleSubmit();
            }}
          >
            {loading ? <RiProgress5Fill /> : "Search"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchProperties;
