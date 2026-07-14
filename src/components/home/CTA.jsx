import { Link } from 'react-router-dom'
import { ArrowRight, Gift } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-600 via-sage-700 to-sage-900 animate-gradient" />
            <div className="absolute inset-0 noise-overlay" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sage-400/20 rounded-full blur-3xl" />

            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <Gift size={14} className="text-gold-400" />
                <span className="text-xs font-medium tracking-wider uppercase text-white/80">
                  Free shipping on orders above ₹499
                </span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight">
                Ready to Glow
                <br />
                <span className="text-gold-400">Naturally?</span>
              </h2>

              <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10">
                Join 25,000+ happy customers who switched to chemical-free, nature-powered skincare.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products" className="btn-gold group inline-flex">
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/products?category=combo" className="btn-secondary !text-white !border-white/30 hover:!bg-white hover:!text-sage-900">
                  Explore Combos
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
