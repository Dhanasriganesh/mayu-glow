import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderTree, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Store, 
  LogOut,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

function AdminLayout() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Sales & Analytics', path: '/admin/sales', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 glass-dark text-cream-50 border-r border-white/10 p-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">Mayu Glow</h2>
            <p className="text-xs text-sage-300 font-mono uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>

        {/* Admin User Info */}
        <div className="mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <p className="text-sage-300">Signed in as:</p>
          <p className="font-semibold text-white truncate mt-0.5">{userProfile?.email || 'Admin'}</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-sage-600/60 text-white shadow-sm border border-white/15'
                      : 'text-sage-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-gold-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-sage-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Store className="w-5 h-5" />
            <span>Customer Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden glass-dark text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-gold-400" />
          <span className="font-heading text-lg font-bold">Admin Panel</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/10 text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden glass-dark text-white p-4 space-y-2 border-b border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                    isActive ? 'bg-sage-600/80 text-white' : 'text-sage-300'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-gold-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-sage-300"
            >
              <Store className="w-5 h-5" />
              <span>Customer Storefront</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
