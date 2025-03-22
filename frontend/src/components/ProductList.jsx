import React from "react";
import { FaStar, FaShoppingCart, FaCertificate, FaGlobe, FaIndustry } from "react-icons/fa";

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-medium text-gray-700">No products match your filters</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
        >
          {/* Product Image Placeholder */}
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              {product.product_name} Image
            </div>
          </div>
          
          {/* Product Details */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 text-gray-800 truncate">{product.product_name}</h3>
            
            <div className="flex items-center mb-2">
              <FaGlobe className="text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">{product.country}</span>
            </div>
            
            {/* Price and Min Order */}
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold text-orange-600">${product.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500">Min order: {product.company_metadata.min_order}</div>
            </div>
            
            {/* Reviews */}
            <div className="flex items-center mb-3 text-sm">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(parseFloat(product.customer_reviews.split(' ')[0])) ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-600">{product.customer_reviews.split(' | ')[1]}</span>
            </div>
            
            {/* Industry and Certifications */}
            <div className="mb-3">
              <div className="flex items-center mb-1">
                <FaIndustry className="text-green-500 mr-1" />
                <span className="text-sm text-gray-600">{product.industries_served.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <FaCertificate className="text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">{product.certifications.join(", ")}</span>
              </div>
            </div>
            
            {/* Manufacturing Capabilities */}
            <div className="text-sm text-gray-600 mb-3">
              <strong>Capabilities:</strong> {product.manufacturing_capabilities}
            </div>
            
            {/* Contact Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
              <FaShoppingCart className="mr-2" />
              Contact Supplier
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;