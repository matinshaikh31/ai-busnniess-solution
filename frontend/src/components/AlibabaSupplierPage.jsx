import React, { useState, useMemo, useEffect } from "react";

import ProductList from "./ProductList";

import Filters from "./Filters";

import SearchBar from "./SearchBar";

import { products } from "../data";

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

  // const [products, setProducts] = useState([]);

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

        console.log("Processing Document:", doc.id, data);

        return {
          id: doc.id,

          product_name: data.name || "Unknown Product",

          price: null, // No price info available

          website: null, // No website info available

          country: data.location || "Unknown",

          contact_data: data.contact || "Not Available",

          manufacturing_capabilities: data.manufacturing_process || "Unknown",

          certifications: data.certifications || [],

          customer_reviews: data.rating ? `${data.rating} stars` : "No reviews",

          industries_served: data.industry ? [data.industry] : [],

          company_metadata: {
            image: "default-image.jpg", // Set a default image path

            min_order: "N/A",
          },

          annual_revenue: null,

          reliability_score: data.rating || 0,
        };
      });

      console.log("Formatted Firestore Data:", formattedProducts);

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
    return products.products.filter((product) => {
      return (
        // Country filter

        (!filters.country || product.country === filters.country) &&
        // Industry filter

        (!filters.industry ||
          product.industries_served.includes(filters.industry)) &&
        // Certification filter

        (!filters.certification ||
          product.certifications.includes(filters.certification)) &&
        // Manufacturing capability filter

        (!filters.manufacturingCapability ||
          product.manufacturing_capabilities

            .toLowerCase()

            .includes(filters.manufacturingCapability.toLowerCase())) &&
        // Search term filter

        (!searchTerm ||
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
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