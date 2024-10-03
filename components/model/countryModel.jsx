import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { IoCloseCircleOutline, IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import Image from "next/image";
import { setItemLocalStorage } from "@/utils/browserSetting";

const CountryModal = ({
  openCountryModal,
  handleCloseCountryModal,
  updateCountry,
  onSelectCountry,
}) => {
  const [countryCurrencyCodes, setCountryCurrencyCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  useEffect(() => {
    const fetchCountryCurrencyCodes = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          country: country.name.common,
          code: country.currencies ? Object.keys(country.currencies)[0] : "N/A",
          flag: country.flags?.png || "https://via.placeholder.com/30x25",
          symbol: country.currencies
            ? Object.values(country.currencies)[0].symbol
            : "€",
        }));
        setCountryCurrencyCodes(countryData);
        setFilteredCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryCurrencyCodes();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filtered = countryCurrencyCodes.filter(({ country, code }) =>
      country.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (country, code, flag, symbol) => {
    setItemLocalStorage("selectedCountry", country);
    setItemLocalStorage("selectedCurrencyCode", code);
    setItemLocalStorage("selectedCountryFlag", flag);
    setItemLocalStorage("selectedCurrencySymbol", symbol);
    setItemLocalStorage("selectedRoomsData", null);
    setSearchTerm("");
    setFilteredCountries(countryCurrencyCodes);
    updateCountry();

    if (onSelectCountry) {
      onSelectCountry(country, code);
    }
    handleCloseCountryModal();
  };

  return (
    <Modal
      open={openCountryModal}
      onClose={handleCloseCountryModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div sx={style}>
        <div className="bg-white rounded-2xl max-w-[870px] mx-auto left-1/2 absolute w-[95%] top-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-t-2xl">
            <h2 className="text-xl text-black font-bold">Country Currency</h2>
            <button
              onClick={handleCloseCountryModal}
              className="text-black text-2xl hover:text-primary-blue"
            >
              <IoCloseCircleOutline />
            </button>
          </div>
          <div className="md:p-8 p-4">
            <div className="relative mb-4">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-black text-xl">
                <IoSearchOutline />
              </div>
              <input
                type="text"
                placeholder="Search by country or code..."
                className="w-full pl-12 pr-3 py-4 border rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm placeholder:text-gray-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 max-h-96 overflow-y-auto fancy_y_scroll">
              {filteredCountries?.length > 0 ? (
                filteredCountries?.map(({ country, code, flag, symbol }) => (
                  <button
                    key={country}
                    type="button"
                    className="py-3 px-4 text-left hover:bg-gray-100 rounded-xl flex items-start gap-2 text-sm"
                    onClick={() =>
                      handleCountrySelect(country, code, flag, symbol)
                    }
                  >
                    <span className="pt-0.5">
                      <Image src={flag} alt="" width={30} height={25} />
                    </span>
                    <span className="flex-1">
                      <span className="xs:inline-block hidden"> {country}</span>{" "}
                      ({code})
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-center text-red-600 font-semibold py-10 col-span-3">
                  No results found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CountryModal;
