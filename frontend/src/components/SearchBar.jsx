// src/components/SearchBar.js

import React from 'react';

const SearchBar = ({ onSearchChange }) => {
  const handleSearch = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default SearchBar;