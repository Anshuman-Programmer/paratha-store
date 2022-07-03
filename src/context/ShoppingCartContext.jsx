import { createContext, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import callToast from "../utils/toastFuction"
import { useLocalStorage } from "../hooks/useLocalStoage"

const ShoppingCartContext = createContext({})

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}


export const ShoppingCartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", [])

  const cartQuantity = cartItems?.reduce((quantity, item) => item.quantity + quantity,
    0
  )

  const getItemQuantity = (id) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (id) => {
    setCartItems(currItems => {
      if (currItems?.find(item => item.id === id) == null) {
        callToast("Item Added to the Cart")
        return [...currItems, { id, quantity: 1, extras: [] }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            callToast("Quantity Incremented")
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseCartQuantity = (id) => {
    setCartItems(currItems => {
      if (currItems?.find(item => item.id === id)?.quantity === 1) {
        callToast("Item Removed from the Cart")
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            callToast("Quantity Decremented")
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromCart = (id) => {
    callToast("Item Removed from the Cart")
    setCartItems(currItems => currItems?.filter(item => item.id !== id))
  }

  const addExtras = (id, extra) => {
    setCartItems(currItems => currItems.map(item => {
      if (item.id === id) {
        callToast("Extra Added to the Paratha")
        return { ...item, extras: [...item.extras, extra] }
      } else {
        return item
      }
    }))
  }

  const removeExtras = (id, extra) => {
    setCartItems(currItems => currItems.map(item => {
      if (item.id === id) {
        callToast("Extra removed from the Paratha")
        return { ...item, extras: item.extras?.filter(item => item.id !== extra.id) }
      } else {
        return item
      }
    }))
  }


  // eslint-disable-next-line react/react-in-jsx-scope
  return <ShoppingCartContext.Provider value={{
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
    cartQuantity,
    addExtras,
    removeExtras
  }}>
    {children}
  </ShoppingCartContext.Provider>
}

ShoppingCartProvider.propTypes = {
  children: PropTypes.any
}


