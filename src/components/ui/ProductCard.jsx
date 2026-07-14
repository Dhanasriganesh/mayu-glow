import { Link } from 'react-router-dom'
import { Star, ShoppingBag } from 'lucide-react'
import { flavors } from '../../data/products'

export default function ProductCard({ product, index = 0 }) {
  const flavorData = product.flavors.map((f) => flavors.find((fl) => fl.id === f)).filter(Boolean)
  const minPrice = Math.min(...product.sizes.map((s) => s.price))

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group product-glow block"
    >
      <div className="glass-card rounded-2xl overflow-hidden bg-white/60 backdrop-blur-lg border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image area */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} animate-gradient`} />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

          {/* Floating emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-7xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">
              {flavorData[0]?.emoji || '🧼'}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.bestseller && (
              <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-gold-500/90 text-sage-950 rounded-full backdrop-blur-sm">
                Bestseller
              </span>
            )}
            {product.new && (
              <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-sage-600/90 text-white rounded-full backdrop-blur-sm">
                New
              </span>
            )}
            {product.category === 'combo' && (
              <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-white/80 text-sage-800 rounded-full backdrop-blur-sm">
                Combo Pack
              </span>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <div className="bg-white/75 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-sage-800 shadow-sm">
              <ShoppingBag size={16} />
              View Details
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Flavor tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {flavorData.slice(0, 3).map((f) => (
              <span
                key={f.id}
                className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${f.color}25`, color: f.color === '#FFF8E7' || f.color === '#F5F5DC' ? '#6B8F71' : f.color }}
              >
                {f.name}
              </span>
            ))}
            {flavorData.length > 3 && (
              <span className="text-[10px] font-medium text-sage-400 px-2 py-0.5">
                +{flavorData.length - 3}
              </span>
            )}
          </div>

          <h3 className="font-heading text-xl md:text-2xl font-semibold text-sage-900 mb-1 group-hover:text-sage-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-sage-500 mb-4 line-clamp-2">{product.tagline}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold text-sage-800">₹{minPrice}</span>
              {product.sizes.length > 1 && (
                <span className="text-xs text-sage-400 ml-1">onwards</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-gold-500 text-gold-500" />
              <span className="text-sm font-medium text-sage-700">{product.rating}</span>
              <span className="text-xs text-sage-400">({product.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
