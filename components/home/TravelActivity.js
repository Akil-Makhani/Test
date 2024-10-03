import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";

const TravelActivity = () => {
  const data = [
    {
      id: 1,
      title: "Explore Ruins",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity1.png`,
    },
    {
      id: 2,
      title: "Beach Snorkel",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity2.png`,
    },
    {
      id: 3,
      title: "Mountain Trek",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity2.png`,
    },
    {
      id: 4,
      title: "Mountain Trek",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity4.png`,
    },
    {
      id: 5,
      title: "Food Tour",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity5.png`,
    },
    {
      id: 6,
      title: "River Cruise",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity6.png`,
    },
    {
      id: 7,
      title: "Spa Retreat",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity7.png`,
    },
    {
      id: 8,
      title: "Road Trip",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity8.png`,
    },
    {
      id: 9,
      title: "Road Trip",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/activity9.png`,
    },
  ];

  return (
    <>
      <section className="w-full bg-white md:pb-16 pb-10 lg:px-6">
        <div className="container">
          <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-1">
            Travel by <span className="text-primary-blue"> Activities</span>
          </h2>
          <p className="mt-2 text-base font-medium text-gray-500 font-manrope mb-6">
            Favorite destinations based on customer reviews
          </p>
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
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 4,
              },
              640: {
                slidesPerView: 6,
              },
              1100: {
                slidesPerView: 8,
              },
              1300: {
                slidesPerView: 9,
              },
            }}
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="font-manrope text-center tracking-normal">
                  <Image
                    src={item.image}
                    alt=""
                    className="w-24 h-24 rounded-full mb-4 mx-auto block"
                    width={96}
                    height={96}
                    loading='lazy'
                  />
                  <h6 className="text-sm font-bold mb-0">{item.title}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default TravelActivity;
