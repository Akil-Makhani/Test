import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import { BsFillFlagFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const RecentSearch = () => {
  const destination = [
    {
      id: 1,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
    {
      id: 2,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
    {
      id: 3,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
    {
      id: 4,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
    {
      id: 5,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
    {
      id: 6,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
    {
      id: 7,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
      location: "Venice",
      tour: "356 Tours",
    },
  ];
  return (
    <>
      <section className="w-full bg-white md:pb-20 pb-10 sm:pt-16 pt-8 lg:px-6">
        <div className="container">
          <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-6">
            Recent Searched{" "}
            <span className="text-primary-blue">Destinations</span>
          </h2>
          <div className="md:mb-16 mb-8">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 1500 }}
              slidesPerView={18}
              loop
              speed={1000}
              spaceBetween={14}
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                360: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1000: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 7,
                },
              }}
            >
              {destination.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex items-center border rounded-md p-3">
                    <Image
                      src={item.img}
                      alt="Explore More Spend Less"
                      title="Explore More Spend Less"
                      className="object-fill w-[50px] h-[50px] mx-auto duration-300 ease-in-out rounded-full"
                      width={50}
                      height={50}
                      loading='lazy'
                    />
                    <div className="flex-1 pl-2">
                      <h6 className="text-sm font-semibold text-black mb-1">
                        {item.location}
                      </h6>
                      <span className="flex items-center text-[#737373] text-xs font-manrope">
                        <BsFillFlagFill className="mr-1" />
                        {item.tour}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className="rounded-3xl lg:pt-16 pt-8 lg:px-14 px-6 bg-cover lg:grid grid-cols-2 gap-24 overflow-hidden"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/phone_bg.jpg)`,
            }}
          >
            <div>
              <h4 className="font-extrabold md:text-2xl text-lg lg:mb-8 mb-4">
                "Adventure Together: Find Travel Buddies, Share Rides, Split
                Bills & Explore with AI-Powered Magic!"
              </h4>
              <p className="text-[#737373] md:text-xl text-base">
                Download the MixDorm App to connect with fellow travelers, find
                cost-saving rides, easily split expenses, and unlock
                personalized adventures through our smart AI search. Your next
                journey starts with one tap!
              </p>
              <div className="flex items-center gap-4 lg:mt-12 mt-8">
                <Link href="" prefetch={false}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/appstore.png`}
                    width={202}
                    height={66}
                    alt=""
                    className="max-w-36 lg:max-w-none w-full"
                    loading='lazy'
                  />
                </Link>
                <Link href="" prefetch={false}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/playstore.png`}
                    width={202}
                    height={66}
                    alt=""
                    className="max-w-36 lg:max-w-none w-full"
                    loading='lazy'
                  />
                </Link>
              </div>
            </div>
            <div>
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/phoneCase.png`}
                width={498}
                height={457}
                alt=""
                className="lg:text-left text-center block mx-auto lg:mx-0 lg:max-w-none max-w-80 mt-6 lg:mt-0"
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentSearch;
