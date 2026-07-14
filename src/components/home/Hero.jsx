import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-mesh overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sage-300/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-200/10 rounded-full blur-3xl" style={{ background: 'rgba(184, 169, 201, 0.08)' }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-20 md:pt-40 md:pb-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/50 mb-8">
                <Sparkles size={14} className="text-gold-500" />
                <span className="text-xs font-medium tracking-wider uppercase text-sage-600">
                  100% Natural · Chemical Free
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-sage-900 mb-6"
            >
              Nature&apos;s
              <br />
              <span className="gradient-text">Purest</span>
              <br />
              Embrace
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-sage-600 leading-relaxed max-w-lg mb-10"
            >
              Handcrafted soaps infused with lavender, moringa, sunnipindi, and 50+ nature-inspired flavors. Zero chemicals. Pure glow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="btn-primary group">
                <span>Explore Collection</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Our Story
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-sage-200/50"
            >
              {['Handmade', 'Eco-Friendly', 'Cruelty Free', 'Vegan'].map((badge) => (
                <span key={badge} className="text-xs font-medium tracking-wider uppercase text-sage-500">
                  ✦ {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main soap display */}
              <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-sage-200/40 via-cream-100 to-gold-200/30 backdrop-blur-sm border border-white/50 shadow-xl flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-sage-400 via-sage-500 to-sage-700 shadow-2xl shadow-sage-500/30 animate-float flex items-center justify-center">
                    <span className="text-7xl">🧼</span>
                  </div>
                  {/* Orbiting mini soaps */}
                  {[
                    { emoji: '🌸', color: 'from-[#B8A9C9] to-[#9B8AB8]', delay: '0s', pos: 'top-0 -right-16' },
                    { emoji: '🍊', color: 'from-[#F4A261] to-[#E76F51]', delay: '1s', pos: '-bottom-8 -left-12' },
                    { emoji: '🌿', color: 'from-[#6B8F71] to-[#4A6B4E]', delay: '2s', pos: 'top-1/2 -right-20' },
                    { emoji: '✨', color: 'from-[#E8B84A] to-[#D4A030]', delay: '0.5s', pos: '-top-12 left-1/4' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`absolute ${item.pos} w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center animate-float`}
                      style={{ animationDelay: item.delay }}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-sage-200/30 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-sage-300/20 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-sage-400">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-sage-400 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
