import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Leaf, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import ScrollReveal from '../ui/ScrollReveal';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total, clearCart } = useCart();
  const { currentUser, userProfile, isProfileComplete } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setError('');

    // 1. Unauthenticated check
    if (!currentUser) {
      navigate('/login', { state: { from: location } });
      return;
    }

    // 2. Profile completeness check (Section 4)
    if (!isProfileComplete(userProfile)) {
      navigate('/profile/complete', { state: { from: location } });
      return;
    }

    // 3. Process order creation via Express API (POST /api/orders)
    try {
      setCheckingOut(true);

      const orderPayload = {
        items: items.map(item => ({
          productId: item.productId || item.id || `prod_${Date.now()}`,
          name: item.name,
          price: parseFloat(item.price),
          qty: item.quantity || 1
        })),
        total: parseFloat(total)
      };

      const response = await axiosClient.post('/orders', orderPayload);
      
      setOrderSuccess(response.data.id);
      clearCart();
    } catch (err) {
      console.error("Order creation failed:", err);
      setError(err.response?.data?.error || err.message || 'Failed to place order. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4 hero-mesh">
        <div className="glass-card max-w-md w-full p-8 rounded-3xl text-center border border-white/80 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="font-heading text-3xl font-bold text-sage-950 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-sage-600 text-sm mb-4">
            Thank you for your purchase. Your order has been recorded and is now being processed by our team.
          </p>
          <div className="p-3 bg-sage-50 rounded-xl text-xs font-mono text-sage-800 mb-6">
            Order ID: #{orderSuccess}
          </div>
          <Link to="/products" className="btn-primary w-full py-3">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center pt-28 pb-20">
        <ScrollReveal className="text-center px-5">
          <div className="w-24 h-24 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-sage-400" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-sage-900 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-sage-500 mb-8 max-w-md mx-auto">
            Discover our collection of natural, handcrafted soaps and find your perfect match.
          </p>
          <Link to="/products" className="btn-primary inline-flex group">
            <span>Start Shopping</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-sage-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-sage-500 mb-10">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </ScrollReveal>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <ScrollReveal key={`${item.productId || item.id}-${item.weight}`}>
                <div className="glass-card rounded-2xl p-4 md:p-6 !transform-none hover:!transform-none flex gap-4 md:gap-6">
                  {/* Product visual */}
                  <Link to={`/products/${item.slug || item.id}`} className="shrink-0">
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br ${item.gradient || 'from-sage-200 to-gold-200'} flex items-center justify-center overflow-hidden`}>
                      {item.imageUrls?.[0] ? (
                        <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Leaf size={24} className="text-sage-600" />
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.slug || item.id}`}>
                      <h3 className="font-heading text-lg md:text-xl font-semibold text-sage-900 hover:text-sage-600 transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-sage-400 mt-0.5">{item.weight || 'Standard Size'}</p>
                    <p className="text-lg font-semibold text-sage-800 mt-2">${item.price}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeItem(item.productId || item.id, item.weight)}
                      className="p-2 rounded-lg hover:bg-red-50 text-sage-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="inline-flex items-center gap-2 glass rounded-lg px-1">
                      <button
                        onClick={() => updateQuantity(item.productId || item.id, item.weight, item.quantity - 1)}
                        className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-sage-100 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId || item.id, item.weight, item.quantity + 1)}
                        className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-sage-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-sage-400 hover:text-red-500 transition-colors mt-4"
            >
              Clear cart
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="glass-card rounded-2xl p-6 md:p-8 sticky top-28 !transform-none hover:!transform-none">
                <h2 className="font-heading text-2xl font-semibold text-sage-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-500">Subtotal</span>
                    <span className="font-medium text-sage-800">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-500">Shipping</span>
                    <span className="font-medium text-sage-800">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-sage-200/50 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-heading text-xl font-semibold text-sage-900">Total</span>
                    <span className="font-heading text-xl font-bold text-sage-900">${total}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="btn-primary w-full mb-3 py-3.5 shadow-md disabled:opacity-50"
                >
                  <span>{checkingOut ? 'Placing Order...' : 'Proceed to Checkout'}</span>
                </button>
                
                {currentUser && !isProfileComplete(userProfile) && (
                  <p className="text-xs text-amber-600 flex items-center gap-1 mt-2 text-center justify-center">
                    <MapPin className="w-3.5 h-3.5" /> Shipping address required before checkout
                  </p>
                )}

                <Link to="/products" className="btn-secondary w-full text-center block mt-3">
                  Continue Shopping
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
