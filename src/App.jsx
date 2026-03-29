import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import AuthProvider from './context/AuthContext';
import ProductCard from './components/ProductCard';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <AuthProvider>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
    </AuthProvider>
  );
};

export default App;
