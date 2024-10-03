import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const Hostel = () => {
  const [selectedImage, setSelectedImage] = useState(1);
  const slides = [
    {
      id: 1,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_1.jpg`,
      showName: "Concert A",
      date: "2024-08-01",
      price: "$50",
      peopleGoing: 120,
    },
    {
      id: 2,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_2.jpg`,
      showName: "Festival B",
      date: "2024-08-15",
      price: "$30",
      peopleGoing: 200,
    },
    {
      id: 3,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_3.jpg`,
      showName: "Theater C",
      date: "2024-09-01",
      price: "$40",
      peopleGoing: 150,
    },
    {
      id: 4,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_1.jpg`,
      showName: "Concert D",
      date: "2024-09-10",
      price: "$60",
      peopleGoing: 100,
    },
    {
      id: 5,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_2.jpg`,
      showName: "Festival E",
      date: "2024-09-20",
      price: "$70",
      peopleGoing: 250,
    },
    {
      id: 6,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_3.jpg`,
      showName: "Theater F",
      date: "2024-10-01",
      price: "$55",
      peopleGoing: 170,
    },
    {
      id: 7,
      img: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_1.jpg`,
      showName: "Concert G",
      date: "2024-10-15",
      price: "$45",
      peopleGoing: 130,
    },
  ];

  return (
    <section className="w-full bg-white md:pb-16 pb-10 lg:px-6 relative">
      <div className="container">
        <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-1">
          Hostel <span className="text-[#40E0D0]">Event</span>
        </h2>
        <p className="mt-2 text-base font-medium text-gray-500 font-manrope mb-6">
          Unleash the Fun !  Dive into Hostel-Hosted Happenings & Creator-Led
          Adventures!
        </p>

        <Swiper
          pagination={false}
          slidesPerView={3}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          centeredSlides
          onSlideChange={(swiper) => setSelectedImage(swiper.realIndex)}
          loop
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              spaceBetween: 10,
            },
            575: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              className=""
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative w-full flex ease-in-out">
                <div className="text-black font-thin text-center absolute right-[14px] top-[14px]  p-2 bg-[#40E0D0] rounded-[15px] uppercase text-[13px] w-[60px] h-[60px]">
                  DEC{" "}
                  <span className="block text-[26px] font-bold leading-5">
                    22
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-5 pb-8">
                  <div classname="w-full flex flex-col  justify-between items-center">
                    <div className="w-full flex items-center">
                      <div class="flex -space-x-3 rtl:space-x-reverse">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/avatar.png`}
                          alt="Ticket Icon"
                          className="border-2 border-white rounded-full "
                          width={42}
                          height={42}
                          loading='lazy'
                        />
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/avatar2.png`}
                          alt="Ticket Icon"
                          className="border-2 border-white rounded-full "
                          width={42}
                          height={42}
                          loading='lazy'
                        />
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/avatar3.png`}
                          alt="Ticket Icon"
                          className="border-2 border-white rounded-full "
                          width={42}
                          height={42}
                          loading='lazy'
                        />
                      </div>
                      <h5 className="text-white text-sm ml-3">
                        {slide.peopleGoing}
                        <span className="text-bold text-sm"> People Going</span>
                      </h5>
                    </div>
                    <div className="w-full flex mt-3 justify-between  items-start xl:items-end ">
                      <h2 className="text-slate-400 text-xs font-light">
                        SHOW
                        <br />
                        <span className="font-normal text-white text-lg xl:text-4xl">
                          {slide.showName}
                        </span>
                      </h2>
                      <h2 className="text-slate-200 text-sm lg:text-[2rem] font-normal text-end ">
                        {slide.price}
                      </h2>
                    </div>
                  </div>
                </div>
                <Image
                  src={slide.img}
                  alt={`Slide ${slide.id}`}
                  className="min-w-[300px] h-fit  object-cover rounded-3xl border-2 border-white"
                  width={402}
                  height={231}
                  loading='lazy'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hostel;
