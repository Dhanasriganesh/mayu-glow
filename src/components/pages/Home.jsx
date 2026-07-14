import Hero from '../home/Hero'
import StatsBar from '../home/StatsBar'
import FeaturedProducts from '../home/FeaturedProducts'
import FlavorShowcase from '../home/FlavorShowcase'
import WhyNatural from '../home/WhyNatural'
import Testimonials from '../home/Testimonials'
import CTA from '../home/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <FeaturedProducts />
      <FlavorShowcase />
      <WhyNatural />
      <Testimonials />
      <CTA />
    </main>
  )
}
