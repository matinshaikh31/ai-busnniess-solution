import React, { useEffect, useState, useMemo } from "react";
import ProductList from "./ProductList";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { products } from "../data";

const AlibabaSupplierPage = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // Optimized filtering using useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        (!filters.country || product.country === filters.country) &&
        (!searchTerm || product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [filters, searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="flex">
        <div className="w-1/4 m-2">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default AlibabaSupplierPage;
