import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import productImage from "../assets/product-placeholder.jpg";
import { useCart } from "../components/CartProvider";
import api from '../api';
import OrderSubmittedSuccessfully from '../components/Checkout/OrderSubmittedSuccessfully';
import OrderForm from '../components/Checkout/OrderForm';
import ErrorMessage from '../components/Checkout/ErrorMessage';
import OrderInformation from '../components/Checkout/OrderInformation';

export default function Checkout() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      total_amount: total,
      products: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    api.post('/orders', payload)
      .then((res) => {
        setOrder(res.data);
        setIsSubmitted(true);
        setIsSubmitting(false);
        clearCart();
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setError(err.response.data.errors);
        } else {
          setError({ general: 'Something went wrong. Please try again.' });
        }
        setIsSubmitting(false);
      });
  };

  const total = cart.reduce((sum, product) => sum + Number(product.price) * product.quantity, 0);

  if (isSubmitted && order) {
    return <OrderSubmittedSuccessfully order={order} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Please fill in your delivery information</p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <OrderInformation
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            productImage={productImage}
            total={total}
          />

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-indigo-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Delivery Information</h2>
              </div>
           
              {error && (
                <ErrorMessage error={error} />
              )}

              <OrderForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                cart={cart}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}