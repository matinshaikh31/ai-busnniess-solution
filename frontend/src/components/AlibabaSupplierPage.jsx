// src/components/AlibabaSupplierPage.js

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Filters from "./Filters";
import SearchBar from "./SearchBar";

const products = [
  {
    id: 1,
    product_name: "Product A",
    price: 4.75,
    website: "example.com/product-a",
    country: "China",
    contact_data: "Chat Now | Contact Supplier",
    manufacturing_capabilities: "OEM service available",
    certifications: "ROHS, STANDARD",
    customer_reviews: "4.5 stars | 10 reviews",
    industries_served: "Apparel",
    company_metadata: {
      image: "path/to/product-a-image.jpg",
      min_order: "2 pieces",
    },
    annual_revenue: 100000,
    reliability_score: 4.8,
  },
  {
    id: 2,
    product_name: "Product B",
    price: 12.5,
    website: "example.com/product-b",
    country: "Bangladesh",
    contact_data: "Contact Supplier",
    manufacturing_capabilities: "Customization",
    certifications: "ISO 9001",
    customer_reviews: "4.2 stars | 25 reviews",
    industries_served: "Electronics",
    company_metadata: {
      image: "path/to/product-b-image.jpg",
      min_order: "5 pieces",
    },
    annual_revenue: 50000,
    reliability_score: 4.5,
  },
  {
    id: 3,
    product_name: "Product C",
    price: 8.99,
    website: "example.com/product-c",
    country: "China",
    contact_data: "Chat Now",
    manufacturing_capabilities: "Full production",
    certifications: "CE",
    customer_reviews: "4.9 stars | 15 reviews",
    industries_served: "Textiles",
    company_metadata: {
      image: "path/to/product-c-image.jpg",
      min_order: "1 piece",
    },
    annual_revenue: 200000,
    reliability_score: 4.7,
  },
  {
    id: 4,
    product_name: "Product D",
    price: 6.2,
    website: "example.com/product-d",
    country: "India",
    contact_data: "Contact Supplier",
    manufacturing_capabilities: "OEM, ODM",
    certifications: "GMP",
    customer_reviews: "4.6 stars | 30 reviews",
    industries_served: "Pharmaceuticals",
    company_metadata: {
      image: "path/to/product-d-image.jpg",
      min_order: "10 pieces",
    },
    annual_revenue: 75000,
    reliability_score: 4.3,
  },
  {
    id: 5,
    product_name: "Product E",
    price: 15.0,
    website: "example.com/product-e",
    country: "Vietnam",
    contact_data: "Chat Now | Contact Supplier",
    manufacturing_capabilities: "Assembly",
    certifications: "UL",
    customer_reviews: "4.4 stars | 20 reviews",
    industries_served: "Machinery",
    company_metadata: {
      image: "path/to/product-e-image.jpg",
      min_order: "3 pieces",
    },
    annual_revenue: 120000,
    reliability_score: 4.6,
  },
  {
    id: 6,
    product_name: "Product F",
    price: 9.5,
    website: "example.com/product-f",
    country: "China",
    contact_data: "Chat Now",
    manufacturing_capabilities: "Packaging",
    certifications: "FSC",
    customer_reviews: "4.7 stars | 18 reviews",
    industries_served: "Paper",
    company_metadata: {
      image: "path/to/product-f-image.jpg",
      min_order: "8 pieces",
    },
    annual_revenue: 90000,
    reliability_score: 4.8,
  },
  {
    id: 7,
    product_name: "Product G",
    price: 7.8,
    website: "example.com/product-g",
    country: "Indonesia",
    contact_data: "Contact Supplier",
    manufacturing_capabilities: "Finishing",
    certifications: "REACH",
    customer_reviews: "4.3 stars | 22 reviews",
    industries_served: "Furniture",
    company_metadata: {
      image: "path/to/product-g-image.jpg",
      min_order: "6 pieces",
    },
    annual_revenue: 60000,
    reliability_score: 4.4,
  },
  {
    id: 8,
    product_name: "Product H",
    price: 11.2,
    website: "example.com/product-h",
    country: "Thailand",
    contact_data: "Chat Now | Contact Supplier",
    manufacturing_capabilities: "Molding",
    certifications: "ISO 14001",
    customer_reviews: "4.8 stars | 28 reviews",
    industries_served: "Plastics",
    company_metadata: {
      image: "path/to/product-h-image.jpg",
      min_order: "4 pieces",
    },
    annual_revenue: 150000,
    reliability_score: 4.7,
  },
  {
    id: 9,
    product_name: "Product I",
    price: 5.5,
    website: "example.com/product-i",
    country: "Pakistan",
    contact_data: "Chat Now",
    manufacturing_capabilities: "Printing",
    certifications: "Oeko-Tex",
    customer_reviews: "4.5 stars | 12 reviews",
    industries_served: "Printing",
    company_metadata: {
      image: "path/to/product-i-image.jpg",
      min_order: "9 pieces",
    },
    annual_revenue: 40000,
    reliability_score: 4.5,
  },
  {
    id: 10,
    product_name: "Product J",
    price: 13.8,
    website: "example.com/product-j",
    country: "Malaysia",
    contact_data: "Contact Supplier",
    manufacturing_capabilities: "Welding",
    certifications: "ASME",
    customer_reviews: "4.6 stars | 26 reviews",
    industries_served: "Metalworking",
    company_metadata: {
      image: "path/to/product-j-image.jpg",
      min_order: "7 pieces",
    },
    annual_revenue: 180000,
    reliability_score: 4.6,
  },
];

const AlibabaSupplierPage = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleFilterChange = (newFilters) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };
  
    const handleSearchChange = (newSearchTerm) => {
      setSearchTerm(newSearchTerm);
    };
  
    // Apply filters and search whenever filters or searchTerm changes
    useEffect(() => {
      let results = products;
  
      if (filters.country) {
        results = results.filter(
          (product) => product.country === filters.country
        );
      }
  
      if (searchTerm) {
        results = results.filter((product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFilteredProducts(results);
    }, [filters, searchTerm]); // Runs when filters or searchTerm change
  
    return (
      <div className="container mx-auto p-4">
        <SearchBar onSearchChange={handleSearchChange} />
        <div className="flex">
          <div className="w-1/4">
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
  