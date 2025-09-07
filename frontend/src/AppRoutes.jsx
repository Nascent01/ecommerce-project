import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { CartProvider } from "./components/CartProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateProduct from "./pages/Admin/CreateProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductListPage from "./pages/Admin/ProductListPage";
import ProductCategoriesPage from "./pages/Admin/ProductCategoriesPage";
import CreateProductCategory from "./pages/Admin/CreateProductCategory";

// Layouts
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import FrontLayout from "./components/Front/FrontLayout";

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Frontend Routes */}
            <Route element={<FrontLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/products/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route 
                path="/login" 
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                } 
              />
            </Route>

            {/* Dashboard and Admin Routes - Combined under one DashboardLayout */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>

            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <DashboardLayout />
                  </AdminRoute>
                </ProtectedRoute>
              }
            >
              <Route path="products" element={<ProductListPage/>} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="products/:slug/edit" element={<CreateProduct />} />
              <Route path="product-categories" element={<ProductCategoriesPage />} />
              <Route path="create-category" element={<CreateProductCategory />} />
              <Route path="categories/:id/edit" element={<CreateProductCategory />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}