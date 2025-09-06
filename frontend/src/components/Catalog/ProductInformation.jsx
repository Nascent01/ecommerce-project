import React from "react";

export default function ProductInformation({ product }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-xl font-semibold text-blue-600">{product.price} €</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {product.categories?.map((cat) => (
          <span
            key={cat.id}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {cat.name}
          </span>
        ))}
      </div>

      <p className="text-gray-700 mt-4">{product.description}</p>
    </div>
  );
}
