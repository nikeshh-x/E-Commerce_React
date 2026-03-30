import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";


const ProductCard = ({product}) => {
  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart;
  const cartItems = cartContext?.cartItems || [];
  const productInCart = cartItems.find((item) => item.id === product.id);
  return (
    <div className="product-card" >
      <img
        className="product-card-image"
        src={product.image}
        alt={product.name}
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>

        <div className="product-card-actions">
          <Link className="btn btn-secondary" to={`/product/${product.id}`}>View Details</Link>
          <button
            className="btn btn-primary"
            onClick={() => addToCart?.(product.id)}
            disabled={typeof addToCart !== "function"}
          >
            Add to Cart {productInCart ? `(${productInCart.quantity})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
