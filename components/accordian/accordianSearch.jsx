import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import {
  GoogleMap,
  InfoWindow,
} from "@react-google-maps/api";
import { IoMdTime } from "react-icons/io";

import { getReviewApi } from "@/services/webflowServices";
import ReactStars from "react-rating-stars-component";
import { getItemLocalStorage } from "@/utils/browserSetting";
import dynamic from "next/dynamic";


const WriteReview = dynamic(() => import("../review/writeReview"), {
  ssr: false,
});

const CustomPagination = dynamic(() => import("../customPagination/customPagination"), {
  ssr: false,
});

const AccordionHeader = ({ title, isOpen, toggleSection }) => (
  <div
    className={`w-full flex justify-between text-white items-center p-4 cursor-pointer bg-teal-400 ${
      isOpen ? "rounded-t-xl" : "rounded-xl"
    }`}
    onClick={toggleSection}
  >
    <h3 className="text-lg font-bold">{title}</h3>
    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
  </div>
);

export default function AccordianSearch({ combinedData, hostelIdd }) {
  const [selectedMarker, setSelectedMarker] = useState(false);
  const [marker, setMarker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewPerPage] = useState(10); // Set the number of reviews per page
  const [totalReviews, setTotalReviews] = useState(0);
  const [hostelId, setHostelId] = useState();
  const [rating, setRating] = useState();
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const mapContainerStyle = {
    width: "400px",
    height: "400px",
    border: "0px",
  };

  const loadGoogleMapsApi = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBv_hPcDOPcrTfHnLrFNduHgJWDwv1pjfU&libraries=places`;
    script.async = true;
    script.onload = () => setIsApiLoaded(true);
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (window.google) {
      setIsApiLoaded(true);
    } else {
      loadGoogleMapsApi();
    }
  }, []);

  const [isOpen, setIsOpen] = useState({
    houseRules: false,
    amenities: false,
    contactUs: false,
    reviews: false,
    cancellationPolicy: false,
    generalPolicy: false,
  });

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const hostel = {
    rating: 5.0,
    totalReviews: 24567,
  };

  // const reviews = [
  //   {
  //     author: "Kara Luther (U.K)",
  //     rating: 5,
  //     content:
  //       "After several uses the hair is much thinner and isn&apos;t growing as fast.",
  //     images: [assets.Locker, assets.Wifi],
  //     helpful: 12,
  //     notHelpful: 12,
  //   },
  //   {
  //     author: "Jane Smith",
  //     rating: 4,
  //     content:
  //       "The location is perfect and the facilities are great. Will definitely come back!",
  //     images: [],
  //     helpful: 10,
  //     notHelpful: 3,
  //   },
  // ];
  console.log("propdata", combinedData);
  const amenities = [
    {
      title: "Lockers",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/lockers.svg`,
    },
    {
      title: "Hot water",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/lockers.svg`,
    },
    {
      title: "Laundry Services (Extra)",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/lockers.svg`,
    },
    {
      title: "Free Wi-Fi",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/wifi.svg`,
    },
    {
      title: "Card Payment Accepted",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/wifi.svg`,
    },
    {
      title: "Common Television",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/wifi.svg`,
    },
    {
      title: "Water Dispenser",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/waterdispenser.svg`,
    },
    {
      title: "Air-conditioning",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/waterdispenser.svg`,
    },
    {
      title: "24/7 Reception",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/waterdispenser.svg`,
    },
    {
      title: "Common hangout area",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/hangout.svg`,
    },
    {
      title: "Cafe",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/hangout.svg`,
    },
    {
      title: "In-house Activities",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/hangout.svg`,
    },
    {
      title: "Bedside Lamps",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/lamps.svg`,
    },
    {
      title: "Breakfast (Extra)",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/lamps.svg`,
    },
    {
      title: "Storage Facility",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/lamps.svg`,
    },
    {
      title: "Towels on rent",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/towel.svg`,
    },
    {
      title: "Linen Included",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/towel.svg`,
    },
    {
      title: "UPI Payment Accepted",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/towel.svg`,
    },
    {
      title: "Shower",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/shower.svg`,
    },
    {
      title: "Parking (public)",
      icon: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/shower.svg`,
    },
  ];

  const facilityIcons = {
    BREAKFASTINCLUDED: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/breakfast.svg`,
    LINENINCLUDED: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/wifi.svg`,
    FREEPARKING: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/parking.svg`,
    TOWELSINCLUDED: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/towel.svg`,
    FREEWIFI: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/wifi.svg`,
    FREEINTERNETACCESS: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/internet.svg`,
    FREECITYMAPS: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/citymap.svg`,
  };

  const ratings = [
    { rating: 5, count: 20525 },
    { rating: 4, count: 2205 },
    { rating: 3, count: 25 },
    { rating: 2, count: 25 },
    { rating: 1, count: 12 },
  ];
  const location = combinedData.property.location.coordinates;
  const name = combinedData.property.name;
  const photo = combinedData.property.photos[0] || [];
  console.log("photo", photo);

  useEffect(() => {
    const hostelIdLocal = getItemLocalStorage("hostelId");
    if (hostelIdLocal) {
      setHostelId(hostelIdLocal);
    }
  }, []);

  useEffect(() => {
    if (isOpen?.reviews) {
      console.log("Fetching reviews");
      fetchReviews();
    }
  }, [isOpen?.reviews]);

  const fetchReviews = async () => {
    try {
      const response = await getReviewApi(
        hostelIdd,
        currentPage,
        reviewPerPage
      );
      console?.log("response", response);
      if (response.status) {
        setReviews(response?.data?.data?.reviews);
        setTotalReviews(response?.data?.data?.pagination?.totalReviews);
        setRating(response?.data?.data?.ratings);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  if (!location || location.length < 2) {
    return <p>Loading map...</p>; // Or return null, a spinner, or any other fallback UI
  }

  // Write review Modal
  const [openReview, setOpenReview] = useState(false);
  const handleOpen = () => setOpenReview(true);
  const handleClose = () => setOpenReview(false);

  return (
    <>
      <div className="md:mt-8 md:space-y-6 space-y-3 py-4 md:mb-40">
        {/* House Rules Section */}
        <div>
          <AccordionHeader
            title="House Rules"
            isOpen={isOpen.houseRules}
            toggleSection={() => toggleSection("houseRules")}
          />
          {isOpen.houseRules && (
            <div className="w-full rounded-b-xl p-4 bg-[#f9f9f9]">
              <div className="xs:flex py-2 border-b border-b-gray-300">
                <div className="flex items-center gap-7">
                  <div className="px-2">
                    <p className="text-sm mb-1 font-medium text-black/50">
                      Check In
                    </p>
                    <div className="flex">
                      <IoMdTime className="mr-2 text-sky-blue-750" />
                      <p className="text-sm mb-0 font-medium text-black">
                        06:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="px-2">
                    <p className="text-sm mb-1 font-medium text-black/50">
                      Check Out
                    </p>
                    <div className="flex items-center">
                      <IoMdTime className="mr-2 text-sky-blue-750" />
                      <p className="text-sm mb-0 font-medium text-black">
                        12:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 xs:text-right xs:ml-0 ml-4 xs:mt-0 mt-3">
                  <p className="font-semibold text-base text-black">
                    Taxes Not Included
                  </p>
                </div>
              </div>
              <div className="py-4 border-b border-b-gray-300">
                <button
                  className="w-full text-sm text-left font-medium text-black flex justify-between items-center"
                  onClick={() => toggleSection("cancellationPolicy")}
                >
                  Cancellation Policy
                  {isOpen.cancellationPolicy ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
              </div>
              <div className="py-4">
                <button
                  className="w-full text-sm text-left  font-medium text-black flex justify-between items-center"
                  onClick={() => toggleSection("generalPolicy")}
                >
                  General Policy
                  {isOpen.generalPolicy ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Amenities Section */}
        <div>
          <AccordionHeader
            title="Amenities"
            isOpen={isOpen.amenities}
            toggleSection={() => toggleSection("amenities")}
          />
          {isOpen.amenities && (
            <div className="w-full rounded-b-xl p-4 bg-[#f9f9f9]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {combinedData?.property?.freeFacilities?.map(
                  (facility, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      {facilityIcons[facility.id] && (
                        <div className="flex items-center justify-center w-8 h-8">
                          <Image
                            src={facilityIcons[facility.id]}
                            alt={`${facility.name} Icon`}
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px]"
                            aria-label={facility.name}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <h6 className="text-sm mb-0 py-1 flex-1 text-black">
                        {facility.name}
                      </h6>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <AccordionHeader
            title="Reviews"
            isOpen={isOpen.reviews}
            toggleSection={() => toggleSection("reviews")}
          />
          {isOpen.reviews && (
            <div className="w-full  rounded-b-xl p-6 bg-[#f9f9f9]">
              <div className="flex flex-col md:flex-row  md:items-center pb-4 border-b border-b-gray-300">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-medium text-black">
                    {hostel.rating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-1 text-yellow-500">
                    {[...Array(Math.floor(hostel.rating))].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.54L.487 7.906l6.568-.955L10 .905l2.945 6.046 6.568.955-4.758 3.644 1.123 6.54z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 py-2">
                    {totalReviews} Customers Reviews
                  </div>
                  <button
                    onClick={handleOpen}
                    className="mt-4 bg-black text-white px-4 py-2 rounded-3xl"
                  >
                    Write Review
                  </button>
                </div>

                <div className="mt-4 md:mt-0 ml-[10%]">
                  {ratings.map(({ rating, count }) => (
                    <div key={rating} className="flex items-center space-y-2">
                      <span className="font-normal text-sm">{rating}</span>
                      <div className="relative mx-2">
                        <div className="flex-1 h-2 bg-gray-300 rounded-full">
                          <div className="absolute top-0 left-0 w-40 h-1.5 bg-gray-300 rounded-lg"></div>
                          <div
                            className="h-2 bg-gray rounded-full text-black/80"
                            style={{
                              width: `${(count / hostel.totalReviews) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="font-normal ml-[10REM] text-black/80 text-sm">
                        {" "}
                        ({count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {reviews?.map((review, index) => (
                  <div key={index} className="py-4 rounded-3xl">
                    <div className="flex flex-col mb-2">
                      <span className="text-black font-semibold">
                        {review?.user?.name?.first} {review?.user?.name?.last}
                      </span>
                      <Image
                        src={review?.images[0]?.url}
                        alt="Review Image"
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                      <div className="flex items-center py-2 space-x-1 text-yellow-500">
                        <ReactStars
                          count={5}
                          size={40}
                          activeColor="#ffd700"
                          value={review?.rating}
                          edit={false}
                          isHalf={true}
                        />
                      </div>
                    </div>

                    <p className="text-black text-base mb-2">
                      {review?.comment}
                    </p>
                    <div className="flex items-center text-black  text-base">
                      <span className="mr-2">Is this helpful?</span>
                      <div className="flex items-center space-x-1">
                        <button className="flex items-center space-x-1">
                          <span>{review.helpful}</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <span>{review.notHelpful}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <Pagination
                current={currentPage}
                total={totalReviews}
                pageSize={reviewPerPage}
                onChange={onPageChange}
              /> */}
              {totalPages > 1 && (
                <div className="flex justify-center lg:py-10 text-center">
                  <CustomPagination
                    currentPage={currentPage}
                    total={totalPages}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
              {/* <div className="flex justify-end">
                <button className="mt-4 bg-black text-white px-4 py-2 rounded-3xl">
                  View Reviews
                </button>
              </div>{" "} */}
            </div>
          )}
        </div>

        {/* Contact Us Section */}
        <div>
          <AccordionHeader
            title="Contact Us"
            isOpen={isOpen.contactUs}
            toggleSection={() => toggleSection("contactUs")}
          />
          {isOpen.contactUs && (
            <div className="flex flex-wrap w-full rounded-b-xl p-6 bg-[#f9f9f9]">
              {/* Address Section */}
              <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                <div className="mb-4">
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold">Address</h3>
                  </div>
                  <p className="text-sm text-gray-500 py-2 leading-6">
                    {combinedData?.property?.address?.lineOne}
                    {"  "}
                    {combinedData?.property?.address?.lineTwo}{" "}
                    {combinedData?.property?.address?.state}
                    {"  "}
                    {combinedData?.property?.address?.country}
                  </p>
                  {/* <button className="text-primary-blue py-2 underline">
                  Tap to open map
                </button> */}
                </div>

                {/* WhatsApp Section */}
                {/* <div className="">
                <div className="flex items-center">
                  <Image
                    src={assets.WhatsAppIcon}
                    className="w-[19px] h-[19px] mr-2"
                    alt="WhatsApp Icon"
                  />
                  <h3 className="text-base font-semibold">What&apos;s App</h3>
                </div>
                <p className="text-sm text-gray-500 py-2">
                  Unable to Whatsapp? Call directly
                </p>

                <button className=" text-primary-blue py-2 underline">
                  +914440115819
                </button>
              </div> */}
              </div>

              {/* Map Section */}
              <div className="px-4">
                {isApiLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: location[1], lng: location[0] }}
                    zoom={14}
                  >
                    <Marker
                      position={{ lat: location[1], lng: location[0] }}
                      onClick={() =>
                        setSelectedMarker({
                          lat: location[1],
                          lng: location[0],
                        })
                      }
                    />
                    {selectedMarker && (
                      <InfoWindow
                        position={selectedMarker}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div>
                          <h2>{combinedData.property.name}</h2>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                ) : (
                  <p>Loading Google Maps API...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <WriteReview open={openReview} close={handleClose} />
    </>
  );
}
