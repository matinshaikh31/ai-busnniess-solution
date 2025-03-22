import React, { useState } from "react";
import { FaGlobe, FaIndustry, FaCertificate, FaCog } from "react-icons/fa";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    certification: "",
    manufacturingProcess: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 Advanced Filters</h3>

      {/* Country Filter */}
      <div className="mb-4">
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <FaGlobe className="mr-2 text-blue-500" /> Country
        </label>
        <select
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 transition-all"
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="China">China</option>
          <option value="Germany">Germany</option>
          <option value="India">India</option>
        </select>
      </div>

      {/* Industry Filter */}
      <div className="mb-4">
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <FaIndustry className="mr-2 text-green-500" /> Industry
        </label>
        <select
          name="industry"
          value={filters.industry}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 transition-all"
        >
          <option value="">All Industries</option>
          <option value="Electronics">Electronics</option>
          <option value="Automobile">Automobile</option>
          <option value="Textile">Textile</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>

      {/* Certifications Filter */}
      <div className="mb-4">
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <FaCertificate className="mr-2 text-yellow-500" /> Certifications
        </label>
        <select
          name="certification"
          value={filters.certification}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-yellow-400 transition-all"
        >
          <option value="">All Certifications</option>
          <option value="ISO 9001">ISO 9001</option>
          <option value="CE">CE</option>
          <option value="FDA">FDA</option>
          <option value="RoHS">RoHS</option>
        </select>
      </div>

      {/* Manufacturing Process Filter */}
      <div>
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <FaCog className="mr-2 text-red-500" /> Manufacturing Process
        </label>
        <select
          name="manufacturingProcess"
          value={filters.manufacturingProcess}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-400 transition-all"
        >
          <option value="">All Processes</option>
          <option value="Injection Molding">Injection Molding</option>
          <option value="CNC Machining">CNC Machining</option>
          <option value="3D Printing">3D Printing</option>
          <option value="Casting">Casting</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
