import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe, Grip, User } from "lucide-react";
import dynamic from "next/dynamic";
import CountryModal from "@/app/admin/Modal/CountryModal";
import LoginPopup from "./LoginPopup";
import MenuPopup from "./MenuPopup";
import { getItemLocalStorage } from "../../../utils/browserSetting";
import MyProfile from "@/app/admin/Modal/MyProfile";
import { HiMenuAlt3 } from "react-icons/hi";
import { Box, Divider, Drawer } from "@mui/material";
import { useRouter } from "next/router";

export default function SearchNavbar() {
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
    router.push("/login");
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

  // Mobile Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <div className="w-full p-2 text-center bg-black">
        <p className="text-white xs:text-sm text-xs">
          Get 1 Month Free <span className="text-[#40E0D0]">Mix premium</span>{" "}
          Membership - Sign Up Now!
        </p>
      </div>
      <header className="bg-teal-400 py-4 shadow-md">
        <div class="container md:px-8 lg:px-12 xl:px-16 flex justify-between items-center">
          <div className="w-[25%]">
            <Link href="/" rel="canonical">
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
              <li className="xs:hidden flex ">
                <Link
                  href="#"
                  rel="canonical"
                  className="text-2xl  font-manrope justify-center items-center font-bold cursor-pointer text-black duration-300 ease-in-out"
                  onClick={toggleDrawer(true)}
                >
                  <HiMenuAlt3 />
                </Link>
              </li>
              <li className="hidden xs:flex">
                <Link
                  href="#"
                  rel="canonical"
                  className="px-5 py-3 text-center font-manrope text-xs font-bold bg-white cursor-pointer rounded-4xl text-black duration-300 ease-in-out"
                  onClick={handleClick}
                >
                  List Your Hostel
                </Link>
              </li>
              <li>
                {!hasToken ? (
                  <Link
                    href="#"
                    className="text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out flex items-center justify-start gap-x-2"
                    onClick={toggleLoginPopup} // Open Login Popup if no token
                  >
                    <User size={20} />
                    Login
                  </Link>
                ) : role === "user" ? (
                  <Link
                    href="#"
                    rel="canonical"
                    className="text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out flex items-center justify-start gap-x-2"
                    onClick={toggleMyProfile} // Open MyProfile if token exists
                  >
                    <User size={20} />
                    Profile
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/profile"
                    rel="canonical"
                    className="text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out flex items-center justify-start gap-x-2"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                )}
              </li>
              <li className="hidden xs:flex">
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
              </li>
              <li>
                <Link
                  href="#"
                  rel="canonical"
                  className="text-sm font-manrope font-bold cursor-pointer text-black duration-300 ease-in-out"
                  onClick={toggleMenu}
                >
                  <Grip size={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Link href="/" rel="canonical" className="p-4 block">
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
              className="block px-5 py-3 text-center font-manrope text-base font-bold bg-primary-blue cursor-pointer rounded-4xl text-black duration-300 ease-in-out"
              onClick={handleClick}
            >
              List Your Hostel
            </Link>
          </div>
        </Box>
      </Drawer>

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
}
