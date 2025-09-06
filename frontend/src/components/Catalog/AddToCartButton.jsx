import React from 'react'
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product, addToCart, buttonClassName, iconClassName }) {
    return (
    <div>
     <button
            onClick={() => addToCart(product)}
            className={buttonClassName}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className={iconClassName} />
              <span>Add to Cart</span>
            </div>
          </button>
    </div>
  )
}

