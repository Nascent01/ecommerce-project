import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { cart } = useCart();

  const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        E-Commerce
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative group">
          <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalQuantity}
          </span>
        </Link>
         <Link to={user ? "/dashboard" : "/login"}>
          <User className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
        </Link>
      </div>
    </nav>
  );
}
