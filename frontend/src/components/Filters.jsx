import React, { useState } from "react";
import { FaGlobe, FaIndustry, FaCertificate, FaCog } from "react-icons/fa";

const Filters = ({ 
  onFilterChange, 
  availableCountries, 
  availableIndustries, 
  availableCertifications 
}) => {
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    certification: "",
    manufacturingCapability: "",
  });


  console.log("Filters -> availableCountries", availableCountries);
  const manufacturingCapabilities = [
    "OEM", 
    "ODM", 
    "Customization", 
    "Assembly", 
    "Packaging", 
    "Finishing", 
    "Molding", 
    "Printing", 
    "Welding",
    "Full production"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white w-full">
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
          {availableCountries?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
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
          {availableIndustries?.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
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
          {availableCertifications?.map((certification) => (
            <option key={certification} value={certification}>
              {certification}
            </option>
          ))}
        </select>
      </div>

      {/* Manufacturing Capability Filter */}
      <div>
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <FaCog className="mr-2 text-red-500" /> Manufacturing Capability
        </label>
        <select
          name="manufacturingCapability"
          value={filters.manufacturingCapability}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-400 transition-all"
        >
          <option value="">All Capabilities</option>
          {manufacturingCapabilities?.map((capability) => (
            <option key={capability} value={capability}>
              {capability}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;