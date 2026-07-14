import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Routers from '../routers/Routers'
import ScrollToTop from './ScrollToTop'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'

function Layout() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routers />
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default Layout
