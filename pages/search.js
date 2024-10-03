import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe, Grip, User } from "lucide-react";
import { FaStar } from "react-icons/fa";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";

import { Box, Divider, Drawer, Modal, Backdrop, Fade } from "@mui/material";
import { getlistApiPagination } from "@/services/webflowServices";
import { MdInsertEmoticon } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoSearch } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import dynamic from "next/dynamic";

// Lazy load MapComponent to ensure SSR false
const MapComponent = dynamic(() => import("../components/map/mapComponent"), {
  ssr: false,
});

// Lazy load SortPopup
const SortPopup = dynamic(() => import("../components/popup/sortPopup"), {
  ssr: false,
});

const CustomPagination = dynamic(
  () => import("../components/customPagination/customPagination"),
  {
    ssr: false,
  }
);

const SearchPropforSearch = dynamic(
  () => import("../components/home/SearchPropforSearch"),
  {
    ssr: false,
  }
);


import Faciicons from "@/services/icon";
import { getItemLocalStorage, setItemLocalStorage } from "@/utils/browserSetting";
import { useRouter } from "next/router";

const SearchListing = () => {
  // Mobile Drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  // Mobile Drawer for Search
  const [openSearchMobile, setOpenSearchMobile] = useState(false);
  const handleOpenSearchMobile = () => setOpenSearchMobile(true);
  const handleCloseSearchMobile = () => setOpenSearchMobile(false);

  const styleMobileSerach = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 6,
  };

  const [initialData, setInitialData] = useState({});
  const router = useRouter();

  // States for search criteria
  const [state, setState] = useState("");
  const [dataa, setDataa] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guest, setGuest] = useState(1);
  const [selectedstate, setselectedstate] = useState("");
  // States for search results
  const [property, setProperty] = useState([]);
  const [headerSearch, setHeaderSearch] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const propertiesPerPage = 10;

  // Sorting state
  const [sort, setSort] = useState(null);
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("bookingdata");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setInitialData(parsedData);
        setState(parsedData.state || "");
        setDataa({
          checkIn: parsedData.checkIn || "",
          checkOut: parsedData.checkOut || "",
        });
        setGuest(parsedData.guest || 1);
      }
      const currencyData = getItemLocalStorage("selectedCurrencyCode");
      setCurrency(currencyData);
    }
  }, []);
  // Fetch data function
  const getData = useCallback(
    async (page = 1) => {
      try {
        const searchState = state.trim();
        if (!searchState) {
          setProperty([]);
          setTotalPages(1);
          return;
        }
        const finalState = searchState.split(",")[0].trim();

        const res = await getlistApiPagination(
          finalState,
          page,
          propertiesPerPage,
          sort,
          dataa?.checkIn,
          dataa?.checkOut,
          currency || ""
        );
        setselectedstate(searchState);

        if (res?.data?.data?.properties) {
          setProperty(res.data.data.properties);
          setTotalPages(res.data.data.pagination.totalPages);
          const checkIn = dataa?.checkIn;
          const checkOut = dataa?.checkOut;
          const bookingData = { state, checkIn, checkOut, guest: guest }; // Use the `guest` state directly
          localStorage.setItem("bookingdata", JSON.stringify(bookingData));
        } else {
          setProperty([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProperty([]);
        setTotalPages(1);
      }
    },
    [state, sort, dataa]
  );

  // Fetch data on initial render if initialData is present
  useEffect(() => {
    if (initialData) {
      getData();
    }
  }, [initialData]);

  // Handle search form submission
  const handleSubmit = () => {
    setHeaderSearch(true);
    setCurrentPage(1); // Reset to first page on new search
    getData(1);
  };
  // Handle input changes for date and other search criteria
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataa((prevData) => ({
      ...prevData,
      checkIn: value?.checkIn,
      checkOut: value?.checkOut,
    }));
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getData(newPage);
    }
  };

  // Extract free facilities (up to 3) for display
  const freeFacilities = (item) => {
    return Array.isArray(item?.freeFacilities)
      ? item.freeFacilities.slice(0, 3)
      : [];
  };

  // Map Sticky On Scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="font-manrope">
        {/* Header */}
        <header className="bg-[#40E0D0] py-2 shadow-md">
          <div className="container px-4 lg:px-14 flex items-center justify-between">
            {/* Logo */}
            <div>
              <Link href="/" rel="canonical" prefetch={false}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/mixdrom-white.svg`}
                  width={155}
                  height={40}
                  alt="Content Ai"
                  title="Content Ai"
                  className="max-w-[110px] md:max-w-[155px] md:max-h-24 relative z-50 w-fit object-contain bg-blend-color-burn cursor-pointer hover:scale-95 duration-500 ease-in-out"
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Search Component */}
            <div className="base:block hidden">
              <SearchPropforSearch
                setState={setState}
                state={state}
                dataa={dataa}
                guest={guest}
                setGuest={setGuest}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setHeaderSearch={setHeaderSearch}
                size="small"
              />
            </div>

            {/* User Options */}
            <div className="flex justify-end items-center">
              <ul className="flex items-center justify-center xl:gap-x-5 xs:gap-x-4 gap-x-2">
                <li className="sm:hidden">
                  <Link
                    href="#"
                    rel="canonical"
                    className="text-2xl font-manrope justify-center items-center font-bold cursor-pointer text-black duration-300 ease-in-out"
                    onClick={toggleDrawer(true)}
                    prefetch={false}
                  >
                    <HiMenuAlt3 />
                  </Link>
                </li>
                <li className="hidden sm:block">
                  <Link
                    href="#"
                    rel="canonical"
                    className="px-3 py-3 text-sm font-bold text-black duration-300 ease-in-out cursor-pointer font-manrope hover:text-white bg-white rounded-4xl hover:bg-black inline-block"
                    prefetch={false}
                  >
                    List Your Hostel
                  </Link>
                </li>
                <li className="base:hidden">
                  <button
                    type="button"
                    className="flex items-center justify-start gap-x-2 text-xl font-bold text-black duration-300 ease-in-out cursor-pointer font-manrope hover:text-black"
                    onClick={handleOpenSearchMobile}
                  >
                    <IoSearch /> <span className="text-sm">Search</span>
                  </button>
                </li>
                <li>
                  <Link
                    href="#"
                    rel="canonical"
                    className="flex items-center justify-start gap-x-2 text-sm font-bold text-black duration-300 ease-in-out cursor-pointer font-manrope hover:text-white"
                    prefetch={false}
                  >
                    <User size={20} />
                    Login
                  </Link>
                </li>
                <li className="hidden sm:block">
                  <Link
                    href="#"
                    rel="canonical"
                    className="gap-x-2 flex items-center text-sm font-bold text-black duration-300 ease-in-out cursor-pointer font-manrope"
                    prefetch={false}
                  >
                    <Globe size={20} />
                    Country <ChevronDown size={18} />
                  </Link>
                </li>
                <li className="">
                  <Link
                    href="#"
                    rel="canonical"
                    className="flex items-center text-sm font-bold text-black duration-300 ease-in-out cursor-pointer font-manrope gap-x-2"
                    prefetch={false}
                  >
                    <Grip size={24} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="lg:pt-16 pt-8 lg:pb-28">
          <div className="container px-4 lg:px-14">
            {/* Search Results Header */}
            <div className="sm:flex items-center justify-between pb-4 mid:mb-4 border-b border-gray-200">
              <h1 className="mid:text-3xl md:text-2xl text-xl font-bold">
                {selectedstate}
              </h1>
              <div className="relative flex sm:mt-0 mt-4">
                <button
                  className="border border-[#EEEEEE] text-black px-4 py-2 rounded-3xl flex items-center"
                  onClick={() => setShowSortPopup(true)}
                >
                  <SwapVertOutlinedIcon className="mr-2" />
                  Sort by
                </button>
                <SortPopup
                  show={showSortPopup}
                  onClose={() => setShowSortPopup(false)}
                  setSort={setSort}
                  getData={() => getData(currentPage)}
                  close={setShowSortPopup}
                />
              </div>
            </div>

            {/* Search Results and Map */}
            <div className="mid:flex flex-col md:flex-row pt-5 pb-10 gap-x-7 listing">
              {/* Search Results */}
              <div className="mid:w-[60%] w-full">
                {/* Property Cards */}
                {property.length > 0 ? (
                  property.map((item, index) => (
                    <div key={index} className="my-4">
                      <div className="h-auto border border-[#EEEEEE] rounded-2xl flex flex-col md:flex-row">
                        {/* Property Image */}
                        <div className="flex h-auto relative w-full md:w-[40%]">
                          {item?.photos?.[0]?.url && (
                            <Swiper
                              pagination={{
                                dynamicBullets: true,
                                clickable: true,
                              }}
                              // navigation={true}
                              modules={[Pagination, Navigation, Autoplay]}
                              autoplay={{ delay: 3000 }}
                              slidesPerView={1}
                              loop
                              speed={1000}
                              spaceBetween={0}
                              className="mySwiper m-0 w-full"
                            >
                              <SwiperSlide className="w-full bg-transparent">
                                <Image
                                  src={`https://${item.photos[0].url}`}
                                  objectFit="cover"
                                  className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none object-cover h-full w-full Image max-h-64"
                                  alt="Property"
                                  width={320}
                                  height={300}
                                  loading="lazy"
                                />
                              </SwiperSlide>
                              <SwiperSlide className="w-full bg-transparent">
                                <Image
                                  src={`https://${item.photos[0].url}`}
                                  objectFit="cover"
                                  className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none object-cover h-full w-full Image max-h-64"
                                  alt="Property"
                                  width={320}
                                  height={300}
                                  loading="lazy"
                                />
                              </SwiperSlide>
                            </Swiper>
                          )}
                          {item?.freeCancellationAvailable && (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/freecancel.svg`}
                              alt="Free Cancellation"
                              width={150}
                              height={75}
                              className="absolute left-[-1rem] top-4 z-10 object-contain"
                              loading="lazy"
                            />
                          )}
                        </div>

                        {/* Property Details */}
                        <div className="w-full md:w-[60%] p-5 flex flex-col">
                          <h3
                            onClick={() => {
                              if (
                                item?._id !== getItemLocalStorage("hostelId")
                              ) {
                                localStorage.removeItem("selectedRoomsData");
                              }
                              router.push(`/hostels-detail/${item?._id}`);
                              setItemLocalStorage("hostelId", item?._id);
                            }}
                            className="cursor-pointer sm:text-xl text-lg font-bold mb-1 hover:text-primary-blue"
                          >
                            {item.name}
                          </h3>
                          <p className="text-[#888888] mb-3 text-base">
                            {`${item?.distanceFromCityCenter}`} KM away from
                            city center
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="rounded-md py-1 px-2 bg-black text-white text-xs">
                              {item?.type}
                            </span>

                            <span className="text-xs font-bold flex items-center">
                              <FaStar className="text-yellow-400 mr-1" />
                              {item?.overallRating?.overall || "N/A"}{" "}
                              <span className="text-[#888888] font-normal ml-1">
                                ({item?.overallRating?.numberOfRatings || 0}{" "}
                                Reviews)
                              </span>
                            </span>
                          </div>

                          <div className="flex gap-x-5 font-medium text-sm mb-6">
                            {freeFacilities(item).map((faci, id) => (
                              <span
                                className="flex gap-x-2 items-center"
                                key={id}
                              >
                                {Faciicons[faci?.name] ? (
                                  <span style={{ fontSize: 15 }}>
                                    {Faciicons[faci?.name]}
                                  </span>
                                ) : (
                                  <MdInsertEmoticon
                                    style={{ fontSize: 15 }}
                                    className="text-sm"
                                  />
                                )}
                                {faci?.name}
                              </span>
                            ))}
                          </div>

                          <button
                            className="bg-black hover:bg-primary-blue transition-all font-semibold text-white text-sm px-4 py-4 max-w-40 inline-block w-auto rounded-full"
                            onClick={() => {
                              if (
                                item?._id !== getItemLocalStorage("hostelId")
                              ) {
                                localStorage.removeItem("selectedRoomsData");
                              }
                              router.push(`/hostels-detail/${item?._id}`);
                              setItemLocalStorage("hostelId", item?._id);
                            }}
                          >
                            Choose your Bed
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No properties found.
                  </p>
                )}
                {totalPages > 1 && (
                  <div className="flex justify-center lg:py-10 text-center ">
                    <CustomPagination
                      currentPage={currentPage}
                      total={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>

              {/* Map */}
              {property?.length > 0 ? (
                <div className="mid:w-[40%] w-full">
                  <div
                    className={`search_map md:h-[600px] h-auto w-full my-5 ${scrolled ? "sticky top-0" : "relative"}`}
                  >
                    <MapComponent property={property} />
                  </div>
                </div>
              ) : (
                <div>Map Loading....</div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Link href="/" rel="canonical" className="p-4 block" >
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/mixdrom.svg`}
              width={110}
              height={28}
              alt="Content Ai"
              title="Content Ai"
              className="max-w-[110px] md:max-w-[155px] md:max-h-24 relative z-50 w-fit object-contain bg-blend-color-burn cursor-pointer hover:scale-95 duration-500 ease-in-out"
              loading="lazy"
            />
          </Link>
          <Divider />
          <div className="p-3">
            <label htmlFor="" className="flex items-center gap-4 mb-4">
              <Globe size={20} /> Select Currency
            </label>
            <button
              type="button"
              className="flex items-center gap-x-2 text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out"
              // onClick={handleOpenCountryModal}
            >
              <Image
                src="https://flagcdn.com/w320/in.png"
                alt="Country Flag"
                width={20}
                height={20}
                loading="lazy"
              />
              INR
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="p-3">
            <Link
              href="#"
              rel="canonical"
              className="block px-5 py-3 text-center font-manrope text-base font-bold bg-primary-blue cursor-pointer rounded-4xl text-black duration-300 ease-in-out"
              
            >
              List Your Hostel
            </Link>
          </div>
        </Box>
      </Drawer>

      {/* Mobile Search */}

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSearchMobile}
        onClose={handleCloseSearchMobile}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openSearchMobile}>
          <Box sx={styleMobileSerach}>
            <div className="flex items-center px-4 py-5 bg-gray-100 rounded-t-3xl">
              <h3>Search Property</h3>
              <button
                type="button"
                onClick={handleCloseSearchMobile}
                className="ml-auto"
              >
                <IoClose />
              </button>
            </div>
            <Divider className="mb-6" />
            <SearchPropforSearch
              setState={setState}
              state={state}
              dataa={dataa}
              guest={guest}
              setGuest={setGuest}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setHeaderSearch={setHeaderSearch}
              size="small"
            />
          </Box>
        </Fade>
      </Modal> */}
    </>
  );
};

export default SearchListing;
