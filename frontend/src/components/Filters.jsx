import React, { useState } from "react";
// import debounce from "lodash.debounce";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    country: "",
    priceRange: { min: "", max: "" },
    certifications: "",
    industries: "",
    revenueRange: { min: "", max: "" },
    reliabilityRange: { min: "", max: "" },
  });

  const countries = ["China", "Bangladesh", "India", "Vietnam"]; // Extend list

  const handleChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRangeChange = (field, key, value) => {
    const updatedFilters = {
      ...filters,
      [field]: { ...filters[field], [key]: value },
    };
    setFilters(updatedFilters);
    debouncedFilterChange(updatedFilters);
  };

//   const debouncedFilterChange = debounce(onFilterChange, 300);

  const resetFilters = () => {
    const defaultFilters = {
      country: "",
      priceRange: { min: "", max: "" },
      certifications: "",
      industries: "",
      revenueRange: { min: "", max: "" },
      reliabilityRange: { min: "", max: "" },
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      {/* Country Filter */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select
          value={filters.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={(e) => handleRangeChange("priceRange", "min", e.target.value)}
            className="input-style"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={(e) => handleRangeChange("priceRange", "max", e.target.value)}
            className="input-style"
          />
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Certifications</label>
        <input
          type="text"
          placeholder="e.g., ROHS, STANDARD"
          value={filters.certifications}
          onChange={(e) => handleChange("certifications", e.target.value)}
          className="input-style"
        />
      </div>

      {/* Industries */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Industries Served</label>
        <input
          type="text"
          placeholder="e.g., Apparel, Electronics"
          value={filters.industries}
          onChange={(e) => handleChange("industries", e.target.value)}
          className="input-style"
        />
      </div>

      {/* Revenue Range */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Annual Revenue Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.revenueRange.min}
            onChange={(e) => handleRangeChange("revenueRange", "min", e.target.value)}
            className="input-style"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.revenueRange.max}
            onChange={(e) => handleRangeChange("revenueRange", "max", e.target.value)}
            className="input-style"
          />
        </div>
      </div>

      {/* Reliability Score */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Reliability Score Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.reliabilityRange.min}
            onChange={(e) => handleRangeChange("reliabilityRange", "min", e.target.value)}
            className="input-style"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.reliabilityRange.max}
            onChange={(e) => handleRangeChange("reliabilityRange", "max", e.target.value)}
            className="input-style"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="mt-3 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
