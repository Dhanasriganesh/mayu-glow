import { Link } from 'react-router-dom'
import { Leaf, Share2, Globe, Mail, MapPin, Phone, Heart } from 'lucide-react'

const footerLinks = {
  shop: [
    { to: '/products', label: 'All Products' },
    { to: '/products?category=single', label: 'Single Flavors' },
    { to: '/products?category=combo', label: 'Combo Packs' },
    { to: '/products?category=bestseller', label: 'Bestsellers' },
  ],
  company: [
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/about#process', label: 'Our Process' },
    { to: '/about#sustainability', label: 'Sustainability' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-sage-950 text-white overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-900 to-sage-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Newsletter CTA */}
        <div className="py-16 md:py-20 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-3xl md:text-4xl font-semibold mb-3">
              Join the MayuGlow Family
            </h3>
            <p className="text-white/60 mb-8 text-sm md:text-base">
              Subscribe for exclusive offers, new flavor launches, and natural skincare tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-sage-400 focus:bg-white/15 transition-all text-sm"
              />
              <button type="submit" className="btn-gold !text-sm whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="font-heading text-2xl font-bold">
                Mayu<span className="text-sage-400">Glow</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Handcrafted, 100% natural, chemical-free soaps inspired by nature&apos;s finest ingredients. Pure goodness for your skin.
            </p>
            <div className="flex gap-3">
              {[Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <Icon size={18} className="text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-400 mb-5">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-400 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-400 mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-sage-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/50">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-sage-400 shrink-0" />
                <a href="mailto:hello@mayuglow.com" className="text-sm text-white/50 hover:text-white transition-colors">
                  hello@mayuglow.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-sage-400 shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-white/50 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} MayuGlow. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> and nature&apos;s finest ingredients
          </p>
        </div>
      </div>
    </footer>
  )
}
