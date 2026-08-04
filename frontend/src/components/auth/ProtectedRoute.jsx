import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Flexible Route Guard Wrapper
 * 
 * Props:
 * - allowedRole: "admin" | "user" - enforces specific custom claim role
 * - requireAuth: boolean - requires user to be logged in
 * - requireProfileComplete: boolean - requires address fields on users/{uid} for checkout
 * - publicOnly: boolean - for /login & /signup; if user is authenticated, redirects to role home
 */
export function ProtectedRoute({ 
  children, 
  allowedRole, 
  requireAuth = false, 
  requireProfileComplete = false,
  publicOnly = false 
}) {
  const { currentUser, role, userProfile, loading, isProfileComplete } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 text-sage-800">
        <Loader2 className="w-10 h-10 animate-spin text-sage-600 mb-4" />
        <p className="font-heading text-xl tracking-wide">Loading Mayu Glow...</p>
      </div>
    );
  }

  // 1. If public-only route (/login, /signup) and user is authenticated:
  if (publicOnly && currentUser) {
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // 2. If route requires authentication and user is NOT logged in:
  if ((requireAuth || allowedRole || requireProfileComplete) && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If route requires specific role (e.g., "admin"):
  if (allowedRole && role !== allowedRole) {
    // Non-admin attempting to access /admin/* -> redirect to storefront
    if (allowedRole === 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  // 4. If route requires complete profile (e.g., Checkout gating):
  if (requireProfileComplete && currentUser) {
    if (!isProfileComplete(userProfile)) {
      return <Navigate to="/profile/complete" state={{ from: location }} replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
