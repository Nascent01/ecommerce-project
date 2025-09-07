import React from 'react'
import { ShoppingBag } from 'lucide-react'
import CartProduct from '../Cart/CartProduct'

export default function OrderInformation({ cart, updateQuantity, removeFromCart, productImage, total }) {
  return (
    <div>
      <div className="mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <ShoppingBag className="w-6 h-6 text-indigo-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Your Order</h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products in cart</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((product) => (
                     <CartProduct key={product.id} product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart} productImage={productImage} />
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">            
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-indigo-600">{total.toFixed(2)} €</span>
                      </div>
                  </div>
                </>
              )}
            </div>
          </div>
    </div>
  )
}
