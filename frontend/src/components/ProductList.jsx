import React from "react";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg shadow-md">
          <img src={product.company_metadata?.image} alt={product.product_name} className="w-full h-40 object-cover rounded-md mb-2" />
          <h3 className="text-lg font-semibold">{product.product_name}</h3>
          <p className="text-sm text-gray-600">{product.industries_served}</p>
          <p className="text-sm text-gray-800">Price: ${product.price.toFixed(2)}</p>
          <a href={product.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Product
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
