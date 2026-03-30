import { createContext, useState } from "react";
import { getProductById } from "../data/products";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    const existing = cartItems.find((item) => item.id === productId);
    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map((items) => ({
        ...items,
        product: getProductById(items.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  }
  function updateCartItemQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId ? { id: productId, quantity } : item,
      );
      setCartItems(updatedCartItems);
    }
  }
  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
        const product = getProductById(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  } 
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateCartItemQuantity,
        getCartTotal,
        clearCart

      }}
    >
      {children}
    </CartContext.Provider>
  );
}
