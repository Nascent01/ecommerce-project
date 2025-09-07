import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ total }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-indigo-600">
            {total.toFixed(2)} €
          </span>
        </div>

        <Link to="/checkout">
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer">
            Proceed to Checkout
          </button>
        </Link>

        <Link to="/">
          <button className="w-full mt-3 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-200 cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
