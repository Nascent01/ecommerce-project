import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import CreateProduct from "./pages/CreateProduct";
import { CartProvider } from "./components/CartProvider";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";

function AppRoutes() {
  return (
   <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default AppRoutes;