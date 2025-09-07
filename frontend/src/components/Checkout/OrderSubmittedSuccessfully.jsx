import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom';

export default function OrderSubmittedSuccessfully({ order }) {
 return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
          <div className="bg-green-100 rounded-full p-6 mx-auto mb-6 w-24 h-24 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you {order.name}, your order #{order.id} has been placed successfully.
          </p>
          <Link to="/" className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 cursor-pointer">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
}
