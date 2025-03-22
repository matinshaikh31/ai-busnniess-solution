import React, { useState, useMemo } from "react";
import ProductList from "./ProductList";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { products } from "../data";

const AlibabaSupplierPage = () => {
  const [filters, setFilters] = useState({
    country: "",
    industry: "",
    certification: "",
    manufacturingCapability: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // Optimized filtering using useMemo
  const filteredProducts = useMemo(() => {
    return products.products.filter((product) => {
      return (
        // Country filter
        (!filters.country || product.country === filters.country) &&
        
        // Industry filter
        (!filters.industry || product.industries_served.includes(filters.industry)) &&
        
        // Certification filter
        (!filters.certification || product.certifications.includes(filters.certification)) &&
        
        // Manufacturing capability filter
        (!filters.manufacturingCapability || 
          product.manufacturing_capabilities.toLowerCase().includes(filters.manufacturingCapability.toLowerCase())) &&
        
        // Search term filter
        (!searchTerm || product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [filters, searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Supplier Marketplace</h1>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <Filters 
            onFilterChange={handleFilterChange} 
            availableCountries={products.countries}
            availableIndustries={products.industries}
            availableCertifications={products.certifications}
          />
        </div>
        <div className="w-full md:w-3/4">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default AlibabaSupplierPage;