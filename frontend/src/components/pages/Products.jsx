import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products as initialProducts, categories, flavors } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal'
import axiosClient from '../../api/axiosClient'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [apiProducts, setApiProducts] = useState([])

  const activeCategory = searchParams.get('category') || 'all'
  const activeFlavor = searchParams.get('flavor') || ''

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axiosClient.get('/products');
        if (res.data && res.data.length > 0) {
          setApiProducts(res.data);
        }
      } catch (err) {
        console.warn("Express API products fetch notice (using static catalog fallback if offline):", err.message);
      }
    }
    loadProducts();
  }, []);

  const allProducts = apiProducts.length > 0 ? apiProducts : initialProducts;

  const filtered = useMemo(() => {
    let result = allProducts

    if (activeCategory === 'bestseller') result = result.filter((p) => p.bestseller)
    else if (activeCategory === 'new') result = result.filter((p) => p.new)
    else if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory || p.categoryId === activeCategory)

    if (activeFlavor) result = result.filter((p) => p.flavors?.includes(activeFlavor))

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }

    return result
  }, [activeCategory, activeFlavor, search, allProducts])

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams)
    if (cat === 'all') params.delete('category')
    else params.set('category', cat)
    setSearchParams(params)
  }

  const setFlavor = (flavor) => {
    const params = new URLSearchParams(searchParams)
    if (flavor) params.set('flavor', flavor)
    else params.delete('flavor')
    setSearchParams(params)
  }

  return (
    <main>
      {/* Page Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 hero-mesh overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 text-center">
          <ScrollReveal>
            <SectionHeading
              label="Our Collection"
              title="Shop All Soaps"
              subtitle="Discover handcrafted, chemical-free soaps in every flavor nature offers."
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {/* Filters bar */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400" />
                <input
                  type="text"
                  placeholder="Search flavors, products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-premium !pl-11"
                />
              </div>

              {/* Category pills - desktop */}
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all ${
                      activeCategory === cat.id
                        ? 'bg-sage-700 text-white shadow-md'
                        : 'bg-white/60 text-sage-600 hover:bg-sage-100 border border-sage-200/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm font-medium text-sage-700"
              >
                <SlidersHorizontal size={16} />
                Filters
                {(activeCategory !== 'all' || activeFlavor) && (
                  <span className="w-2 h-2 rounded-full bg-sage-600" />
                )}
              </button>
            </div>
          </ScrollReveal>

          {/* Mobile filters panel */}
          {showFilters && (
            <div className="md:hidden glass-card rounded-2xl p-5 mb-8 space-y-4">
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-sage-500 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        activeCategory === cat.id ? 'bg-sage-700 text-white' : 'bg-sage-100 text-sage-600'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-sage-500 mb-3">Flavor</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFlavor('')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      !activeFlavor ? 'bg-sage-700 text-white' : 'bg-sage-100 text-sage-600'
                    }`}
                  >
                    All
                  </button>
                  {flavors.slice(0, 8).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFlavor(f.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        activeFlavor === f.id ? 'bg-sage-700 text-white' : 'bg-sage-100 text-sage-600'
                      }`}
                    >
                      {f.emoji} {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active filters */}
          {(activeCategory !== 'all' || activeFlavor) && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xs text-sage-500">Active filters:</span>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setCategory('all')}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage-100 text-xs font-medium text-sage-700"
                >
                  {categories.find((c) => c.id === activeCategory)?.label || activeCategory}
                  <X size={12} />
                </button>
              )}
              {activeFlavor && (
                <button
                  onClick={() => setFlavor('')}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage-100 text-xs font-medium text-sage-700"
                >
                  {flavors.find((f) => f.id === activeFlavor)?.name || activeFlavor}
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-sage-500 mb-6">
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filtered.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">🔍</span>
              <h3 className="font-heading text-2xl text-sage-800 mb-2">No products found</h3>
              <p className="text-sage-500 text-sm">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
