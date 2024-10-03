import React from "react";
import Image from "next/image";
import Link from "next/link";

const Buddies = () => {
  return (
    <>
      <section className="w-full bg-white md:pb-16 pb-10 lg:px-6">
        <div className="container">
          <h2 className="font-extrabold text-black font-manrope md:text-3xl text-2xl mb-6">
            Meet Buddies, Split Bills, Share Rides, and{" "}
            <br className="hidden sm:block" />
            Explore with AI-powered
            <span className="text-primary-blue"> Ease</span>!"
          </h2>

          <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 justify-center lg:gap-14 gap-8">
            <div className="relative mb-4 lg:mb-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/buddies1.png`}
                width={400}
                height={637}
                alt=""
                className="w-full"
                loading='lazy'
              />
              <Link
                href=""
                className="max-w-64 w-full absolute left-1/2 -translate-x-1/2 bg-[#FFC22A] text-black rounded-3xl p-4 font-medium text-sm text-center bottom-[50px]"
                prefetch={false}
              >
                Get started
              </Link>
            </div>
            <div className="relative mb-4 lg:mb-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/buddies2.png`}
                alt=""
                className="w-full"
                width={400}
                height={637}
                loading='lazy'
              />
              <Link
                href=""
                className="max-w-64 w-full absolute left-1/2 -translate-x-1/2 bg-[#EA4080] text-black rounded-3xl p-4 font-medium text-sm text-center bottom-[50px]"
                prefetch={false}
              >
                Get started
              </Link>
            </div>
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/buddies3.png`}
                alt=""
                className="w-full"
                width={400}
                height={637}
                loading='lazy'
              />
              <Link
                href=""
                className="max-w-64 w-full absolute left-1/2 -translate-x-1/2 bg-[#4C3CB9] text-white rounded-3xl p-4 font-medium text-sm text-center bottom-[50px]"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Buddies;
