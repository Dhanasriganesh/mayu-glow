import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Cart from '../pages/Cart';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import ProfileComplete from '../pages/ProfileComplete';

import AdminLayout from '../admin/AdminLayout';
import Dashboard from '../admin/Dashboard';
import CategoriesManager from '../admin/CategoriesManager';
import ProductsManager from '../admin/ProductsManager';
import OrdersManager from '../admin/OrdersManager';
import SalesStats from '../admin/SalesStats';

import ProtectedRoute from '../auth/ProtectedRoute';

function Routers() {
  return (
    <Routes>
      {/* Public Storefront Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />

      {/* Public Only Auth Routes (Redirects authenticated users to role home) */}
      <Route
        path="/login"
        element={
          <ProtectedRoute publicOnly>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute publicOnly>
            <Signup />
          </ProtectedRoute>
        }
      />

      {/* Customer Account & Profile Completion Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute requireAuth>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/complete"
        element={
          <ProtectedRoute requireAuth>
            <ProfileComplete />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel Routes (Protected by role === "admin") */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<CategoriesManager />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="orders" element={<OrdersManager />} />
        <Route path="sales" element={<SalesStats />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Routers;
