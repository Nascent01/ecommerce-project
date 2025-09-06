import productImage from '../../assets/product-placeholder.jpg';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../CartProvider';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img
           className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          src={productImage}
          alt={product.name}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
          </h2>
       <p className="text-gray-600 mt-2 font-medium">{product.price} €</p>
        <button onClick={() => addToCart(product)}
          className="mt-4 w-full group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
            <span>Add to Cart</span>
          </div>
      
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
}
