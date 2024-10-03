import React from "react";
import Link from "next/link";
import { User, LogOut, Wallet, Edit, HelpCircle, List } from "lucide-react"; // Icons
import toast from "react-hot-toast";
import { removeItemLocalStorage } from "@/utils/browserSetting";

const MyProfile = ({ isMenuOpen, toggleMenu,updateTokenState,updateRoleState }) => {

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

  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-70">
      <div className="bg-white rounded-2xl  mt-28 mr-28 w-[90%] max-w-sm p-5 shadow-lg font-manrope">
        <div className="flex flex-col items-center">
          {/* Header with Brand */}
          <div className="flex justify-between items-center w-full mb-4">
            <span className="text-[#40E0D0] flex text-2xl font-extrabold mb-2">
              Mix<p className="text-black text-2xl font-extrabold ">Dorm</p>
            </span>
            <button
              onClick={toggleMenu}
              className="text-black hover:text-gray-600 transition duration-150"
            >
              ✕
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-1 text-left w-full">
            <li className="">
              <Link
                className="flex items-center gap-x-2 p-3 rounded-full hover:bg-primary-blue hover:text-white text-base text-semibold cursor-pointer text-black"
                href="/my-profile"
              >
                <User size={20} /> My Profile
              </Link>
            </li>
            <li className="">
              <Link
                href="/my-profile"
                className="flex items-center gap-x-2 p-3 rounded-full hover:bg-primary-blue hover:text-white text-base text-semibold cursor-pointer text-black "
              >
                <Edit size={20} /> Edit Details
              </Link>
            </li>
            <li className="">
              <Link
                href="/my-profile"
                className="flex items-center gap-x-2 p-3 rounded-full hover:bg-primary-blue hover:text-white text-base text-semibold cursor-pointer text-black "
              >
                <List size={20} /> My Trips
              </Link>
            </li>
            <li className=" ">
              <Link
                href="/my-profile"
                className="flex items-center gap-x-2 p-3 rounded-full hover:bg-primary-blue hover:text-white text-base text-semibold cursor-pointer text-black"
              >
                <Wallet size={20} /> My Wallet
              </Link>
            </li>
            <li className="">
              <Link
                href="/my-profile"
                className="flex items-center gap-x-2 p-3 rounded-full hover:bg-primary-blue hover:text-white text-base text-semibold cursor-pointer text-black"
              >
                <HelpCircle size={20} /> Help
              </Link>
            </li>
            <li
              className="flex items-center gap-x-2 p-3 text-red-600 rounded-full hover:bg-red-600 hover:text-white text-base text-semibold cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
