import React from "react";
import Image from "next/image";
import { IoFilterSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiReply } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";

import {
  Modal,
  Fade,
  Box,
  Backdrop,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Link from "next/link";

const notices = [
  {
    title: "Notice 1",
    text: "Mad monkey updated new roof top cafe with edm vibes 5 min ago",
  },
  {
    title: "Notice 2",
    text: "Mad monkey updated new roof top cafe with edm vibes 5 min ago",
  },
  {
    title: "Notice 3",
    text: "Mad monkey updated new roof top cafe with edm vibes 5 min ago",
  },
];

const NoticeBoardDetail = ({ open, close }) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} sx={style}>
          <div className="bg-white rounded-2xl max-w-[870px] mx-auto left-1/2 absolute w-[95%] top-1/2 -translate-y-1/2 -translate-x-1/2 sm:p-8 p-5">
            <div className="relative mb-8">
              <h2 className="sm:text-[27px] text-xl leading-none md:text-center text-left font-bold text-gray-800  pt-2">
                <span className="text-teal-500">Notice</span>board
              </h2>

              <FormControl
                sx={{ minWidth: 140 }}
                size="small"
                className="absolute top-0 right-0"
              >
                <InputLabel
                  id="demo-simple-select-label"
                  className="flex items-center gap-1 text-sm"
                >
                  <IoFilterSharp />
                  Hostel / City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Hostel / City"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fancy_y_scroll overflow-y-auto max-h-[460px] overflow-x-hidden">
              <Swiper
                // pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 3000 }}
                slidesPerView={1}
                loop
                speed={1000}
                spaceBetween={0}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                className=" mySwiper bg-[#D9F9F6] rounded-xl border-2 border-[#40E0D0] pt-5 pb-10"
              >
                {notices.map((notice) => (
                  <SwiperSlide
                    key={notice.title}
                    className="w-full bg-transparent"
                  >
                    <div className=" flex flex-col justify-center items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/apple.svg`}
                        alt="NoticeBoardIcon"
                        title="NoticeBoardIcon"
                        className="w-fit max-w-16 max-h-16 rounded-full"
                        width={54}
                        height={54}
                      />
                      <p className="text-xs pt-4 w-[300px] text-center text-black font-normal">
                        {notice.text}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}

                <button className="absolute left-4 top-1/2 -mt-4 text-[#D9F9F6] cursor-pointer z-40 bg-black w-6 h-6 rounded-full">
                  <ChevronLeft className="text-[#D9F9F6]" />
                </button>

                <button className="absolute right-4 top-1/2 -mt-4 text-[#D9F9F6] cursor-pointer z-40 bg-black w-6 h-6 rounded-full">
                  <ChevronRight className="text-[#D9F9F6]" />
                </button>
              </Swiper>

              <div className="flex gap-4 py-6 border-b -mx-8 px-8 overflow-y-auto">
                <button
                  type="button"
                  className="px-4 py-5 min-w-[120px] bg-[#FFE3EF] border-1.5 border-[#FF72AD] text-left rounded-[20px]"
                >
                  <span className="block mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/hostel_icon.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </span>
                  <p className="mb-0 text-[#FF72AD] font-semibold text-base">
                    Hostels <br />
                    600
                  </p>
                </button>
                <button
                  type="button"
                  className="px-4 py-5 min-w-[120px] bg-[#D9F9F6] border-1.5 border-[#40E0D0] text-left rounded-[20px]"
                >
                  <span className="block mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/notify_icon.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </span>
                  <p className="mb-0 text-[#40E0D0] font-semibold text-base">
                    All <br />
                    2400
                  </p>
                </button>

                <button
                  type="button"
                  className="px-4 py-5 min-w-[120px] bg-[#FFEFE3] border-1.5 border-[#FFAD72] text-left rounded-[20px]"
                >
                  <span className="block mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/city_icon.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </span>
                  <p className="mb-0 text-[#FFAD72] font-semibold text-base">
                    City <br />
                    700
                  </p>
                </button>

                <button
                  type="button"
                  className="px-4 py-5 min-w-[120px] bg-[#FBF5FE] border-1.5 border-[#D092F5] text-left rounded-[20px]"
                >
                  <span className="block mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/ride_icon.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </span>
                  <p className="mb-0 text-[#D092F5] font-semibold text-base">
                    Ride <br />
                    2400
                  </p>
                </button>

                <button
                  type="button"
                  className="px-4 py-5 min-w-[120px] bg-[#F1F7FF] border-1.5 border-[#72ADFF] text-left rounded-[20px]"
                >
                  <span className="block mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/event_icon.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </span>
                  <p className="mb-0 text-[#72ADFF] font-semibold text-base">
                    Events <br />
                    2400
                  </p>
                </button>
                <button
                  type="button"
                  className="px-4 py-5 min-w-[120px] bg-[#FFFBE6] border-1.5 border-[#FFD600] text-left rounded-[20px]"
                >
                  <span className="block mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/creator_icon.svg`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </span>
                  <p className="mb-0 text-[#FFD600] font-semibold text-base">
                    Creators <br />
                    700
                  </p>
                </button>
              </div>
              <div className="py-6 border-b -mx-8 px-8 flex items-start">
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeboard_profile.png`}
                    alt="User"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 pl-7">
                  <h6 className="text-sm font-semibold text-black mb-2">
                    Mad monkey - Left a comment
                    <span className="block text-[#7F7F7F] font-normal">
                      5 min ago
                    </span>
                  </h6>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-4xl bg-[#EEEEEE] py-3 pl-3 pr-10 text-black placeholder:text-[#7F7F7F] text-xs"
                      value="Hello, are you coming?"
                      placeholder="Write here..."
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1 p-2"
                    >
                      <HiReply />
                    </button>
                  </div>

                  <div className="relative pl-8 pt-2 after:absolute after:content-[''] after:left-2 after:top-1 after:w-[18px] after:h-[26px] after:border-l-2 after:border-b-2 after:border-[#8C8C8C] after:rounded-bl-2xl">
                    <input
                      type="text"
                      className="w-full rounded-4xl bg-[#EEEEEE] py-3 pl-3 pr-10 text-black placeholder:text-[#7F7F7F] text-xs"
                      placeholder="Reply"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-[10px] p-2"
                    >
                      <IoCameraOutline />
                    </button>
                  </div>
                </div>
              </div>

              <div className=" py-6 border-b -mx-8 px-8 flex items-start">
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeboard_profile.png`}
                    alt="User"
                    width={30}
                    height={30}
                    className="object-cover rounded-full w-[30px] h-[30px]"
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeBoard_user.png`}
                    alt="User"
                    width={26}
                    height={26}
                    className="object-cover rounded-full w-[26px] h-[26px] absolute bottom-[-10px] right-[-10px] border border-white"
                  />
                </div>
                <div className="flex-1 pl-7">
                  <h6 className="text-sm font-semibold text-black mb-2">
                    Mad monkey - Left a comment
                    <span className="block text-[#7F7F7F] font-normal">
                      5 min ago
                    </span>
                  </h6>
                  <div className="relative">
                    <div className="w-full rounded-4xl bg-[#EEEEEE] p-2 flex items-center">
                      <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/HostelImg.png`}
                          width={52}
                          height={52}
                        />
                      </div>
                      <p className="flex-1 m-0 text-xs text-black pl-3 font-medium">
                        <span className="font-semibold">Mad monkey</span> 4 bed
                        left Please choose <br />
                        <Link
                          href="#"
                          className="underline text-black hover:text-primary-blue"
                        >
                          Choose bed
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 border-b -mx-8 px-8 flex items-start">
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeboard_profile.png`}
                    alt="User"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 pl-7">
                  <h6 className="text-sm font-semibold text-black mb-2">
                    Mad monkey - Left a comment
                    <span className="block text-[#7F7F7F] font-normal">
                      5 min ago
                    </span>
                  </h6>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-4xl bg-[#EEEEEE] py-3 pl-3 pr-10 text-black placeholder:text-[#7F7F7F] text-xs"
                      value="Hello, are you coming?"
                      placeholder="Write here..."
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1 p-2"
                    >
                      <HiReply />
                    </button>
                  </div>

                  <div className="relative pl-8 pt-2 after:absolute after:content-[''] after:left-2 after:top-1 after:w-[18px] after:h-[26px] after:border-l-2 after:border-b-2 after:border-[#8C8C8C] after:rounded-bl-2xl">
                    <input
                      type="text"
                      className="w-full rounded-4xl bg-[#EEEEEE] py-3 pl-3 pr-10 text-black placeholder:text-[#7F7F7F] text-xs"
                      placeholder="Reply"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-[10px] p-2"
                    >
                      <IoCameraOutline />
                    </button>
                  </div>
                </div>
              </div>

              <div className=" py-6 border-b -mx-8 px-8 flex items-start">
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeboard_profile.png`}
                    alt="User"
                    width={30}
                    height={30}
                    className="object-cover rounded-full w-[30px] h-[30px]"
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/noticeBoard_user.png`}
                    alt="User"
                    width={26}
                    height={26}
                    className="object-cover rounded-full w-[26px] h-[26px] absolute bottom-[-10px] right-[-10px] border border-white"
                  />
                </div>
                <div className="flex-1 pl-7">
                  <h6 className="text-sm font-semibold text-black mb-2">
                    Mad monkey - Left a comment
                    <span className="block text-[#7F7F7F] font-normal">
                      5 min ago
                    </span>
                  </h6>
                  <div className="relative">
                    <div className="w-full rounded-4xl bg-[#EEEEEE] p-2 flex items-center">
                      <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/HostelImg.png`}
                          width={52}
                          height={52}
                        />
                      </div>
                      <p className="flex-1 m-0 text-xs text-black pl-3 font-medium">
                        <span className="font-semibold">Mad monkey</span> 4 bed
                        left Please choose <br />
                        <Link
                          href="#"
                          className="underline text-black hover:text-primary-blue"
                        >
                          Choose bed
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default NoticeBoardDetail;
