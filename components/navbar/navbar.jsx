import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { ChevronDown, Globe, Grip, User } from "lucide-react";
import dynamic from "next/dynamic";
import { HiMenuAlt3 } from "react-icons/hi";
import { Box, Divider, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import CountryModal from "../model/countryModel";
import LoginPopup from "../popup/loginPopup";
import MenuPopup from "../popup/menuPopup";
import Noticeboard from "../model/noticeboard";
import { getItemLocalStorage } from "@/utils/browserSetting";
import MyProfile from "../model/myProfile";

const Navbar = () => {
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const handleOpenCountryModal = () => setOpenCountryModal(true);
  const handleCloseCountryModal = () => setOpenCountryModal(false);

  const [scrolled, setScrolled] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [hoveringTop, setHoveringTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [role, setRole] = useState(false);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [isNoticeboardOpen, setIsNoticeboardOpen] = useState(false);
  const [flagUrl, setFlagUrl] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");

  const router = useRouter();

  const toggleMyProfile = () => setIsMyProfileOpen(!isMyProfileOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLoginPopup = () => setShowLoginPopup(!showLoginPopup);

  const updateTokenState = () => {
    const token = getItemLocalStorage("token");
    setHasToken(!!token);
  };

  const updateRoleState = () => {
    const role = getItemLocalStorage("role");
    setRole(role);
  };

  const updateCountry = () => {
    const flag = getItemLocalStorage("selectedCountryFlag");
    const code = getItemLocalStorage("selectedCurrencyCode");

    setFlagUrl(flag);
    setCurrencyCode(code);
  };

  useEffect(() => {
    updateTokenState();
  }, []);

  useEffect(() => {
    updateRoleState();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        updateTokenState();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "role") {
        updateRoleState();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event("itemInserted");
      originalSetItem.apply(this, arguments);
      if (key === "token") {
        window.dispatchEvent(event);
      }
    };

    const handleItemInserted = () => {
      updateTokenState();
    };

    window.addEventListener("itemInserted", handleItemInserted);

    return () => {
      window.removeEventListener("itemInserted", handleItemInserted);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event("itemInserted");
      originalSetItem.apply(this, arguments);
      if (key === "token") {
        window.dispatchEvent(event);
      }
    };

    const handleItemInserted = () => {
      updateRoleState();
    };

    window.addEventListener("itemInserted", handleItemInserted);

    return () => {
      window.removeEventListener("itemInserted", handleItemInserted);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    const handleMouseMove = (event) => {
      setHoveringTop(event.clientY < 85);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    router.push("/hostel-login");
  };

  useEffect(() => {
    const selectedCountryFlag = getItemLocalStorage("selectedCountryFlag");
    const selectedCurrencyCode = getItemLocalStorage("selectedCurrencyCode");

    if (selectedCountryFlag) {
      const url = selectedCountryFlag;
      setFlagUrl(url);
      setCurrencyCode(selectedCurrencyCode);
    }
  }, []);
  // Notice Board Modal
  const [openNoticeBoard, setOpenNoticeBoard] = useState(false);
  const handleOpenNoticeBoard = () => {
    setOpenNoticeBoard(true);
  };
  const handleCloseNoticeBoard = () => {
    setOpenNoticeBoard(false);
  };

  // Mobile Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <section
        className={`w-full duration-300 ease-in-out ${
          scrolled && !hoveringTop ? "-top-10" : "sticky top-0 z-50"
        }`}
      >
        <div className="flex items-center justify-center px-5 py-2.5 bg-black w-full">
          <p className="text-white xs:text-sm text-xs">
            Get 1 Month Free{" "}
            <span className="text-primary-blue"> Mix Premium </span>Membership –
            Sign Up Now!
          </p>
        </div>
        <div className="w-full bg-white shadow">
          <div className="relative z-50 flex items-center justify-between py-4 container">
            <div className="w-[25%]">
              <Link href="/" rel="canonical" prefetch={false}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/mixdrom-white.svg`}
                  width={155}
                  height={40}
                  alt="Content Ai"
                  title="Content Ai"
                  className="max-w-[110px] md:max-w-[155px] md:max-h-24 relative z-50 w-fit object-contain bg-blend-color-burn cursor-pointer hover:scale-95 duration-500 ease-in-out"
                />
              </Link>
            </div>
            <div className="w-[75%] flex justify-end items-center">
              <ul className="flex items-center justify-center md:gap-x-5 gap-x-3">
                <li className="md:hidden block">
                  <Link
                    href="#"
                    rel="canonical"
                    className="text-2xl font-manrope justify-center items-center font-bold cursor-pointer text-black duration-300 ease-in-out"
                    onClick={toggleDrawer(true)}
                    prefetch={false}
                  >
                    <HiMenuAlt3 />
                  </Link>
                </li>
                <li className="md:block hidden">
                  <Link
                    href="/hostel-login"
                    passHref
                    className="text-xs font-manrope min-w-[100px] font-bold bg-primary-blue cursor-pointer rounded-9xl text-black duration-300 ease-in-out px-5 py-3"
                    onClick={handleClick}
                    prefetch={false}
                  >
                    List Your Hostel
                  </Link>
                </li>
                <li className="hidden md:block">
                  <Link
                    href="#"
                    rel="canonical"
                    className="text-sm font-manrope items-center font-bold cursor-pointer rounded-9xl text-black duration-300 ease-in-out gap-x-2 flex"
                    onClick={handleOpenNoticeBoard}
                    prefetch={false}
                  >
                    <MdOutlineNotificationsActive
                      size={20}
                      className="font-normal text-black"
                    />{" "}
                    Noticeboard
                  </Link>
                </li>
                <li>
                  {!hasToken ? (
                    <Link
                      href="#"
                      className="text-sm font-manrope flex items-center font-bold cursor-pointer text-black duration-300 ease-in-out gap-x-2"
                      onClick={toggleLoginPopup} // Open Login Popup if no token
                      prefetch={false}
                    >
                      <User size={20} />
                      Login
                    </Link>
                  ) : role === "user" ? (
                    <Link
                      href="#"
                      rel="canonical"
                      className="text-sm font-manrope flex items-center font-bold cursor-pointer text-black duration-300 ease-in-out gap-x-2"
                      onClick={toggleMyProfile} // Open MyProfile if token exists
                      prefetch={false}
                    >
                      <User size={20} />
                      Profile
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/profile"
                      rel="canonical"
                      className="text-sm font-manrope flex items-center font-bold cursor-pointer text-black duration-300 ease-in-out gap-x-2"
                      prefetch={false}
                    >
                      <User size={20} />
                      Profile
                    </Link>
                  )}
                </li>
                <li className="hidden md:block">
                  <button
                    type="button"
                    className="text-sm font-manrope items-center font-bold cursor-pointer text-black duration-300 ease-in-out gap-x-2 flex"
                    onClick={handleOpenCountryModal}
                  >
                    {flagUrl ? (
                      <Image
                        src={flagUrl}
                        alt="Country Flag"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <Globe size={20} />
                    )}
                    {currencyCode ? currencyCode : "Country"}
                    <ChevronDown size={18} />
                  </button>
                </li>
                <li>
                  <Link
                    href="#"
                    rel="canonical"
                    className="text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out"
                    onClick={toggleMenu}
                    prefetch={false}
                  >
                    <Grip size={24} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Link href="/" rel="canonical" className="p-4 block" prefetch={false}>
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL_FE}/front-images/mixdrom-white.svg`}
              width={155}
              height={40}
              alt="Content Ai"
              title="Content Ai"
              className="max-w-[110px] md:max-w-[155px] md:max-h-24 relative z-50 w-fit object-contain bg-blend-color-burn cursor-pointer hover:scale-95 duration-500 ease-in-out"
            />
          </Link>
          <Divider />
          <div className="p-3">
            <label htmlFor="" className="flex items-center gap-4 mb-4">
              <Globe size={20} /> Select Currency
            </label>
            <button
              type="button"
              className="flex items-center gap-x-2 text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out"
              onClick={handleOpenCountryModal}
            >
              {flagUrl ? (
                <Image
                  src={flagUrl}
                  alt="Country Flag"
                  width={20}
                  height={20}
                />
              ) : (
                <Globe size={20} />
              )}
              {currencyCode ? currencyCode : "Country"}
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="p-3">
            <Link
              href="#"
              rel="canonical"
              className="text-sm font-manrope items-center font-bold cursor-pointer rounded-9xl text-black duration-300 ease-in-out gap-x-2 flex"
              onClick={handleOpenNoticeBoard}
              prefetch={false}
            >
              <MdOutlineNotificationsActive
                size={20}
                className="font-normal text-black"
              />{" "}
              Noticeboard
            </Link>
          </div>

          <div className="p-3">
            <Link
              href="#"
              rel="canonical"
              className="block px-5 py-3 text-center font-manrope text-base font-bold bg-primary-blue cursor-pointer rounded-4xl text-black duration-300 ease-in-out"
              onClick={handleClick}
              prefetch={false}
            >
              List Your Hostel
            </Link>
          </div>
        </Box>
      </Drawer>

      <Noticeboard close={handleCloseNoticeBoard} open={openNoticeBoard} />
      {isMenuOpen && (
        <MenuPopup
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          updateTokenState={updateTokenState}
          toggleLoginPopup={toggleLoginPopup}
          updateRoleState={updateRoleState}
        />
      )}
      <MyProfile
        isMenuOpen={isMyProfileOpen}
        toggleMenu={toggleMyProfile}
        updateTokenState={updateTokenState}
        updateRoleState={updateRoleState}
      />
      <LoginPopup isOpen={showLoginPopup} onClose={toggleLoginPopup} />

      <CountryModal
        openCountryModal={openCountryModal}
        handleCloseCountryModal={handleCloseCountryModal}
        updateCountry={updateCountry}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
