import { Link } from 'react-router-dom'
import { Leaf, Droplets, Heart, Recycle } from 'lucide-react'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

const values = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Every ingredient is sourced from nature. No synthetic fragrances, no artificial colors, no compromises.',
  },
  {
    icon: Droplets,
    title: 'Cold Process',
    description: 'Traditional cold-process method preserves the integrity of oils and nutrients for maximum skin benefits.',
  },
  {
    icon: Heart,
    title: 'Handcrafted',
    description: 'Each bar is lovingly poured, cut, and cured by hand in small batches for consistent quality.',
  },
  {
    icon: Recycle,
    title: 'Eco Conscious',
    description: 'Plastic-free packaging, biodegradable materials, and sustainable sourcing at every step.',
  },
]

export default function WhyNatural() {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Visual side */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-300 via-sage-400 to-sage-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="font-heading text-8xl md:text-9xl font-bold opacity-20 mb-4">0</div>
                  <div className="font-heading text-3xl md:text-4xl font-semibold">Chemicals</div>
                  <div className="text-white/70 mt-2 text-lg">Forever & Always</div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-8 right-8 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-4 animate-float">
                <span className="text-2xl">🌿</span>
              </div>
              <div className="absolute bottom-12 left-8 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-4 animate-float-reverse">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Content side */}
          <div>
            <ScrollReveal>
              <SectionHeading
                label="Why MayuGlow"
                title="Purity You Can Feel"
                subtitle="We believe skincare should be simple, honest, and rooted in nature."
                align="left"
              />
            </ScrollReveal>

            <StaggerContainer className="space-y-6" staggerDelay={0.12}>
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-sage-100 group-hover:bg-sage-200 flex items-center justify-center shrink-0 transition-colors">
                      <value.icon size={22} className="text-sage-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-sage-900 mb-1">{value.title}</h3>
                      <p className="text-sm text-sage-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.3} className="mt-8">
              <Link to="/about" className="btn-primary inline-flex">
                <span>Learn Our Process</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
