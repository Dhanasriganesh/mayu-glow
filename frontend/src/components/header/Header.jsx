import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf, User, ShieldCheck, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { currentUser, userProfile, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/75 backdrop-blur-xl border-b border-white/50 shadow-lg shadow-sage-900/5 py-3'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold text-sage-900 tracking-tight">
                Mayu<span className="text-sage-500">Glow</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-colors line-reveal ${
                  location.pathname === link.to
                    ? 'text-sage-700 font-semibold'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-sage-100/80 transition-colors group"
              title="Shopping Cart"
            >
              <ShoppingBag size={22} className="text-sage-700 group-hover:text-sage-900 transition-colors" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sage-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* User Auth Buttons (Desktop) */}
            {currentUser ? (
              <div className="hidden md:flex items-center gap-2">
                {role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gold-100 text-sage-900 text-xs font-bold hover:bg-gold-200 transition-colors border border-gold-300"
                    title="Admin Panel"
                  >
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    <span>Admin Panel</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sage-100/80 text-sage-800 text-xs font-semibold hover:bg-sage-200 transition-colors"
                  title="My Profile"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate max-w-[100px]">
                    {userProfile?.firstName || 'Account'}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-50 text-sage-500 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-sage-700 hover:text-sage-900 transition-colors"
                >
                  Log In
                </Link>
                <Link to="/signup" className="btn-primary text-xs !py-2.5 !px-5">
                  <span>Sign Up</span>
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-sage-100/80 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-sage-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-sage-950/40 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white/80 backdrop-blur-xl border-l border-white/50 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-sage-200/30">
                <span className="font-heading text-xl font-bold text-sage-900">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-sage-100/50">
                  <X size={22} className="text-sage-700" />
                </button>
              </div>

              <nav className="flex-1 p-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                        location.pathname === link.to
                          ? 'bg-sage-100 text-sage-800'
                          : 'text-sage-600 hover:bg-sage-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Options */}
                {currentUser ? (
                  <div className="pt-4 border-t border-sage-200/40 mt-4 space-y-2">
                    {role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-100 text-sage-900 font-semibold text-sm"
                      >
                        <ShieldCheck className="w-5 h-5 text-gold-600" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sage-100 text-sage-800 font-medium text-sm"
                    >
                      <User className="w-5 h-5" />
                      <span>Account Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium text-sm text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-sage-200/40 mt-4 space-y-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sage-100 text-sage-800 font-medium text-sm"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Log In</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-primary w-full text-center"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
