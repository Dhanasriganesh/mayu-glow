import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const CART_STORAGE_KEY = 'mayuglow-cart'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload
      const existingIndex = state.items.findIndex(
        (item) => item.productId === product.id && item.weight === size.weight
      )
      if (existingIndex >= 0) {
        const updated = [...state.items]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return { ...state, items: updated }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: product.id,
            name: product.name,
            slug: product.slug,
            weight: size.weight,
            price: size.price,
            gradient: product.gradient,
            color: product.color,
            quantity: 1,
          },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.productId === action.payload.productId && item.weight === action.payload.weight)
        ),
      }
    case 'UPDATE_QUANTITY': {
      const { productId, weight, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => !(item.productId === productId && item.weight === weight)),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId && item.weight === weight ? { ...item, quantity } : item
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'LOAD_CART':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) })
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product, size) => dispatch({ type: 'ADD_ITEM', payload: { product, size } })
  const removeItem = (productId, weight) => dispatch({ type: 'REMOVE_ITEM', payload: { productId, weight } })
  const updateQuantity = (productId, weight, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, weight, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 499 ? 0 : 49
  const total = subtotal + shipping

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, shipping, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
