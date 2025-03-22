// src/components/ProductCard.js

import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-center mb-4">
        <img
          src={product.company_metadata?.image}
          alt={product.product_name}
          className="w-32 h-32 object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
      <p className="text-sm text-gray-600 mb-2">Price: ${product.price}</p>
      <p className="text-sm text-gray-600 mb-2">{product.contact_data}</p>
      <p className="text-xs text-gray-500 mb-2">
        {product.company_metadata?.min_order && `MOQ: ${product.company_metadata.min_order}`}
      </p>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Chat Now
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Contact Supplier
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProductCard;