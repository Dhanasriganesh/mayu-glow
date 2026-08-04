import { stats } from '../../data/products'
import ScrollReveal from '../ui/ScrollReveal'

export default function StatsBar() {
  return (
    <section className="relative py-12 md:py-16 bg-sage-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sage-900 via-sage-800 to-sage-900 animate-gradient" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm tracking-wider uppercase text-sage-300">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
