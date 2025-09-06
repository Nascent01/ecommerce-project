import React from 'react'
import { ShoppingCart } from 'lucide-react'

const EmptyCart = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 overflow-hidden">
    <div className="text-center">
      <div className="bg-white rounded-full p-6 mx-auto mb-6 w-24 h-24 flex items-center justify-center shadow-lg">
        <ShoppingCart className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-600">Start shopping to add items to your cart</p>
    </div>
  </div>
);

export default EmptyCart;