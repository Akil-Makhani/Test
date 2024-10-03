import React, { useState } from "react";

const SortPopup = ({ show, onClose, setSort, getData, close }) => {
  const [localSort, setLocalSort] = useState("");
  const [hoveredButton, setHoveredButton] = useState("");

  const handleSortChange = (sortOption) => {
    setLocalSort(sortOption);
  };

  const applySort = () => {
    setSort(localSort);
    getData();
    onClose();
  };

  const getButtonClasses = (sortOption) => {
    const baseClasses =
      "py-1 px-4 border border-[#EEEEEE] rounded-3xl whitespace-nowrap";
    const activeClasses = "bg-[#40E0D033]";
    if (localSort === sortOption || hoveredButton === sortOption) {
      return `${baseClasses} ${activeClasses}`;
    }
    return baseClasses;
  };

  return (
    show && (
      <div className="fixed w-full h-full left-0 right-0 top-0 bottom-0 bg-black bg-opacity-[70%] z-[99] !m-0">
        <div className="absolute base:top-48 base:right-10 bg-white shadow-lg rounded-3xl z-10 sm:w-[521px] w-[90%] base:translate-x-0 base:translate-y-0 -translate-x-1/2 -translate-y-1/2 left-1/2 base:left-auto top-1/2">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                Sort by
                {/* {sort ? `${sort}` : ""} */}
              </h3>
              <button onClick={() => close(!show)} className="text-black">
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                className={`${getButtonClasses("highestPrice")} text-sm font-semibold`}
                onClick={() => handleSortChange("highestPrice")}
                onMouseEnter={() => setHoveredButton("highestPrice")}
                onMouseLeave={() => setHoveredButton("")}
              >
                Highest Price
              </button>
              <button
                className={`${getButtonClasses("lowestPrice")} text-sm font-semibold`}
                onClick={() => handleSortChange("lowestPrice")}
                onMouseEnter={() => setHoveredButton("lowestPrice")}
                onMouseLeave={() => setHoveredButton("")}
              >
                Lowest Price
              </button>
              <button
                className={`${getButtonClasses("bestRated")} text-sm font-semibold`}
                onClick={() => handleSortChange("bestRated")}
                onMouseEnter={() => setHoveredButton("bestRated")}
                onMouseLeave={() => setHoveredButton("")}
              >
                Best Rate
              </button>
              <button
                className={`${getButtonClasses("distFromCC")} text-sm font-semibold`}
                onClick={() => handleSortChange("distFromCC")}
                onMouseEnter={() => setHoveredButton("distFromCC")}
                onMouseLeave={() => setHoveredButton("")}
              >
                Distance from City
              </button>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-sm text-[#434343]">
              *You can choose multiple Order Status
            </h4>
            <div className="flex justify-end">
              <button
                onClick={applySort}
                className="mt-4 py-3 px-12 bg-teal-400 hover:bg-teal-500 text-black font-bold text-sm rounded-3xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SortPopup;
