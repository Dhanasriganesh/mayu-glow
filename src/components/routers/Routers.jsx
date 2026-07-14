import React from 'react'
import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'
import { Routes, Route } from 'react-router-dom'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default Routers
