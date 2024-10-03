import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const StateAutocomplete = ({ state, setState, size = "small" }) => {
  const [location, setLocation] = useState(state);
  const [suggestions, setSuggestions] = useState([]);

  // Function to remove diacritics from the text
  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setLocation(value);

    if (value.length > 2) {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=4766976f288a45c099b0cbb690008939&limit=5`
      );
      const results = await response.json();
      console.log("result", results?.results);

      // Remove diacritics from suggestions
      const processedSuggestions = results?.results.map((result) => ({
        ...result,
        formatted: removeDiacritics(result.formatted),
      }));

      setSuggestions(processedSuggestions);
      setState(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setLocation(suggestion.formatted);
    setState(suggestion.formatted);
    setSuggestions([]);
  };

  const inputClasses = size === "large" ? "middle px-3" : " font-middle  px-1";
  const iconClasses = size === "large" ? "text-2xl" : "text-xl";
  const suggestionClasses =
    size === "large" ? "text-lg py-1 px-4" : "base:text-sm text-base py-1 px-2";
  const placeholderClasses = size === "large" ? "text-lg" : "text-base";

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <div className="flex items-center w-full">
        <IoLocationOutline className={`text-black ${iconClasses}`} />
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder={state || "Where to ?"}
          className={`placeholder-black w-full font-semibold rounded py-1 base:py-0 ${inputClasses} ${placeholderClasses}`}
          style={{ outline: "none" }}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="w-full min-w-56 rounded-2xl p-3 z-50 bg-white shadow-lg absolute left-0 lg:left-[-20px] top-[62px]">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`cursor-pointer text-sm hover:bg-gray-100 rounded-xl py-3 ${suggestionClasses}`}
            >
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StateAutocomplete;
