import {
  Earth,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbLocationShare } from "react-icons/tb";
import ContactPopup from "../popup/contactPopup";
import SignInPopup from "../popup/signinPopup";

const Footer = () => {
  //  Contact Modal
  const [openContact, setOpenContact] = useState(false);
  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);

  const handleLoginClick = (e) => { 
    e.preventDefault();
    setIsSignInPopupOpen(true);
  };

  const handleLoginClosePopup = () => {
    setIsSignInPopupOpen(false);
  };

  const contact = [
    {
      id: 1,
      name: "Mumbai, India, 400001",
      icon: <MapPin size={16} className="mr-2 text-primary-blue" />,
      url: "#",
    },
    // {
    //   id: 2,
    //   name: "+0123-456789",
    //   icon: <Phone size={16} className="mr-2 text-primary-blue" />,
    //   url: "#",
    // },
    {
      id: 2,
      name: "support@mixdorm.com",
      icon: <Mail size={16} className="mr-2 text-primary-blue" />,
      url: "#",
    },
  ];
  const socialMedia = [
    {
      id: 1,
      icon: <Facebook size={16} fill="#fff" />,
      url: "https://www.facebook.com/profile.php?id=61559838912283&mibextid=LQQJ4d",
    },
    {
      id: 2,
      icon: <Twitter size={16} fill="#fff" />,
      url: "#",
    },
    {
      id: 3,
      icon: <Instagram size={16} className="text-white" />,
      url: "https://www.instagram.com/mixdorms?igsh=aWhxa2xuM3psaW1p&utm_source=qr",
    },
    {
      id: 4,
      icon: <Earth size={16} className="text-white" />,
      url: "#",
    },
  ];
  const company = [
    {
      id: 1,
      title: "About us",
      url: "/AboutUs",
    },
    {
      id: 2,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 3,
      title: "Awards",
      url: "/Awards",
    },
    {
      id: 4,
      title: "Help",
      url: "/Help",
    },
    {
      id: 5,
      title: "FAQ",
      url: "/FAQ",
    },
    {
      id: 6,
      title: "Contact us",
      url: "#",
      onClick: handleOpenContact,
    },
  ];
  const services = [
    {
      id: 1,
      title: "Hostels",
      url: "#",
    },
    {
      id: 2,
      title: "Booking Guarantee",
      url: "#",
    },
    {
      id: 3,
      title: "Event",
      url: "#",
    },
    {
      id: 4,
      title: "Mixride",
      url: "#",
    },
  ];
  const customerCare = [
    {
      id: 1,
      title: "Login",
      url: "#",
      onClick: handleLoginClick,
    },
    {
      id: 2,
      title: "My account",
      url: "#",
    },
    {
      id: 3,
      title: "Help",
      url: "/Help",
    },
    {
      id: 4,
      title: "Add hostels listing",
      url: "#",
    },
    {
      id: 5,
      title: "Terms & Conditions",
      url: "/Terms&Conditions",
    },
    {
      id: 6,
      title: "Contact us",
      url: "#",
      onClick: handleOpenContact,
    },
  ];

  const privacyPolicy = [
    {
      id: 1,
      title: "Terms & Conditions",
      url: "/Terms&Conditions",
    },
    {
      id: 2,
      title: "Claim",
      url: "/RefundPolicy",
    },
    {
      id: 3,
      title: "Privacy & Policy",
      url: "/PrivacyPolicy",
    },
  ];
  return (
    <>
      <div className="bg-pastel-105 xs:w-full lg:w-[878px] md:py-7 py-5 px-11 mx-auto xs:rounded-9xl rounded-2xl mb-6 w-[90%] xs:flex justify-between items-center text-center xs:text-left xs:mb-[-40px] sm:mb-[-60px] relative z-10">
        <div className="xs:w-[70%]">
          <h3 className="lg:text-[28px] sm:text-2xl text-xl text-white font-bold">
            Looking for a dream Travel?
          </h3>
          <p className="xs:mt-2 mt-1 text-sm text-white ">
            Looking for a dream Travel?
          </p>
        </div>
        <div className="xs:w-[30%] flex xs:justify-end justify-center items-center mt-3 xs:mt-0">
          <button
            type="button"
            className="h-11 min-w-[185px] rounded-9xl text-black bg-white px-4 py-2 flex justify-center items-center text-sm font-semibold "
          >
            Explore Hostels
          </button>
        </div>
      </div>

      <section className="relative w-full bg-black md:pt-36 xs:pt-20 py-8">
        <div className="md:px-8 lg:px-12 xl:px-16 container">
          <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 lg:gap-x-16 md:gap-5 font-manrope ">
            <div className="md:flex md:flex-col grid sm:grid-cols-3 grid-cols-2 items-center md:items-start mb-5 md:mb-0 gap-5 sm:gap-11">
              <div className="col-span-2 sm:col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/mixdrom.png`}
                  width={112}
                  height={40}
                  alt="Mixdorm"
                  title="Mixdorm"
                  className="object-contain w-full max-w-28"
                  loading='lazy'
                />
                <p className="mt-5 text-xs text-white">
                  Your hub for affordable stays, shared rides, and unforgettable
                  travel experiences. Explore the world with us.
                </p>
              </div>
              <ul>
                {contact.map((item) => (
                  <li
                    className="flex items-center justify-start mt-2 text-xs first:mt-0"
                    key={item.id}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center justify-start text-white"
                      prefetch={false}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-start gap-x-2">
                {socialMedia.map((item) => (
                  <li
                    className="flex items-center justify-start text-xs"
                    key={item.id}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center justify-start text-white"
                      prefetch={false}
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 grid grid-cols-3 mb-5 md:mb-0">
              <div>
                <h2 className="xs:text-lg text-base font-bold text-white font-manrope">
                  Company
                </h2>
                <ul className="mt-4 ">
                  {company.map((item) => (
                    <li
                      className="flex items-center justify-start mt-4 text-xs first:mt-0"
                      key={item.id}
                    >
                      <Link
                        href={item.url}
                        onClick={item.onClick || null}
                        className="flex items-center justify-start text-white"
                        prefetch={false}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="xs:text-lg text-base font-bold text-white font-manrope">
                  Services
                </h2>
                <ul className="mt-4 ">
                  {services.map((item) => (
                    <li
                      className="flex items-center justify-start mt-4 text-xs first:mt-0"
                      key={item.id}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center justify-start text-white"
                        prefetch={false}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="xs:text-lg text-base font-bold text-white font-manrope">
                  Customer Care
                </h2>
                <ul className="mt-4 ">
                  {customerCare.map((item) => (
                    <li
                      className="flex items-center justify-start mt-4 text-xs first:mt-0"
                      key={item.id}
                      onClick={item?.onClick}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center justify-start text-white"
                        prefetch={false}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ContactPopup open={openContact} close={handleCloseContact} />
            <SignInPopup
              isOpen={isSignInPopupOpen}
              onClose={handleLoginClosePopup}
            />
            <div className="lg:col-span-1 md:col-span-2 gap-5 lg:gap-0 xs:flex lg:grid">
              <div>
                <h2 className="text-lg font-bold text-white font-manrope">
                  Newsletter
                </h2>
                <p className="mt-5 text-xs text-white">
                  Subscribe to our weekly Newsletter and receive updates via
                  email.
                </p>
                <ul className="mt-5 ">
                  <li className="relative mt-3 first:mt-0">
                    <input
                      type="email"
                      placeholder="Email*"
                      className="w-full h-10 py-3 pl-4 text-xs text-gray-500 bg-white outline-none placeholder:text-gray-400/90 rounded-9xl pr-7 "
                    />
                    <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-10 h-full text-white rounded-full bg-primary-blue ">
                      <TbLocationShare
                        size={18}
                        className="mx-auto text-white"
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mt-5 text-xs text-white">We Accept</p>
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/payment.png`}
                  alt="payment"
                  title="payment"
                  width={278}
                  height={33}
                  className="w-full mt-3"
                  loading='lazy'
                />
              </div>
            </div>
          </div>
          <div className="xs:flex items-center justify-between w-full text-center sm:mt-16 mt-8">
            <p className="text-xs font-normal text-white font-manrope ">
              Hostel Mixdorm Private Limited
            </p>
            <p className="text-xs font-normal text-white font-manrope ">
              All Rights Reserved @ Company 2024
            </p>
            <ul className="flex items-center xs:justify-end justify-center mt-3 sm:mt-0">
              {privacyPolicy.map((item) => (
                <li
                  className="mr-3 text-xs font-normal text-white"
                  key={item.id}
                >
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
