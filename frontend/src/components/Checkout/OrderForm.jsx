import React from 'react'
import { Lock, Mail, MapPin, Phone, User } from 'lucide-react'
import InputField from './InputField'

export default function OrderForm({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  cart,
  total,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Full Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          icon={<User className="w-4 h-4 inline mr-2" />}
          placeholder="Enter your full name"
        />

        <InputField
          label="Delivery Address *"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          icon={<MapPin className="w-4 h-4 inline mr-2" />}
          placeholder="Enter your delivery address"
        />

        <InputField
          label="Phone Number *"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          icon={<Phone className="w-4 h-4 inline mr-2" />}
          placeholder="+1 (555) 123-4567"
        />

        <InputField
          label="Email Address *"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          icon={<Mail className="w-4 h-4 inline mr-2" />}
          placeholder="example@email.com"
        />

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center text-sm text-gray-600">
            <Lock className="w-4 h-4 mr-2 text-green-600" />
            <span>
              Your data is protected and will not be shared with third parties.
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer ${
            isSubmitting || cart.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing...
            </div>
          ) : (
            `Submit Order (${total.toFixed(2)} €)`
          )}
        </button>

        {cart.length === 0 && (
          <p className="text-center text-red-500 text-sm">
            Add products to cart to continue
          </p>
        )}
      </form>
    </div>
  )
}
