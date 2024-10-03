import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Carousel({ image }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  console.log("imagess", image);
 

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1.7}
        centeredSlides={true}
        navigation={false}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
        ref={swiperRef}
        spaceBetween={20}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        initialSlide={1} // Start with the second image
      >
        {image.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative transition-all duration-300 ${
                index === activeIndex
                  ? "w-full md:h-[554px] h-[55vh]"
                  : "w-[100%] md:h-[500px] h-[50vh] mt-6"
              }`}
            >
              <Image
                src={`https://${img.url}`} // Added protocol to URL
                alt={`Image ${index + 1}`} // Updated alt text for better accessibility
                layout="fill"
                objectFit="cover"
                className="rounded-3xl" // Simplified class since both conditions are the same
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation icons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md cursor-pointer"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <CircleChevronLeft size="large" color="#fff" strokeWidth="1px" />
        </div>
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md cursor-pointer"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <CircleChevronRight size="large" color="#fff" strokeWidth="1px" />
        </div>
      </div>
    </div>
  );
}
