import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Routers from '../routers/Routers';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';

function LayoutContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <Routers />
      {!isAdminRoute && <Footer />}
    </>
  );
}

function Layout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <LayoutContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default Layout;
