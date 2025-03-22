import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearchChange }) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for products..."
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;