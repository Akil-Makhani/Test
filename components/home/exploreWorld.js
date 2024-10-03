import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import Image from "next/image";

const ExploreWorld = () => {
  const image = [
    {
      id: 1,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
    },
    {
      id: 2,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag2.png`,
    },
    {
      id: 3,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag3.png`,
    },
    {
      id: 4,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag4.png`,
    },
    {
      id: 5,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag5.png`,
    },
    {
      id: 6,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag6.png`,
    },
    {
      id: 7,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag7.png`,
    },
    {
      id: 8,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag8.png`,
    },
    {
      id: 9,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag9.png`,
    },
    {
      id: 10,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag10.png`,
    },
    {
      id: 11,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag11.png`,
    },
    {
      id: 12,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag12.png`,
    },
    {
      id: 13,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag13.png`,
    },
    {
      id: 14,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag14.png`,
    },
    {
      id: 15,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag15.png`,
    },
    {
      id: 16,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag16.png`,
    },
    {
      id: 17,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag17.png`,
    },
    {
      id: 18,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag1.png`,
    },
    {
      id: 19,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/flag2.png`,
    },
  ];
  return (
    <section className="w-full bg-white md:pb-16 pb-10 lg:px-6">
      <div className="w-full container">
        <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-6">
          Explore the <span className="text-primary-blue">world</span>
          <p className="mt-1 text-base text-[#737373]">
            {" "}
            With over 16,500 hostels in 180 countries
          </p>
        </h2>

        <div className="w-full py-4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 1500 }}
            slidesPerView={18}
            loop
            speed={1000}
            spaceBetween={6}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 5,
              },
              480: {
                slidesPerView: 6,
              },
              640: {
                slidesPerView: 8,
              },
              768: {
                slidesPerView: 10,
              },
              1100: {
                slidesPerView: 18,
              },
            }}
          >
            {image.map((item) => (
              <SwiperSlide key={item.id}>
                <Image
                  src={item.img}
                  alt="Explore More Spend Less"
                  width={50}
                  height={50}
                  title="Explore More Spend Less"
                  className="object-fill w-[50px] h-[50px] mx-auto duration-300 ease-in-out rounded-full hover:scale-105"
                  loading='lazy'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="grid w-full sm:grid-cols-4 grid-cols-2 lg:grid-cols-6 h-[362px] grid-rows-2 gap-3 mx-auto mt-5">
          <div className="relative col-span-1 row-span-1 lg:row-span-2 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/india.jpg`}
              width={208}
              height={362}
              alt="India"
              title="India"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5">
              <h3 className="text-xl font-bold">India</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px] hidden lg:block">
            {" "}
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/indosiea.jpg`}
              width={208}
              height={175}
              alt="Indonesia"
              title="Indonesia"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5 ">
              <h3 className="text-xl font-bold">Indonesia</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
          <div className="relative sm:col-span-2 sm:row-span-2 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px]">
            {" "}
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/thailand.jpg`}
              width={428}
              height={362}
              alt="Thailand"
              title="Thailand"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5 ">
              <h3 className="text-xl font-bold">Thailand</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px] hidden sm:block">
            {" "}
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/vietnam.jpg`}
              width={208}
              height={175}
              alt="Vietnam"
              title="Vietnam"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5 ">
              <h3 className="text-xl font-bold">Vietnam</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
          <div className="relative col-span-1 row-span-2 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/usa.jpg`}
              width={208}
              height={362}
              alt="USA"
              title="USA"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5 ">
              <h3 className="text-xl font-bold">USA</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px] hidden lg:block">
            {" "}
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/turkey.jpg`}
              width={208}
              height={175}
              alt="Turkey"
              title="Turkey"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5 ">
              <h3 className="text-xl font-bold">Turkey</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
          <div className="relative col-span-1 row-span-1 overflow-hidden duration-300 ease-in-out bg-black/90 group rounded-[30px]">
            {" "}
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/uae.jpg`}
              width={208}
              height={175}
              alt="UAE"
              title="UAE"
              className="object-cover w-full h-full duration-300 ease-in-out opacity-90 group-hover:scale-105"
              loading='lazy'
            />
            <div className="absolute z-20 text-white top-5 font-manrope left-5 ">
              <h3 className="text-xl font-bold">UAE</h3>
              <p className="mt-1 text-sm font-normal ">252 Hostels</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreWorld;
