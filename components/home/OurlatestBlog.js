import { CalendarDays, Clock, Heart, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurlatestBlog = () => {
  const data = [
    {
      id: 1,
      title: "Cultural",
      description:
        "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/cultural.jpg`,
      date: "Jan 1, 2022",
      time: "6 ",
      comment: "38",
      user: "Jimmy Dave",
      bg: "bg-pink-750",
    },
    {
      id: 2,
      title: "Travel",
      description: "Top 10 Travel Hacks for Budget-Conscious Adventurers",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/travel.jpg`,
      date: "Jan 1, 2022",
      time: "6 ",
      comment: "38",
      user: "Jimmy Dave",
      bg: "bg-orange-750",
    },
    {
      id: 3,
      title: "Discovery",
      description:
        "Discovering Hidden Gems: 10 Off-the-Beaten-Path Travel Tips",
      image: `${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/discover.jpg`,
      date: "Jan 1, 2022",
      time: "6 ",
      comment: "38",
      user: "Jimmy Dave",
      bg: "bg-sky-blue-750",
    },
  ];
  return (
    <section className="w-full bg-white md:pb-16 pb-10 lg:px-6">
      <div className="container">
        <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-1">
          Latest <span className="text-primary-blue"> Blog </span>
        </h2>
        <p className="mt-2 text-base font-medium text-gray-500 font-manrope mb-6">
          Favorite destinations based on customer reviews
        </p>
        <div className="grid lg:grid-cols-3 xs:grid-cols-2 gap-x-6 w-full md:mt-10 mt-6 gap-y-4">
          {data.map((item) => (
            <div
              className={`rounded-3xl w-full border border-slate-105 h-full overflow-hidden font-manrope `}
              key={item.id}
            >
              <div className="relative w-full rounded-t-3xl">
                <Link href="#">
                  <Image
                    src={item.image}
                    alt={item.title}
                    title={item.title}
                    className="w-full h-full"
                    width={418}
                    height={279}
                    loading='lazy'
                  />
                </Link>
                <div className="absolute flex items-center justify-center px-3 py-1 text-sm font-medium text-black bg-white rounded-4xl top-5 left-5 font-manrope ">
                  {item.title}
                </div>
                <div className="absolute flex items-center justify-center p-1 text-black bg-white rounded-full w-7 h-7 top-5 right-5 font-manrope ">
                  <Heart size={18} />
                </div>
              </div>
              <div className={`${item.bg} md:p-8 p-4 rounded-b-3xl `}>
                <div className="flex items-center flex-wrap gap-3 justify-between text-white">
                  <div className="flex items-center justify-start text-sm w-fit gap-x-1">
                    {" "}
                    <div className="text-white w-fit">
                      <CalendarDays size={16} />
                    </div>
                    <div className="w-fit">{item.date}</div>
                  </div>
                  <div className="flex items-center justify-start text-sm w-fit gap-x-1">
                    {" "}
                    <div className="text-white w-fit">
                      <Clock size={16} />
                    </div>
                    <div className="w-fit">{item.time} min</div>
                  </div>
                  <div className="flex items-center justify-start text-sm w-fit gap-x-1">
                    {" "}
                    <div className="text-white w-fit">
                      <MessageCircleMore size={16} />
                    </div>
                    <div className="w-fit">{item.comment} comments</div>
                  </div>
                </div>
                <Link
                  href=""
                  className="my-3 md:text-xl text-base font-bold text-white line-clamp-2 "
                >
                  {item.description}
                </Link>
                <div className="flex items-center justify-between mt-6 text-white">
                  <div className="flex items-center justify-start text-sm w-fit gap-x-1">
                    {" "}
                    <div className="w-8 h-8 text-white rounded-full ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/avatar.png`}
                        width={32}
                        height={32}
                        alt="user"
                        title="user"
                        className="w-8 h-8 rounded-full"
                        loading='lazy'
                      />
                    </div>
                    <div className="w-fit">{item.user}</div>
                  </div>
                  <button
                    type="button"
                    className="md:inline-block  text-sm font-bold text-white bg-black font-manrope h-10 px-5 py-1.5 flex justify-center items-center rounded-9xl"
                  >
                    Keep Reading
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurlatestBlog;
