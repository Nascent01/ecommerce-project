import React from 'react';
import { Home, LogOut, ShoppingCart, Package, Settings, Users, ClipboardList } from 'lucide-react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../components/AuthProvider';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: authLogout, user } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    ...(user?.is_admin ? [{ id: 'products', label: 'Products', icon: Package, path: '/admin/products' }] : []),
    ...(user?.is_admin ? [{ id: 'categories', label: 'Categories', icon: ClipboardList, path: '/admin/product-categories' }] : []),
  ];

  const handleNavigation = (item) => {
    if (item.id === 'products' && !user?.is_admin) return;
    navigate(item.path);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout API failed:", error);
    }
    authLogout();
    navigate("/login", { replace: true });
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path.startsWith('/admin/products') || path.startsWith('/admin/create-product')) return 'products';
     if (path.startsWith('/admin/product-categories') || path.startsWith('/admin/create-product-categories')) return 'categories';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to='/'>
                <button className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                  <Home className="w-4 h-4 mr-2" />
                  Homepage
                </button>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;