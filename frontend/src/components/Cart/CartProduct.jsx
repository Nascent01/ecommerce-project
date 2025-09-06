import React from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import ProductImage from "../Catalog/ProductImage";

const CartProduct = ({ product, updateQuantity, removeFromCart, productImage }) => {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <ProductImage alt={product.name} className="w-20 h-20 object-cover rounded-xl shadow-md" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-indigo-600">
            {Number(product.price * product.quantity).toFixed(2)} €
          </p>

          <div className="flex items-center mt-3">
            <span className="text-sm text-gray-500 mr-3">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-4 py-2 bg-gray-50 font-medium text-gray-900 min-w-[3rem] text-center">
                {product.quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <p className="text-lg font-bold text-gray-900">
            {Number(product.price).toFixed(2)} €
          </p>
          <button
            onClick={() => removeFromCart(product.id)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Remove from cart"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
