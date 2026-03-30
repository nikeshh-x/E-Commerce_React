import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getProductById } from "../data/products";
import { CartContext } from "../context/CartContext";


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart;
  const cartItems = cartContext?.cartItems || [];
  const productInCart = cartItems.find((item) => item.id === product.id);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="page">
        <div className="container">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart?.(product.id)}
            >
              Add to Cart {productInCart ? `(${productInCart.quantity})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
