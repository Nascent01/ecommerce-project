import React from "react";
import { useCart } from "../components/CartProvider";
import productImage from "../assets/product-placeholder.jpg";
import CartProduct from "../components/Cart/CartProduct";
import EmptyCart from "../components/Cart/EmptyCart";
import OrderSummary from "../components/Cart/OrderSummary";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) return <EmptyCart />;

  const total = cart.reduce((sum, product) => sum + Number(product.price) * product.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>     
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((product, index) => (
                 <CartProduct key={product.id} product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart} productImage={productImage} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <OrderSummary total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}