import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 6)

  return (
    <section className="section-padding relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            label="Curated For You"
            title="Featured Collection"
            subtitle="Our most loved soaps, handpicked for their exceptional quality and transformative results."
          />
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, i) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="text-center mt-12 md:mt-16">
          <Link to="/products" className="btn-secondary group inline-flex">
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
