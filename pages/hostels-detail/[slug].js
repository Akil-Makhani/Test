import React, {  useEffect, useRef, useState } from "react";
import Image from "next/image";
// import SearchNavbar from "@/components/layout/SearchNavbar";
import { LiaBedSolid } from "react-icons/lia";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import {
  getCalenderApi,
  getHostelDeatil,
} from "@/services/webflowServices";
import { usePathname } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import { format, differenceInDays } from "date-fns";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "@mui/material";
// import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { getItemLocalStorage,setItemLocalStorage } from "@/utils/browserSetting";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";


const ReactStars = dynamic(() => import("react-rating-stars-component"), {
  ssr: false,
});

const AccordianSearch = dynamic(() => import("@/components/accordian/accordianSearch"), {
  ssr: false,
});

const Carousel = dynamic(() => import("@/components/carousel/swipper"), {
  ssr: false,
});

const Breadcrumb = dynamic(() => import("@/components/breadcrumb/breadcrumb"), {
  ssr: false,
});

const HostelsDetails = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [hostelData, setHostelData] = useState();
  const [showCalender, setShowCalender] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const [dates, setDates] = useState([null, null]);
  const [bookingText, setBookingText] = useState("");
  const [roomQuantities, setRoomQuantities] = useState({});
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [currentHostelId, setCurrentHostelId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bedSelections, setBedSelections] = useState({});
  const [guest, setGuest] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    // Load selected rooms and bed selections from localStorage on initial render
    const storedData = JSON.parse(localStorage.getItem("selectedRoomsData"));
    const initialBedSelections = {};

    if (!!storedData?.length) {
      setSelectedRooms(storedData);

      const quantities = storedData.reduce((acc, room) => {
        acc[room.roomId] = room.count;
        return acc;
      }, {});
      setRoomQuantities(quantities);

      // Initialize bed selections with "Lower Bed" if not already set
      storedData.forEach((room) => {
        initialBedSelections[room.roomId] = room.selectedBed || "Lower Bed";
      });
      setBedSelections(initialBedSelections);
    } else {
      // If no data is stored, initialize bed selections for all dorm rooms
      hostelData?.propertyDetails?.rooms.forEach((room) => {
        if (["Male Dorm", "Female Dorm", "Mixed Dorm"].includes(room.type)) {
          initialBedSelections[room._id] = "Lower Bed";
        }
      });
      setBedSelections(initialBedSelections);
    }
  }, [hostelData?.propertyDetails?.rooms]);

  const handleBedSelection = (roomId, bedType) => {
    setBedSelections((prevSelections) => ({
      ...prevSelections,
      [roomId]: bedType,
    }));

    // Update the selected bed in selectedRooms and localStorage
    const updatedRooms = selectedRooms.map((room) =>
      room.roomId === roomId ? { ...room, selectedBed: bedType } : room
    );
    setSelectedRooms(updatedRooms);
    localStorage.setItem("selectedRoomsData", JSON.stringify(updatedRooms));
  };

  useEffect(() => {
    const hostelIdLocal = getItemLocalStorage("hostelId");

    const currentPath = pathname;
    const hostelId = id;
    if (hostelId !== hostelIdLocal) {
      localStorage.removeItem("selectedRoomsData");
      setRoomQuantities({});
      setSelectedRooms([]);
      setCurrentHostelId(hostelIdLocal);
      setItemLocalStorage("hostelId", id);
    }

    const storedData = JSON.parse(localStorage.getItem("selectedRoomsData"));
    if (storedData) {
      setSelectedRooms(storedData);
      const quantities = storedData.reduce((acc, room) => {
        acc[room.roomId] = room.count;
        return acc;
      }, {});
      setRoomQuantities(quantities);

      const beds = storedData.reduce((acc, room) => {
        if (["Male Dorm", "Female Dorm", "Mixed Dorm"].includes(room.type)) {
          acc[room.roomId] = room.selectedBed || "Lower Bed"; // Default to Lower Bed if not set
        }
        return acc;
      }, {});
      setBedSelections(beds);
    }
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("bookingdata");
      const selectedCurrencySymbol = localStorage.getItem(
        "selectedCurrencySymbol"
      );
      const selectedCurrencyCode = localStorage.getItem("selectedCurrencyCode");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDates([
          parsedData.checkIn ? new Date(parsedData.checkIn) : null,
          parsedData.checkOut ? new Date(parsedData.checkOut) : null,
        ]);
        setGuest(parsedData?.guest || 1);
      }
      if (selectedCurrencySymbol) {
        setCurrencySymbol(selectedCurrencySymbol);
      }
      if (selectedCurrencyCode) {
        setCurrency(selectedCurrencyCode);
      }
    }
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setIsLoading(true);
      if (id) {
        getDetail(id);
      }
      setIsLoading(false);
    } else {
      isFirstRender.current = false;
    }
  }, [id, dates]);
  const getDetail = async () => {
    try {
      const formattedCheckIn = dates[0] ? format(dates[0], "yyyy-MM-dd") : null;
      const formattedCheckOut = dates[1]
        ? format(dates[1], "yyyy-MM-dd")
        : null;
      const response = await getHostelDeatil(
        id,
        formattedCheckIn,
        formattedCheckOut,
        currency
      );
      if (response?.status == 200) {
        setHostelData(response?.data?.data);

        console.log(response, "========");
      }
      console.log("response.....", response?.data?.data?.combinedData);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("ostelData?.combinedData", hostelData?.propertyDetails);
  const hostel = {
    name: "Namstey Mumbai Back Packers",
    path: "Home > Hostel > 9.80km from city center",
    distance: "5.8 Km away from city center",
    rating: 4.96,
    reviews: 672,
    amenities: ["Wi-Fi", "1 bed", "Shared Bathroom"],
    image: "/path/to/hostel-image.jpg",
    rooms: [
      {
        type: "4 Bed Mixed Dorm Ensuite",
        price: "$20 per night",
        image: "/path/to/room-image.jpg",
        isAvailable: true,
      },
      {
        type: "8 Bed Mixed Dorm Ensuite",
        price: "$25 per night",
        image: "/path/to/room-image.jpg",
        isAvailable: true,
      },
    ],
  };

  const amenityIcons = {
    "Wi-Fi": `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/bluewifi.svg`,
    "1 bed": `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/hostelbed.svg`,
    "Shared Bathroom": `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/bathroom.svg`,
  };
  if (hostelData) {
    console.log("hostel data ", hostelData?.combinedData);
  }

  const getCalender = async () => {
    setShowCalender(!showCalender);

    // Log dates to ensure they are correctly set
    console.log("dates object:", dates);
    var start = dates?.checkIn;
    var end = dates?.checkOut;
    const payload = {
      startDate: start,
      endDate: end,
    };

    // Log payload to ensure endDate is present
    console.log("payload:", payload);

    try {
      const res = await getCalenderApi(payload);
      console.log("calender response", res);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Hostel", href: "/search" },
    ...(hostelData?.propertyDetails?.property?.distanceFromCityCenter
      ? [
          {
            label: `${hostelData.propertyDetails.property.distanceFromCityCenter} KM away from city`,
            href: "",
          },
        ]
      : []),
  ];

  const handleDateChange = (dates) => {
    setDates(dates);

    const formattedCheckIn = dates[0] ? format(dates[0], "yyyy-MM-dd") : "";
    const formattedCheckOut = dates[1] ? format(dates[1], "yyyy-MM-dd") : "";

    const existingData = JSON.parse(localStorage.getItem("bookingdata")) || {};

    if (formattedCheckIn && formattedCheckOut) {
      existingData.checkIn = formattedCheckIn;
      existingData.checkOut = formattedCheckOut;
    }

    localStorage.setItem("bookingdata", JSON.stringify(existingData));
  };

  const DateInputWithPlaceholder = ({ placeholder }) => {
    const formattedStartDate = dates[0]
      ? format(dates[0], "dd-MMM-yyyy")
      : "Check In";
    const formattedEndDate = dates[1]
      ? format(dates[1], "dd-MMM-yyyy")
      : "Check Out";

    return (
      <div className="relative">
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <CiCalendar
            className="text-xl"
            onClick={() => setCalendarOpen(true)}
          />
          <DatePicker
            selected={dates[0]}
            onChange={handleDateChange}
            dateFormat="dd-MMM-yyyy"
            selectsRange
            startDate={dates[0]}
            endDate={dates[1]}
            placeholderText={placeholder}
            open={calendarOpen}
            onClickOutside={() => setCalendarOpen(false)}
            customInput={
              <div className="flex w-full p-1 items-center justify-between cursor-pointer">
                <span
                  className={`text-xs ${formattedStartDate || formattedEndDate ? "text-black" : "text-gray-400"} pointer-events-none font-normal`}
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

  const getDateRangeText = () => {
    if (!dates[0] || !dates[1]) return "Select Dates";

    const nights = differenceInDays(dates[1], dates[0]) + 1;
    const startDate = format(dates[0], "EEE d MMM, yyyy");
    const endDate = format(dates[1], "EEE d MMM, yyyy");

    return `${nights} night${nights > 1 ? "s" : ""} starting from ${startDate}`;
  };

  // console.log("dates",dates[0],format(dates[0], "yyyy-MM-dd") )

  // useEffect(() => {
  //   // Load room quantities from localStorage on initial render
  //   const storedQuantities = JSON.parse(localStorage.getItem("selectedRoomsData"));
  //   if (storedQuantities) {
  //     setRoomQuantities(storedQuantities.rooms || {});
  //     setSelectedRooms(storedQuantities.rooms || {});
  //   }
  // }, []);

  const updateRoomQuantity = (room, delta) => {
    const roomId = room._id;
    const totalRooms = selectedRooms
      .filter((r) => r.hostelId === room.hostelId)
      .reduce((acc, room) => acc + room.count, 0);

    if (delta > 0 && totalRooms >= 3) {
      toast.error("You can only add up to 3 rooms.");
      return;
    }

    const updatedRooms = [...selectedRooms];
    const existingRoomIndex = updatedRooms.findIndex(
      (r) => r.roomId === roomId
    );

    if (existingRoomIndex !== -1) {
      const newCount = Math.max(
        updatedRooms[existingRoomIndex].count + delta,
        0
      );

      if (newCount === 0) {
        updatedRooms.splice(existingRoomIndex, 1);
      } else {
        updatedRooms[existingRoomIndex].count = newCount;
      }
    } else {
      if (delta > 0) {
        const updatedRoom = { ...room, roomId, count: 1 };

        if (["Male Dorm", "Female Dorm", "Mixed Dorm"].includes(room.type)) {
          updatedRoom.selectedBed = "Lower Bed";
        }

        updatedRooms.push(updatedRoom);
      }
    }

    setSelectedRooms(updatedRooms);
    setRoomQuantities(
      updatedRooms.reduce((acc, r) => {
        acc[r.roomId] = r.count;
        return acc;
      }, {})
    );
    localStorage.setItem("selectedRoomsData", JSON.stringify(updatedRooms));
  };

  const lowerBedCharges = selectedRooms.reduce((total, room) => {
    if (bedSelections[room.roomId] === "Lower Bed") {
      return (
        total +
        room?.rate?.weekdayRate?.value *
          0.15 *
          room.count *
          (differenceInDays(dates[1], dates[0]) + 1)
      );
    }
    return total;
  }, 0);

  const totalCost = selectedRooms.reduce((total, room) => {
    let roomPrice = room?.rate?.weekdayRate?.value || 0;
    return (
      total +
      roomPrice * room.count * (differenceInDays(dates[1], dates[0]) + 1)
    );
  }, 0);

  // Calculate 85% of the total cost
  const fullPayment = totalCost * 0.85;

  // Calculate 15% of the total cost
  const payableNow = totalCost * 0.15 + lowerBedCharges;

  const dormRooms =
    hostelData?.propertyDetails?.rooms?.filter((room) =>
      ["Male Dorm", "Female Dorm", "Mixed Dorm"].includes(room.type)
    ) || [];

  const privateRooms =
    hostelData?.propertyDetails?.rooms?.filter(
      (room) => !["Male Dorm", "Female Dorm", "Mixed Dorm"].includes(room.type)
    ) || [];

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {/* <SearchNavbar /> */}
      <div className="bg-white min-h-screen">
        <div className="w-full relative">
          <div className="py-8">
            <Carousel
              image={hostelData?.propertyDetails?.property?.photos || []}
            />
          </div>
        </div>
        <div className="container px-4 lg:px-14">
          <div className="mx-auto flex flex-col lg:flex-row gap-11">
            <main className="max-w-7xl mx-auto w-full lg:w-2/3">
              <div className="flex flex-col lg:flex-row lg:space-x-6">
                <div className="flex-1">
                  <Breadcrumb items={breadcrumbItems} />
                  <h1 className="text-3xl">
                    {hostelData?.propertyDetails?.property?.name}
                  </h1>
                  <p className="text-base font-bold py-3">
                    {
                      hostelData?.propertyDetails?.property
                        ?.distanceFromCityCenter
                    }{" "}
                    KM away from city
                  </p>

                  <p className="text-xl font-bold">
                    {" "}
                    {hostelData?.combinedData?.property?.name}
                  </p>
                  <div className="flex items-center space-x-1 text-yellow-500 py-2">
                    {/* {[...Array(Math.floor(hostelData?.propertyDetails?.property?.startRating))].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.54L.487 7.906l6.568-.955L10 .905l2.945 6.046 6.568.955-4.758 3.644 1.123 6.54z" />
                    </svg>
                  ))} */}

                    <ReactStars
                      count={5}
                      value={
                        hostelData?.propertyDetails?.property?.starRating || "0"
                      }
                      size={24}
                      edit={false}
                      isHalf={true}
                    />
                    {/* {hostelData?.propertyDetails?.property?.starRating % 1 !==
                      0 && (
                      <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                        <path d='M10 15l-5.878 3.09 1.123-6.54L.487 7.906l6.568-.955L10 .905v14.095z' />
                      </svg>
                    )} */}
                    <span className="text-gray-600 ml-2">
                      {hostelData?.propertyDetails?.property?.starRating || "0"}{" "}
                      (
                      {hostelData?.propertyDetails?.property?.overallRating
                        ?.overall || "0"}{" "}
                      reviews)
                    </span>
                  </div>
                  <p className="text-[#888888] text-sm py-2 w-full">
                    {hostelData?.propertyDetails?.property?.type}
                  </p>
                  <p className="text-[#888888] text-sm py-2 w-full">
                    {hostelData?.propertyDetails?.property?.aboutUs}
                  </p>
                  <button className="mt-4 bg-[#40E0D033] text-black font-semibold px-4 py-2 rounded-lg w-full flex justify-between items-center">
                    <span>Book Your Stay</span>
                    <div
                      className="flex items-center space-x-2"
                      onClick={() => setCalendarOpen(true)}
                    >
                      {/* <span className='text-sm'>{dates?.checkIn}</span>
                      <ChevronDown className='text-black border-r' size={12} />
                      <span className='text-sm'>{dates?.checkOut}</span>
                      <ChevronDown className='text-black' size={12} /> */}
                      <DateInputWithPlaceholder placeholder="Select Dates" />
                    </div>
                  </button>
                </div>
              </div>
              {!!dormRooms?.length && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Dorm Rooms</h2>
                  <div className="space-y-6">
                    {dormRooms?.map((room, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-3xl shadow-md flex flex-col md:flex-row relative"
                      >
                        {hostelData?.propertyDetails?.property
                          ?.freeCancellation && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/freecancel.svg`}
                            alt="Free Cancellation"
                            width={150}
                            height={35}
                            objectFit="contain"
                            className="absolute left-0 top-[1.5rem] z-10 transform translate-x-[-10%]"
                            loading="lazy"
                          />
                        )}
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/hotel.svg`}
                          alt={room?.name}
                          width={200}
                          height={100}
                          className="md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl object-cover w-full h-[15rem] md:w-[30%]"
                          loading="lazy"
                        />
                        <div className="ml-0 md:ml-4 py-4 px-4 md:mt-0 flex flex-col justify-between flex-1">
                          <h2 className="text-xl font-bold mb-1">
                            {room?.name}
                          </h2>
                          {/* <Image
                                    src={assets?.Label}
                                    alt={hostel?.name}
                                    width={44}
                                    height={44}
                                    className="absolute bottom-0 left-[190%] mr-[10px]"
                                  /> */}

                          <div className="font-manrope font-normal text-base leading-5 text-[#888888] mb-2">
                            Taxes Not Included
                          </div>
                          {/* <p className="text-gray-600 text-base py-1">
                                {hostel?.distance}
                              </p> */}
                          {/* <div className="flex items-center space-x-1 text-yellow-500">
                                {[...Array(Math.floor(hostel?.rating))].map(
                                  (_, i) => (
                                    <svg
                                      key={i}
                                      className="w-4 h-4 fill-current"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 15l-5.878 3.09 1.123-6.54L.487 7.906l6.568-.955L10 .905l2.945 6.046 6.568.955-4.758 3.644 1.123 6.54z" />
                                    </svg>
                                  )
                                )}
                                {hostel?.rating % 1 !== 0 && (
                                  <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 15l-5.878 3.09 1.123-6.54L.487 7.906l6.568-.955L10 .905v14.095z" />
                                  </svg>
                                )}
                                <span className="text-gray-600 ml-2 text-xs ">
                                  {hostel?.rating} ({hostel?.reviews} reviews)
                                </span>
                              </div> */}

                          <div className="flex space-x-4 font-medium text-sm text-black mb-4">
                            {hostel?.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="flex items-center space-x-1"
                              >
                                <Image
                                  src={amenityIcons[amenity]}
                                  className="w-4 h-4 fill-current text-teal-500"
                                  alt={amenity}
                                  width={16}
                                  height={16}
                                  loading="lazy"
                                />
                                <span>{amenity}</span>
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="flex space-x-3 items-center">
                              <button
                                className={`border border-[#EEEEEE] text-black px-5 py-2 rounded-3xl flex items-center hover:bg-[#40E0D033] text-sm ${bedSelections[room._id] === "Lower Bed" ? "bg-[#40E0D033]" : ""}`}
                                onClick={() =>
                                  handleBedSelection(room._id, "Lower Bed")
                                }
                              >
                                Lower Bed
                              </button>
                              <button
                                className={`border border-[#EEEEEE] text-black px-5 py-2 rounded-3xl flex items-center hover:bg-[#40E0D033] text-sm ${bedSelections[room._id] === "Upper Bed" ? "bg-[#40E0D033]" : ""}`}
                                onClick={() =>
                                  handleBedSelection(room._id, "Upper Bed")
                                }
                              >
                                Upper Bed
                              </button>
                            </div>
                            <span className="text-black font-bold text-xl md:text-right md:ml-auto p-4">
                              {room?.rate?.weekdayRate?.value} {currencySymbol}
                            </span>
                          </div>
                          <div className="flex md:justify-end items-center">
                            {!roomQuantities[room._id] ? (
                              <button
                                className="bg-black text-white text-sm px-6 py-3 rounded-3xl flex items-center hover:bg-primary-blue"
                                onClick={() => updateRoomQuantity(room, 1)}
                              >
                                <FaPlus className="mr-1" />
                                Book
                              </button>
                            ) : (
                              <>
                                <Button
                                  onClick={() => updateRoomQuantity(room, -1)}
                                  className="w-12 h-12 min-w-0 p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                                >
                                  <FaMinus />
                                </Button>
                                <input
                                  type="number"
                                  value={roomQuantities[room._id] || 1}
                                  className="appearance-none w-10 text-center text-black placeholder:text-black mx-2"
                                  readOnly
                                />
                                <Button
                                  onClick={() => updateRoomQuantity(room, 1)}
                                  className="w-12 h-12 min-w-0 p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                                >
                                  <FaPlus />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page + 1}
                      onClick={() => handlePageChange(page + 1)}
                      className={`px-3 py-1 mx-1 ${
                        currentPage === page + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300"
                      } rounded`}
                    >
                      {page + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div> */}
                  </div>
                </div>
              )}
              {!!privateRooms?.length && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Private Rooms</h2>
                  <div className="space-y-6">
                    {privateRooms?.map((room, index) => {
                      let photoUrl =
                        hostelData?.propertyDetails?.property?.photos[
                          index %
                            hostelData?.propertyDetails?.property?.photos.length
                        ]?.url;

                      if (photoUrl && !photoUrl.startsWith("http")) {
                        photoUrl = `https://${photoUrl}`;
                      }

                      const fallbackImage =
                        "https://via.placeholder.com/200x100.png?text=No+Image";

                      const weekdayRate = room?.rate?.weekdayRate?.value;
                      const weekendRate = room?.rate?.weekendRate?.value;

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-3xl shadow-md flex flex-col md:flex-row relative"
                        >
                          {hostelData?.propertyDetails?.property
                            ?.freeCancellation && (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/freecancel.svg`}
                              alt="Free Cancellation"
                              width={150}
                              height={35}
                              objectFit="contain"
                              className="absolute left-0 top-[1.5rem] z-10 transform translate-x-[-10%]"
                              loading="lazy"
                            />
                          )}
                          <Image
                            src={photoUrl || fallbackImage}
                            alt={room?.name}
                            width={200}
                            height={100}
                            className="rounded-l-3xl object-cover w-full h-[15rem] md:w-[30%]"
                            loading="lazy"
                          />
                          <div className="ml-0 md:ml-4 py-4 px-4 md:mt-0 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex justify-between items-start">
                                <div className="flex items-start relative">
                                  <h2 className="text-xl font-bold">
                                    {room?.name}
                                  </h2>
                                </div>
                              </div>
                              <div
                                style={{
                                  fontFamily: "Manrope",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  lineHeight: "21.86px",
                                  color: "#888888",
                                }}
                              >
                                Taxes Not Included
                              </div>
                            </div>
                            <div className="flex space-x-4 font-medium text-sm text-black">
                              {hostel?.amenities?.map((amenity, index) => (
                                <span
                                  key={index}
                                  className="flex items-center space-x-1"
                                >
                                  <Image
                                    src={amenityIcons[amenity]}
                                    className="w-4 h-4 fill-current text-teal-500"
                                    alt={amenity}
                                    loading="lazy"
                                  />
                                  <span>{amenity}</span>
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between">
                              {/* <div className="flex space-x-3 items-center">
                              <button
                                  className={`border border-[#EEEEEE] text-black px-5 py-2 rounded-3xl flex items-center hover:bg-[#40E0D033] text-sm ${bedSelections[room._id] === 'Lower Bed' ? 'bg-[#40E0D033]' : ''}`}
                                  onClick={() => handleBedSelection(room._id, 'Lower Bed')}
                                >
                                  Lower Bed
                                </button>
                                <button
                                  className={`border border-[#EEEEEE] text-black px-5 py-2 rounded-3xl flex items-center hover:bg-[#40E0D033] text-sm ${bedSelections[room._id] === 'Upper Bed' ? 'bg-[#40E0D033]' : ''}`}
                                  onClick={() => handleBedSelection(room._id, 'Upper Bed')}
                                >
                                  Upper Bed
                                </button>
                              </div> */}
                              <span className="text-black font-bold text-sm md:text-right md:ml-auto p-5">
                                {/* {weekdayRate} {currencySymbol} (Weekday) / {weekendRate} {currencySymbol}
                                (Weekend) Per Night */}
                                {weekdayRate} {currencySymbol}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              {/* <div className="flex items-center space-x-1">
                                <span
                                  className="text-sm font-medium"
                                  onClick={getCalender}
                                >
                                  Available calendar
                                </span>
                                <ChevronDown
                                  className="text-black border-r"
                                  size={12}
                                />
                                {showCalender && (
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    inline
                                  />
                                )}
                              </div> */}
                              {/* <button
                                className="bg-black text-white text-sm px-6 py-3 rounded-3xl flex items-center hover:bg-primary-blue"
                                onClick={() => {
                                  router?.push(`/checkout/${room?._id}`);
                                  console.log("checkout", room?._id);
                                }}
                              >
                                <FaPlus className="mr-1" />
                                Add
                              </button> */}

                              <div className="flex items-center text-sm">
                                {!roomQuantities[room._id] ? (
                                  <button
                                    className="bg-black text-white text-sm px-6 py-3 rounded-3xl flex items-center hover:bg-primary-blue"
                                    onClick={() => updateRoomQuantity(room, 1)}
                                  >
                                    <FaPlus className="mr-1" />
                                    Book
                                  </button>
                                ) : (
                                  <>
                                    <Button
                                      onClick={() =>
                                        updateRoomQuantity(room, -1)
                                      }
                                      className="w-12 h-12 min-w-0 p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                                    >
                                      <FaMinus />
                                    </Button>
                                    <input
                                      type="number"
                                      value={roomQuantities[room._id] || 1}
                                      className="appearance-none w-10 text-center text-black placeholder:text-black mx-2"
                                      readOnly
                                    />
                                    <Button
                                      onClick={() =>
                                        updateRoomQuantity(room, 1)
                                      }
                                      className="w-12 h-12 min-w-0 p-0 rounded-full flex items-center justify-center bg-primary-blue text-white"
                                    >
                                      <FaPlus />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </main>
            <div className="lg:w-2/6">
              {!!selectedRooms?.length ? (
                <div className=" bg-[#F7F7F7] rounded-3xl py-7 px-4 mb-4">
                  <h4 className="mb-5 text-lg font-bold">
                    Your Booking Summary
                  </h4>
                  <div className="flex items-center pb-4 border-b gap-4">
                    <Image
                      // src={assets.CheckOutBookingHostel}

                      src={`https://${hostelData?.propertyDetails?.property?.photos[0]?.url}`}
                      width={10}
                      height={10}
                      alt="Room"
                      className="w-24 h-24 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-black mb-2">
                        {hostelData?.propertyDetails?.property?.name}
                      </p>
                      <p className="text-[12px] font-medium flex items-center gap-1 text-black mb-1">
                        <span className="text-primary-blue text-base">
                          <LuCalendarDays />
                        </span>{" "}
                        {format(dates[0], "yyyy-MM-dd")} ,
                        {differenceInDays(dates[1], dates[0]) + 1} nights
                      </p>
                      <p className="text-[12px] font-medium flex items-center gap-1 text-black">
                        <span className="text-primary-blue text-base">
                          <TbUsersGroup />
                        </span>{" "}
                        {guest} guests
                      </p>
                    </div>
                  </div>
                  <div className="py-4 border-b">
                    {selectedRooms.map((room) => (
                      <div key={room.roomId} className="mb-4">
                        <p className="text-sm font-bold text-black">
                          {room.name}
                        </p>
                        <div className="py-2 flex items-center justify-between">
                          <p className="py-1 text-sm font-medium text-black">
                            {currencySymbol} {room?.rate?.weekdayRate?.value} x{" "}
                            {room.count} Rooms/Beds x{" "}
                            {differenceInDays(dates[1], dates[0]) + 1} Nights
                          </p>
                          <p className="text-sm font-medium text-black">
                            {currencySymbol}
                            {(
                              room?.rate?.weekdayRate?.value *
                              room.count *
                              (differenceInDays(dates[1], dates[0]) + 1)
                            ).toFixed(2)}
                          </p>
                        </div>
                        {bedSelections[room.roomId] === "Lower Bed" && (
                          <div className="py-2 flex items-center justify-between">
                            <p className="py-1 text-sm font-medium text-black">
                              Lower Bed Service
                            </p>
                            <p className="text-sm font-medium text-black">
                              {currencySymbol}{" "}
                              {(
                                room?.rate?.weekdayRate?.value *
                                0.15 *
                                room.count *
                                (differenceInDays(dates[1], dates[0]) + 1)
                              ).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-1">
                      <p className="text-sm font-medium">Taxes</p>
                      <p className="text-sm font-medium">0</p>
                    </div>
                  </div>

                  {/* <div className="py-4 border-b">
                    <p className="text-sm font-bold text-black">
                      Full Payment Confirmed Booking / Partial Payment Confirm
                      Booking
                    </p>
                  </div> */}

                  <div className="py-4 border-b">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-black font-bold">
                        Payable on Arrival
                      </p>
                      <p className="text-sm font-medium">
                        {fullPayment.toFixed(2)} {currencySymbol}
                      </p>
                    </div>
                    <div className="mt-5">
                      <button
                        className="w-full text-sm font-semibold py-4 bg-primary-blue hover:bg-sky-blue-750 hover:text-white rounded-full"
                        onClick={handleCheckout}
                      >
                        Payable Now - {payableNow.toFixed(2)} {currencySymbol}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between pb-5">
                    <p className="text-base font-bold">Total</p>
                    <p className="text-sm font-medium">
                      {(totalCost + lowerBedCharges).toFixed(2)}{" "}
                      {currencySymbol}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="couponCode"
                      className="text-sm font-medium block mb-2"
                    >
                      Have a coupon Apply?
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="couponCode"
                        placeholder="Discount Coupon"
                        className="w-full p-3 pr-24  text-sm border rounded-3xl text-black placeholder:text-gray-400 font-light"
                      />
                      <button className="absolute text-sm right-1 top-1 py-2 px-6 bg-black text-white rounded-3xl hover:bg-primary-blue hover:text-black">
                        Apply
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gpa-2 justify-between mt-4">
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/upi.svg`}
                      width={50}
                      height={17}
                      loading="lazy"
                    />
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/visa.svg`}
                      width={50}
                      height={19}
                      loading="lazy"
                    />
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/master_card.svg`}
                      width={35}
                      height={31}
                      loading="lazy"
                    />
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/rupay.svg`}
                      width={60}
                      height={19}
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-md p-6 rounded-3xl w-full  h-[449px] flex flex-col">
                  <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
                  <div className="border-b w-full pb-2 mb-4">
                    <span className="text-[#888888] text-sm">
                      {getDateRangeText()}
                    </span>
                  </div>
                  <div className="px-6 py-4 text-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/booksummary.svg`}
                      alt="Summary"
                      width={251}
                      height={190}
                      className="rounded-lg object-cover mb-4"
                      loading="lazy"
                    />
                    <h6 className="text-black font-medium mb-5 text-base text-center">
                      Please select your room
                    </h6>
                    <button className="mt-auto bg-[#40E0D0] hover:bg-teal-500 hover:text-white text-black font-medium px-4 py-3 flex items-center justify-center gap-2 rounded-full w-full">
                      <LiaBedSolid />
                      Choose Bed
                    </button>
                  </div>
                </div>
              )}
              <div className="bg-[#e0f7f9] text-black p-5 rounded-xl my-5 font-sans shadow-md">
                <p className="font-bold text-sm">
                  Madpackers requires 100% advance or pre-payment of the total
                  amount for reservations to be confirmed before the arrival
                  date.
                </p>
                <p className=" text-sm">
                  Madpackers will process payment cards issued outside of India
                  once the free cancellation period is over, ensuring they have
                  sufficient balance. For cards issued in India, bookings will
                  not be confirmed unless we receive the full payment in
                  advance.{" "}
                  <a href="#" className="text-[#00a0f0] hover:underline">
                    Read More
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="md:mt-8">
            {hostelData ? (
              <AccordianSearch
                combinedData={hostelData?.propertyDetails}
                hostelIdd={id}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelsDetails;
