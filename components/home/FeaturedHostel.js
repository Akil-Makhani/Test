import { CalendarDays, Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoStar } from "react-icons/io5";
import {  Autoplay } from "swiper/modules";

const FeaturedHostel = () => {
  const data = [
    {
      id: 1,
      tag: "Top Rated",
      title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/cultural.jpg`,
      guest: "4-6 guest",
      time: "2 days 3 nights",
      price: "$48.25",
      rating: "4.9",
      review: "672",
    },
    {
      id: 2,
      tag: "Top Rated",
      title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/cultural.jpg`,
      guest: "4-6 guest",
      time: "2 days 3 nights",
      price: "$48.25",
      rating: "4.9",
      review: "672",
    },
    {
      id: 3,
      tag: "Top Rated",
      title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/cultural.jpg`,
      guest: "4-6 guest",
      time: "2 days 3 nights",
      price: "$48.25",
      rating: "4.9",
      review: "672",
    },
    {
      id: 4,
      tag: "Top Rated",
      title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/cultural.jpg`,
      guest: "4-6 guest",
      time: "2 days 3 nights",
      price: "$48.25",
      rating: "4.9",
      review: "672",
    },
  ];
  return (
    <>
      <section className="w-full bg-white md:pb-16 pb-10 lg:px-6">
        <div className="container">
          <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-1">
            Our Featured<span className="text-primary-blue"> Hostels</span>
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
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1100: {
                slidesPerView: 4,
              },
            }}
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="rounded-3xl w-full border border-slate-105 font-manrope overflow-hidden">
                  <div className="relative w-full rounded-t-3xl tracking-normal">
                    <Link href="#" prefetch={false}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        className="w-full h-full "
                        width={1920}
                        height={700}
                        loading='lazy'
                      />
                    </Link>
                    <div className="absolute flex items-center justify-center px-3 py-1 text-xs font-medium text-primary-blue bg-white rounded-4xl top-5 left-5 font-manrope ">
                      {item.tag}
                    </div>
                    <div className="absolute flex items-center justify-center p-1 text-black bg-white rounded-full w-7 h-7 top-5 right-5 font-manrope ">
                      <Heart size={18} />
                    </div>
                    <div className="flex items-center text-sm gap-1 font-manrope absolute left-7 bottom-[-10px] bg-white rounded-4xl shadow-lg py-1 px-2">
                      <IoStar className="text-yellow-550" />
                      <span className="text-black font-semibold">
                        {item.rating}
                      </span>
                      <span className="text-xs text-[#737373]">
                        ({item.review} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="xl:p-8 px-4 pb-4 pt-6 rounded-b-3xl tracking-normal">
                    <h2 className="xl:text-lg text-base font-bold font-manrope mb-4">
                      <Link href="#" className="block hover:text-primary-blue" prefetch={false}>
                        {item.title}
                      </Link>
                    </h2>
                    <div className="flex items-center flex-wrap gap-3 font-manrope text-[#737373]">
                      <div className="flex items-center text-sm gap-1">
                        <CalendarDays size={16} />
                        <span>{item.guest}</span>
                      </div>
                      <div className="flex items-center text-sm gap-1">
                        <Clock size={16} />
                        <span>{item.time} min</span>
                      </div>
                    </div>
                    <Link
                      href=""
                      className="my-3 md:text-xl text-base font-bold  line-clamp-2 "
                      prefetch={false}
                    >
                      {item.description}
                    </Link>
                    <div className="xl:flex items-center justify-between xl:mt-6 mt-4">
                      <div className="flex items-center font-bold text-black text-lg gap-1">
                        {item.price}
                        <span className="text-sm text-[#737373] font-normal">
                          / person
                        </span>
                      </div>
                      <button
                        type="button"
                        className="md:inline-block text-sm font-bold text-white bg-black font-manrope h-10 px-5 py-1.5 flex justify-center items-center rounded-9xl hover:bg-primary-blue"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default FeaturedHostel;
