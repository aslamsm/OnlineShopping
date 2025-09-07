// src/App.tsx
import { CartProvider } from "./components/CartContext";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import OrderPlaced from "./components/OrderPlaced";
import AddressForm from "./components/AddressForm";
import { useCart } from "./components/CartContext";
import logocart from "/src/assets/logocart.jpg";
import shopcart from "/src/assets/shopcart.jpg";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Slider from "./components/Slider";

const NavbarWithCart = () => {
  const { getTotalQuantity } = useCart();

  return (
    <nav
      className="navbar px-4 py-0"
      style={{
        backgroundColor: "#232F3E",
        color: "#FFFFFF",
        fontFamily: "Roboto, sans-serif",
        fontSize: "0.85rem",
        boxShadow: "0 2px 4px rgba(235, 250, 24, 0.97)",
        height: "45px",
      }}
    >
      <Link
        className="navbar-brand text-white d-flex align-items-center"
        to="/home"
      >
        <img
          src={logocart}
          alt="Logo"
          style={{ width: "50px", height: "30px", marginRight: "10px" }}
        />
        <span className="fw-bold fs-6" style={{ color: "#f8e40fff" }}>
          ShanuBazaar
        </span>
      </Link>

      <div className="navbar-nav ms-4 d-flex flex-row gap-3">
        <Link className="nav-link text-white" to="/home">
          Home
        </Link>

        <Link className="nav-link text-white" to="/products">
          Products
        </Link>
        <Link className="nav-link text-white" to="/cart">
          Cart
        </Link>
        <Link className="nav-link text-white" to="/order">
          Order
        </Link>
        <Link className="nav-link text-white" to="/address">
          Address
        </Link>
      </div>

      <div className="ms-auto me-3 d-flex align-items-center">
        <input
          type="text"
          placeholder="Search products..."
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            fontSize: "0.7rem",
            width: "250px",
            height: "25px",
          }}
        />
        <button
          style={{
            marginLeft: "8px",
            padding: "4px 10px",
            backgroundColor: "#FF9900",
            border: "none",
            borderRadius: "4px",
            color: "#232F3E",
            fontSize: "0.7rem",
          }}
        >
          Search
        </button>
      </div>

      <div>
        <Link to="/cart" className="text-white text-decoration-none">
          <div className="position-relative d-flex align-items-center">
            <img
              src={shopcart}
              alt="Cart"
              style={{ width: "25px", height: "20px" }}
            />

            {getTotalQuantity() > 0 && (
              <span
                className="position-absulate translate-middle badge rounded-pill bg-warning text-dark"
                style={{ fontSize: "0.75rem", fontWeight: "bold" }}
              >
                {getTotalQuantity()}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <NavbarWithCart />
      {/* Show Slider only on home page */}
      {(location.pathname === "/" || location.pathname === "/home") && (
        <Slider />
      )}
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/order" element={<OrderPlaced />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
