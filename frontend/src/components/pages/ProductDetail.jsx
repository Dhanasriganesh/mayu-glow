import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Star, ShoppingBag, Check, ArrowLeft, Minus, Plus, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProductBySlug, getRelatedProducts, flavors } from '../../data/products'
import { useCart } from '../../context/CartContext'
import ProductCard from '../ui/ProductCard'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return <Navigate to="/products" replace />

  const flavorData = product.flavors.map((f) => flavors.find((fl) => fl.id === f)).filter(Boolean)
  const related = getRelatedProducts(product)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 max-w-7xl mx-auto px-5 md:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-sage-500 hover:text-sage-700 transition-colors">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
      </div>

      {/* Product detail */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative aspect-square rounded-3xl overflow-hidden sticky top-28">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} animate-gradient`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-[8rem] md:text-[10rem] drop-shadow-2xl"
                  >
                    {flavorData[0]?.emoji || '🧼'}
                  </motion.span>
                </div>
                {product.bestseller && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-gold-500 text-sage-950 text-xs font-bold tracking-wider uppercase rounded-full">
                    Bestseller
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <div className="flex flex-col">
                {/* Flavor tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {flavorData.map((f) => (
                    <span
                      key={f.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase"
                      style={{ backgroundColor: `${f.color}20`, color: f.color === '#FFF8E7' || f.color === '#F5F5DC' ? '#6B8F71' : f.color }}
                    >
                      {f.emoji} {f.name}
                    </span>
                  ))}
                </div>

                <h1 className="font-heading text-4xl md:text-5xl font-semibold text-sage-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-sage-500 mb-4">{product.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-sage-200'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-sage-700">{product.rating}</span>
                  <span className="text-sm text-sage-400">({product.reviews} reviews)</span>
                </div>

                <p className="text-sage-600 leading-relaxed mb-8">{product.longDescription}</p>

                {/* Size selector */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-sage-500 mb-3">
                    Select Size / Weight
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.weight}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                          selectedSize?.weight === size.weight
                            ? 'bg-sage-700 text-white shadow-md'
                            : 'glass-card !transform-none hover:!transform-none !shadow-none text-sage-700'
                        }`}
                      >
                        <span className="block">{size.weight}</span>
                        <span className={`block text-xs mt-0.5 ${selectedSize?.weight === size.weight ? 'text-white/70' : 'text-sage-400'}`}>
                          ₹{size.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-sage-500 mb-3">Quantity</h3>
                  <div className="inline-flex items-center gap-4 glass-card rounded-xl px-2 py-1 !transform-none hover:!transform-none">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-sage-100 transition-colors"
                    >
                      <Minus size={16} className="text-sage-600" />
                    </button>
                    <span className="w-8 text-center font-medium text-sage-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-sage-100 transition-colors"
                    >
                      <Plus size={16} className="text-sage-600" />
                    </button>
                  </div>
                </div>

                {/* Price & Add to cart */}
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <span className="font-heading text-3xl font-bold text-sage-900">
                      ₹{selectedSize ? selectedSize.price * quantity : 0}
                    </span>
                    {quantity > 1 && selectedSize && (
                      <span className="text-sm text-sage-400 ml-2">
                        (₹{selectedSize.price} each)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={handleAddToCart} className="btn-primary flex-1 min-w-[200px] group">
                    {added ? (
                      <>
                        <Check size={18} />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  <button className="btn-secondary !px-4">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Benefits */}
                <div className="mt-10 pt-8 border-t border-sage-200/50">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-sage-500 mb-4">Benefits</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-sage-600">
                        <Check size={14} className="text-sage-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingredients */}
                <div className="mt-8">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-sage-500 mb-4">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <span key={ing} className="px-3 py-1.5 rounded-full bg-sage-50 text-xs text-sage-600 border border-sage-100">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section-padding bg-gradient-to-b from-cream-50 to-sage-50/30">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-sage-900 mb-10 text-center">
                You May Also Like
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </main>
  )
}
