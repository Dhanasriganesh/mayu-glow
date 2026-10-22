import { Leaf, Droplets, Heart, Recycle, Clock, Award, Users } from 'lucide-react'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'
import CTA from '../home/CTA'

const timeline = [
  { year: '2019', title: 'The Beginning', description: 'MayuGlow started in a small kitchen in Hyderabad, making soaps for family and friends using grandmother\'s recipes.' },
  { year: '2020', title: 'First Launch', description: 'Launched with 8 signature flavors online. Sold out within the first week — a sign we were onto something special.' },
  { year: '2022', title: 'Growing Roots', description: 'Expanded to 30+ flavors and combo packs. Opened our dedicated workshop with a team of 12.' },
  { year: '2024', title: '25K Strong', description: 'Crossed 25,000 happy customers across India. Introduced sustainable packaging and zero-waste initiatives.' },
  { year: '2026', title: 'The Future', description: '50+ flavors, nationwide delivery, and a mission to make natural skincare accessible to every Indian household.' },
]

const process = [
  { step: '01', title: 'Source', description: 'We partner with local farmers and suppliers for the freshest natural ingredients — lavender from Kashmir, turmeric from Erode, neem from rural Maharashtra.' },
  { step: '02', title: 'Formulate', description: 'Each recipe is tested over months. We never use synthetic fragrances, parabens, sulfates, or artificial colors.' },
  { step: '03', title: 'Craft', description: 'Cold-process method at low temperatures preserves the nutrients in our oils. Each batch is hand-poured and hand-cut.' },
  { step: '04', title: 'Cure', description: 'Bars cure for 4-6 weeks, allowing excess water to evaporate and creating a harder, longer-lasting, gentler soap.' },
  { step: '05', title: 'Package', description: 'Plastic-free, biodegradable packaging with seed paper labels. Every box is designed to be as beautiful as the soap inside.' },
]

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-mesh overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <ScrollReveal className="max-w-3xl">
            <span className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-sage-500 mb-4">
              Our Story
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-sage-900 leading-tight mb-6">
              Born from Nature,
              <br />
              <span className="gradient-text">Crafted with Love</span>
            </h1>
            <p className="text-lg md:text-xl text-sage-600 leading-relaxed">
              MayuGlow was born from a simple belief: your skin deserves the purest ingredients nature has to offer. No chemicals. No shortcuts. Just honest, handcrafted goodness.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Our Mission', text: 'To make premium, chemical-free skincare accessible to every Indian household while honoring traditional beauty wisdom.' },
              { icon: Heart, title: 'Our Promise', text: 'Every bar is 100% natural, handcrafted in small batches, and made with ingredients you can pronounce and trust.' },
              { icon: Award, title: 'Our Standard', text: 'We hold ourselves to the highest standards — if we wouldn\'t use it on our own family, we won\'t sell it to you.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-8 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center mx-auto mb-5">
                    <item.icon size={24} className="text-sage-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-sage-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-sage-600 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-b from-sage-50/50 to-cream-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading label="Our Journey" title="The MayuGlow Story" align="center" />
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-sage-200 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block flex-1" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-sage-500 border-4 border-cream-50 -translate-x-1/2 mt-1.5 z-10" />
                  <div className="flex-1 ml-10 md:ml-0">
                    <div className="glass-card rounded-2xl p-6 !transform-none hover:!transform-none">
                      <span className="text-xs font-bold tracking-wider text-gold-500">{item.year}</span>
                      <h3 className="font-heading text-xl font-semibold text-sage-900 mt-1 mb-2">{item.title}</h3>
                      <p className="text-sm text-sage-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading
              label="How We Make It"
              title="From Farm to Your Skin"
              subtitle="Every MayuGlow soap goes through a meticulous 5-step process to ensure the highest quality."
            />
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.1}>
            {process.map((step) => (
              <StaggerItem key={step.step}>
                <div className="glass-card rounded-2xl p-6 md:p-8 h-full group">
                  <span className="font-heading text-5xl font-bold text-sage-100 group-hover:text-sage-200 transition-colors">
                    {step.step}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-sage-900 mt-2 mb-3">{step.title}</h3>
                  <p className="text-sm text-sage-600 leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="section-padding bg-sage-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-900 via-sage-800 to-sage-950" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading
              label="Sustainability"
              title="Good for You, Good for Earth"
              subtitle="We believe beautiful skin shouldn't come at the planet's expense."
              light
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Recycle, title: 'Zero Plastic', description: 'All packaging is plastic-free. We use kraft paper, seed paper labels, and compostable fillers.' },
              { icon: Droplets, title: 'Water Conscious', description: 'Our cold-process method uses minimal water, and our workshop recycles greywater for gardening.' },
              { icon: Users, title: 'Fair Trade', description: 'We pay fair prices to our ingredient suppliers and provide fair wages to our artisan team.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass-dark rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon size={24} className="text-sage-300" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
