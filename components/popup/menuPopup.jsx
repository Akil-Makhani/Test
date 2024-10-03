import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { getItemLocalStorage,removeItemLocalStorage } from "@/utils/browserSetting";
import ContactPopup from "./contactPopup";

const MenuPopup = ({ isOpen, toggleMenu ,updateTokenState,toggleLoginPopup,updateRoleState }) => {
  // State to manage the open/close state of each section
  const [openSections, setOpenSections] = useState({
    services: false,
    company: false,
    help: false,
    account: false,
  });
  const [hasToken, setHasToken] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false); 
  const [role, setRole] = useState(false);



  if (!isOpen) return null;

  // Toggle function for each section
  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  useEffect(() => {
    const token = getItemLocalStorage("token");
    setHasToken(!!token); 
  }, []);

  useEffect(() => {
    const role = getItemLocalStorage("role");
    setRole(role); 
  }, []);

  const handleLogout = () => {
    removeItemLocalStorage("token")
    removeItemLocalStorage("name") 
    removeItemLocalStorage("id") 
    removeItemLocalStorage("role") 
    toggleMenu(); 
    updateTokenState();
    updateRoleState();
    toast.success("Logout successfully!");
  };

  const openContactPopup = async() => {
    setIsContactPopupOpen(true);
  };

  const closeContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  const handleLoginClick = () => {
    toggleLoginPopup();
    toggleMenu();
  };
  return (
    <>
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-start justify-end bg-black bg-opacity-[70%]">
      <div className="bg-white rounded-2xl w-[70%] max-w-xs p-5 mx-10 mt-24 font-manrope">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#40E0D0] flex text-2xl font-extrabold">
            Mix<p className="text-black text-2xl font-extrabold ">Dorm</p>
          </span>
          <button onClick={toggleMenu} className="text-black">
            ✕
          </button>
        </div>
        <ul className="overflow-y-auto max-h-96 fancy_y_scroll pr-1">
          {/* Services */}
          <li>
            <div
              className={`flex justify-between items-center cursor-pointer  py-3 px-4 rounded-full ${
                openSections.services && "bg-[#D9F9F6] text-black"
              }`}
              onClick={() => toggleSection("services")}
            >
              <Link
                href="/services"
                className="text-base font-medium text-black"
              >
                Services
              </Link>
              {openSections.services ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openSections.services && (
              <ul className="text-base font-medium">
                <li>
                  <Link
                    href="/services/noticeboard"
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                  >
                    Noticeboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mixride"
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                  >
                    Mix Ride
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mixcreators"
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                  >
                    Mix Creators
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mixmate"
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                  >
                    Mix Mate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/events"
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Company */}
          <li>
            <div
              className={`flex justify-between items-center cursor-pointer  py-3 px-4 rounded-full ${
                openSections.company && "bg-[#D9F9F6] text-black"
              }`}
              onClick={() => toggleSection("company")}
            >
              <Link
                href="/company"
                className="text-base font-medium text-black"
              >
                Company
              </Link>
              {openSections.company ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openSections.company && (
              <ul className="text-base font-medium">
                <li>
                  <Link
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    href="/AboutUs"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    href="/company/rewards"
                  >
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    href="/company/blogs"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                <button
                      onClick={openContactPopup}
                      className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    >
                      Contact Us
                    </button>
                </li>
              </ul>
            )}
          </li>
          {/* Help */}
          <li>
            <div
              className={`flex justify-between items-center cursor-pointer  py-3 px-4 rounded-full ${
                openSections.help && "bg-[#D9F9F6] text-black"
              }`}
              onClick={() => toggleSection("help")}
            >
              <Link href="/help" className="text-base font-medium text-black">
                Help
              </Link>
              {openSections.help ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openSections.help && (
              <ul className="text-base font-medium">
                <li>
                  <Link
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    href="/help/faqs"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    href="/help/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue"
                    href="/help/terms"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* My Account */}
          <li>
            <div
              className={`flex justify-between items-center cursor-pointer  py-3 px-4 rounded-full ${
                openSections.account && "bg-[#D9F9F6] text-black"
              }`}
              onClick={() => toggleSection("account")}
            >
              <Link
                href="/account"
                className="text-base font-medium text-black"
              >
                My Account
              </Link>
              {openSections.account ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openSections.account && (
              !hasToken ? 
              <ul className="ml-3 space-y-3">
                <li className="text-lg font-semibold">
                <button onClick={handleLoginClick}>Login</button>
                </li>
                <li  className="text-sm block py-2 px-4 text-black font-medium hover:text-primary-blue">
                <button onClick={handleLoginClick}>Signup</button>
                </li>
              </ul>
              :
              <ul className="ml-3 space-y-3">
                <li className="text-lg font-semibold">
                <Link href={role === "user" ? "/my-profile" : "/dashboard/profile"}>Profile</Link>
                </li>
                <li className="text-lg font-semibold">
                <button
                    onClick={handleLogout}
                    className="text-black font-medium hover:text-primary-blue"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
    {isContactPopupOpen && (
      <ContactPopup isOpen={isContactPopupOpen} onClose={closeContactPopup} />
    )}
    </>
  );
};

export default MenuPopup;
