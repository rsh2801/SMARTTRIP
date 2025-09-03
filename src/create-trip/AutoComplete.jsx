import React, { useState } from "react";

const AutoComplete = ({handlePlace}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const fetchSuggestions = async (value) => {
    if (value.length < 2) return setSuggestions([]);
    try {
      const response = await fetch(
        `https://maps.mapthrust.io/maps/api/place/autocomplete/json?input=${value}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSelect = (place) => {
    setInput(place.description);
    setSuggestions([]);
    handlePlace(place);
  };

  return (
    <div className="relative font-normal z-50">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search places..."
        className="placeholder:text-[18px] placeholder:text-gray-500 w-full text-medium h-10 p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
