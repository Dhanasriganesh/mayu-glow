import { Star, Quote } from 'lucide-react'
import { testimonials } from '../../data/products'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function Testimonials() {
  return (
    <section className="section-padding relative bg-sage-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-900 via-sage-800 to-sage-950" />
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gold-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-sage-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <SectionHeading
            label="Love Letters"
            title="What Our Customers Say"
            subtitle="Real stories from real people who made the switch to natural."
            light
          />
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.15}>
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="glass-dark rounded-2xl p-6 md:p-8 h-full flex flex-col bg-sage-950/75 backdrop-blur-xl border border-white/10">
                <Quote size={28} className="text-sage-500 mb-4 opacity-50" />
                <p className="text-white/80 leading-relaxed mb-6 flex-1 text-sm md:text-base">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="font-medium text-white text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={12} className="fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    <div className="text-[10px] text-sage-400 tracking-wide uppercase">{t.product}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
