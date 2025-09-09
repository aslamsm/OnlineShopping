// src/App.tsx
import { CartProvider } from "./components/CartContext";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import OrderPlaced from "./components/OrderPlaced";
import AddressForm from "./components/AddressForm";
import { useCart } from "./components/CartContext";
import logocart from "/logocart.jpg";
import shopcart from "/shopcart.jpg";

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
      className="navbar navbar-expand-lg px-3"
      style={{
        backgroundColor: "#232F3E",
        color: "#FFFFFF",
        fontFamily: "Roboto, sans-serif",
        fontSize: "0.85rem",
        boxShadow: "0 2px 4px rgba(235, 250, 24, 0.97)",
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
          SHANU-Online
        </span>
      </Link>

      {/* Toggle button for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          className="navbar-toggler-icon"
          style={{ filter: "invert(1)" }}
        ></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Navigation Links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row flex-lg-row gap-3">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/cart">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/order">
              Order
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/address">
              Address
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <form
          className="d-flex align-items-center mb-2 mb-lg-0 me-3"
          role="search"
        >
          <input
            type="search"
            placeholder="Search products..."
            className="form-control form-control-sm"
            style={{ width: "200px", fontSize: "0.75rem" }}
          />
          <button
            className="btn btn-warning btn-sm ms-2"
            type="submit"
            style={{ fontSize: "0.75rem", color: "#232F3E" }}
          >
            Search
          </button>
        </form>

        {/* Cart Icon */}
        <Link to="/cart" className="text-white text-decoration-none">
          <div className="position-relative d-flex align-items-center">
            <img
              src={shopcart}
              alt="Cart"
              style={{ width: "25px", height: "20px" }}
            />
            {getTotalQuantity() > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
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
