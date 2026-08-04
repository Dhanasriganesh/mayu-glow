import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Users, Package, ShoppingBag, FolderTree, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    productCount: 0,
    orderCount: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        const res = await axiosClient.get('/admin/stats/overview');
        setStats(res.data);
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sage-600 text-sm font-semibold tracking-wider uppercase mb-1">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span>Management Console</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-sage-950 font-bold">
          Admin Dashboard
        </h1>
        <p className="text-sage-600 text-sm mt-1">
          Overview of platform users, inventory, orders, and performance metrics (Express API)
        </p>
      </div>

      {/* Headline Stat Cards (Section 7a) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Count Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/70 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-600">Total Users</span>
            <div className="w-10 h-10 rounded-2xl bg-sage-100/80 text-sage-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-sage-700" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-sage-950">
              {loading ? "..." : stats.userCount}
            </h2>
            <p className="text-xs text-sage-500 mt-1">Registered customer accounts</p>
          </div>
        </div>

        {/* Product Count Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/70 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-600">Total Products</span>
            <div className="w-10 h-10 rounded-2xl bg-gold-100/80 text-gold-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5 text-gold-600" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-sage-950">
              {loading ? "..." : stats.productCount}
            </h2>
            <p className="text-xs text-sage-500 mt-1">Active storefront items</p>
          </div>
        </div>

        {/* Orders Count Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/70 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-600">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-sage-950">
              {loading ? "..." : stats.orderCount}
            </h2>
            <p className="text-xs text-sage-500 mt-1">Total customer checkouts</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/70 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-600">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-sage-950">
              {loading ? "..." : `$${(stats.totalRevenue || 0).toFixed(2)}`}
            </h2>
            <p className="text-xs text-sage-500 mt-1">Gross platform sales</p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h2 className="font-heading text-xl font-bold text-sage-950 mb-4">Quick Management Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/categories"
            className="glass-card p-5 rounded-2xl border border-white/70 flex items-center justify-between group hover:border-sage-400"
          >
            <div className="flex items-center gap-3">
              <FolderTree className="w-6 h-6 text-sage-600" />
              <div>
                <h3 className="font-semibold text-sage-900 text-sm">Categories</h3>
                <p className="text-xs text-sage-500">Manage catalog categories</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-sage-400 group-hover:text-sage-800 transition-colors" />
          </Link>

          <Link
            to="/admin/products"
            className="glass-card p-5 rounded-2xl border border-white/70 flex items-center justify-between group hover:border-gold-400"
          >
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-gold-600" />
              <div>
                <h3 className="font-semibold text-sage-900 text-sm">Products & Storage</h3>
                <p className="text-xs text-sage-500">Inventory & image uploads</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-sage-400 group-hover:text-sage-800 transition-colors" />
          </Link>

          <Link
            to="/admin/orders"
            className="glass-card p-5 rounded-2xl border border-white/70 flex items-center justify-between group hover:border-blue-400"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-sage-900 text-sm">Orders</h3>
                <p className="text-xs text-sage-500">Process & update status</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-sage-400 group-hover:text-sage-800 transition-colors" />
          </Link>

          <Link
            to="/admin/sales"
            className="glass-card p-5 rounded-2xl border border-white/70 flex items-center justify-between group hover:border-emerald-400"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="font-semibold text-sage-900 text-sm">Sales Analytics</h3>
                <p className="text-xs text-sage-500">7 / 30 / 90 day rollups</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-sage-400 group-hover:text-sage-800 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
