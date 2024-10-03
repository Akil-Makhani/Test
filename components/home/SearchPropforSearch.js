import React, { useEffect, useState } from "react";
import StateAutocomplete from "./StateAutocomplete";
import { Button } from "@mui/material";
import {  Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import { format } from "date-fns";

const SearchPropforSearch = ({
  state,
  setState,
  dataa,
  guest,
  setGuest,
  handleChange,
  handleSubmit,
  setHeaderSearch,
  size = "small",
}) => {
  const [dates, setDates] = useState([null, null]);

  const [guestNum, setGuestNum] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("bookingdata");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDates([
          parsedData.checkIn ? new Date(parsedData.checkIn) : null,
          parsedData.checkOut ? new Date(parsedData.checkOut) : null,
        ]);
      }
    }
  }, []);

  const incrementGuest = () => {
    if (guest < 10) {
      setGuest(guest + 1);
    }
  };

  const decrementGuest = () => {
    if (guest > 0) {
      setGuest(guest - 1);
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
              <div className="flex w-full pl-1 items-center justify-between cursor-pointer">
                <span
                  className={`base:text-xs text-base ${formattedStartDate || formattedEndDate ? "text-black" : "text-gray-400"} pointer-events-none font-normal`}
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

  const NumberInputWithPlaceholder = ({ placeholder, value }) => {
    return (
      <div className="relative">
        <div className="flex items-center justify-center gap-1">
          <FiUserPlus className="text-2xl" />
          <input
            type="number"
            min={1}
            max={10}
            value={value}
            readOnly
            className={`w-full p-1 placeholder-black font-normal ${
              size === "large" ? "text-base" : "base:text-xs text-base"
            }`}
            placeholder={placeholder}
            style={{ outline: "none" }}
          />
        </div>
      </div>
    );
  };

  const textSizeClasses = size === "large" ? "text-sm" : "text-xs";

  return (
    <>
      <div className="w-full xl:px-0 base:px-3 px-5 base:max-w-[490px] mx-auto relative pb-8 base:pb-0">
        <div className="font-manrope bg-white base:border base:flex grid grid-cols-3 base:flex-nowrap lg:justify-between items-center base:border-slate-105 base:rounded-full base:pl-2 base:pr-3 base:py-2 base:shadow-xl gap-4 base:gap-0">
          {/* Location Input */}
          <div
            className={`z-[99] col-span-3 base:w-36 w-full base:border-r base:border-t-0 base:rounded-none base:border-l-0 border-slate-105 h-full base:border-b-0 border ${
              size === "large"
                ? "py-1"
                : "base:px-2 px-4 base:py-0 py-3 rounded-xl"
            }`}
          >
            {/* <h4 className={` text-neutral-400 mb-1 ${textSizeClasses}`}>
              Location
            </h4> */}
            <div
              className={`inner_search flex justify-start w-full font-bold text-black ${textSizeClasses}`}
            >
              <StateAutocomplete state={state} setState={setState} />
            </div>
          </div>

          {/* Check In Input */}
          <div
            className={`z-[99] base:max-w-36 xs:col-span-2 col-span-3 flex items-start flex-col base:border-r border base:border-t-0 base:border-l-0 base:border-b-0 rounded-xl base:rounded-none border-slate-105 h-full min-h-14 xs:min-h-0 ${
              size === "large"
                ? "px-1 md:px-4 lg:px-9 base:py-1"
                : "base:px-2 px-4 base:py-0 py-3"
            }`}
          >
            {/* <h4 className={` text-neutral-400  mb-1 ${textSizeClasses}`}>
              Check-In - Check-Out
            </h4> */}
            <div
              className={`flex w-full font-bold text-black ${textSizeClasses}`}
              onClick={() => setCalendarOpen(true)}
            >
              <DateInputWithPlaceholder placeholder="Select Dates" />
            </div>
          </div>

          {/* Check Out Input */}
          {/* <div
            className={`max-w-36 flex items-start flex-col border-r border-slate-105 h-full ${
              size === "large" ? "px-1 md:px-2 lg:px-9 py-1" : "px-2"
            }`}
          >
            <h4 className={` text-neutral-400  mb-1 ${textSizeClasses}`}>
              Check Out
            </h4>
            <div
              className={`flex w-full font-bold text-black ${textSizeClasses}`}
              onClick={() => setCalendarOpen(true)}
            >
               <DateInputWithPlaceholder placeholder='Select Dates' />
            </div>
          </div> */}

          {/* Guests Input */}
          <div
            className={`base:max-w-[70px] col-span-3 xs:col-span-1 flex items-start flex-col h-full base:border-r-0 border base:border-t-0 base:border-l-0 base:border-b-0 rounded-xl base:rounded-none border-slate-105 ${
              size === "large"
                ? "px-1 md:px-4 lg:px-9 py-1"
                : "base:px-2 px-4 py-3 base:py-0"
            }`}
          >
            {/* <h4 className={` text-neutral-400 mb-1 ${textSizeClasses}`}>
              Guests
            </h4> */}
            <div
              className={`relative flex w-full font-bold text-black ${textSizeClasses}`}
            >
              <div onClick={() => setGuestNum(!guestNum)}>
                <NumberInputWithPlaceholder placeholder="1" value={guest} />
              </div>

              {/* Guests Dropdown */}
              {guestNum && (
                <div className="w-full min-w-28 rounded-xl p-2 z-50 bg-white shadow-lg absolute left-0 lg:left-[-10px] top-[45px]">
                  <div className="flex items-center base:text-sm text-base justify-center">
                    <Button
                      className="base:w-8 base:h-8 w-10 h-10 min-w-0 text-xl p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                      onClick={decrementGuest}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={guest}
                      className="appearance-none w-8 text-center text-black placeholder:text-black focus:outline-none"
                      readOnly
                    />
                    <Button
                      className="base:w-8 base:h-8 w-10 h-10 min-w-0 text-lg p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                      onClick={incrementGuest}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <Button
            className={`min-w-0 base:w-20 base:h-10 col-span-3 w-full text-white base:text-xs flex items-center justify-center gap-2 bg-black md:text-sm outline-none rounded-full text-center  ${
              size === "large" ? "py-3 md:py-5" : "base:py-3 py-4"
            }`}
            onClick={() => {
              if (setHeaderSearch) {
                setHeaderSearch(true);
              }
              handleSubmit();
            }}
          >
            <Search className="text-white base:hidden" size={18} />
            <span className="base:flex-1 capitalize">Search</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchPropforSearch;
