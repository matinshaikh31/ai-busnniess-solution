import React, { useState, useMemo, useEffect } from "react";

import ProductList from "./ProductList";

import Filters from "./Filters";

import SearchBar from "./SearchBar";

// import { products } from "../data";

import { db, collection, getDocs } from "../firebase";

const AlibabaSupplierPage = () => {
  // useEffect(() => {

  // const fetchProducts = async () => {

  // try {

  // const querySnapshot = await getDocs(collection(db, "suppliers"));

  // const productList = querySnapshot.docs.map((doc) => ({

  // id: doc.id,

  // ...doc.data(),

  // }));

  // console.log("Fetched Firestore Data:", productList); // Debugging line

  // setProducts(formatFirestoreData(productList));

  // } catch (error) {

  // console.error("Error fetching products:", error);

  // }

  // };

  // fetchProducts();

  // }, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      console.log("Fetching data from Firestore...");

      const querySnapshot = await getDocs(collection(db, "suppliers"));

      if (querySnapshot.empty) {
        console.log("No data found in Firestore.");

        return;
      }

      console.log(
        "Raw Firestore Data:",

        querySnapshot.docs.map((doc) => doc.data())
      );

      const formattedProducts = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // console.log("Processing Document:", doc.id, data);

        return {
          id: doc.id,

          product_name: data["Company Name"] || "Unknown Company",

          price: data.Price || "Not Available",

          website: data.Website || "No Website Available",

          country: data.Country || "Unknown",

          location: data.Location || "Unknown",

          customers: data.Customers || "N/A",

          description: data.Description || "No Description Available",

          manufacturing_capabilities:
            data["Manufacturing Capabilities"] || "Unknown",

          certifications: data.Certifications || "N/A",

          customer_reviews: data.Rating ? `${data.Rating} stars` : "No reviews",

          industries_served:
            data["Industries Served"] !== "N/A"
              ? [data["Industries Served"]]
              : [],

          company_metadata: {
            employees: data["Company Metadata"]?.Employees || "N/A",
            annual_revenue:
              data["Company Metadata"]?.["Annual Revenue"] || "N/A",
            image: "default-image.jpg", // Default image placeholder
            min_order: "N/A",
          },

          reliability_score: data.Rating ? parseFloat(data.Rating) || 0 : 0,
        };
      });

      // console.log("Formatted Firestore Data:", formattedProducts);

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [filters, setFilters] = useState({
    country: "",

    industry: "",

    certification: "",

    manufacturingCapability: "",
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
    return products.filter((product) => {
      // console.log("Filtering Product:", product);

      return (
        // Country filter
        (!filters.country ||
          product.country?.toLowerCase() === filters.country.toLowerCase()) &&
        // Industry filter
        (!filters.industry ||
          product.industries_served?.some((industry) =>
            industry.toLowerCase().includes(filters.industry.toLowerCase())
          )) &&
        // Certification filter
        (!filters.certification ||
          product.certifications?.some((cert) =>
            cert.toLowerCase().includes(filters.certification.toLowerCase())
          )) &&
        // Manufacturing capability filter
        (!filters.manufacturingCapability ||
          (product.manufacturing_capabilities?.toLowerCase() || "").includes(
            filters.manufacturingCapability.toLowerCase()
          )) &&
        // Search term filter
        (!searchTerm ||
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [products, filters, searchTerm]); // Ensure `products` is added as a dependency

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
