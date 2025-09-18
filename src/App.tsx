// src/App.tsx
import { CartProvider } from "./components/CartContext";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import OrderPlaced from "./components/OrderPlaced";
import AddressForm from "./components/AddressForm";
import { useCart } from "./components/CartContext";
import logocart from "/logocart.jpg";
import shopcart from "/shopcart.jpg";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Slider from "./components/Slider";

// Custom CSS styles
const navbarStyles = `
  .navbar-hover-link {
    transition: background-color 0.2s ease-in-out;
  }
  .navbar-hover-link:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  .search-btn:hover {
    background-color: #ff9900 !important;
  }
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const NavbarWithCart = () => {
  const { getTotalQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: navbarStyles }} />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {isMenuOpen && (
        <div className="mobile-menu-overlay d-lg-none" onClick={closeMenu} />
      )}

      <nav
        className="navbar navbar-expand-lg px-2 px-md-3 position-sticky top-0"
        style={{
          backgroundColor: "#232F3E",
          color: "#FFFFFF",
          fontFamily: "Roboto, sans-serif",
          fontSize: "0.85rem",
          boxShadow: "0 2px 4px rgba(235, 250, 24, 0.97)",
          minHeight: "60px",
          zIndex: 1001,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand text-white d-flex align-items-center flex-shrink-0"
            to="/"
            style={{ minWidth: "120px" }}
          >
            <img
              src={logocart}
              alt="Logo"
              style={{
                width: "75px",
                height: "50px",
                marginRight: "5px",
                objectFit: "fill",
              }}
            />
            <span
              className="fw-bold d-none d-sm-inline"
              style={{ color: "#f8e40fff", fontSize: "0.9rem" }}
            >
              SHANU-Online
            </span>
          </Link>

          <div className="d-none d-md-flex align-items-center gap-4 ms-1">
            <Link className="nav-link text-white navbar-hover-link" to="/">
              Home
            </Link>
            <Link
              className="nav-link text-white navbar-hover-link"
              to="/products"
            >
              Products
            </Link>
            <Link className="nav-link text-white navbar-hover-link" to="/order">
              Orders
            </Link>
            <Link
              className="nav-link text-white navbar-hover-link"
              to="/address"
            >
              Address
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="d-none d-lg-flex align-items-center">
            <form
              className="d-flex"
              role="search"
              style={{ maxWidth: "600px" }}
            >
              <div className="input-group">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="form-control"
                  style={{
                    fontSize: "0.9rem",
                    border: "none",
                    borderRadius: "4px 0 0 4px",
                    minWidth: "350px",
                  }}
                />
                <button
                  className="btn btn-warning search-btn"
                  type="submit"
                  style={{
                    fontSize: "0.9rem",
                    color: "#232F3E",
                    border: "none",
                    borderRadius: "0 4px 4px 0",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            <button
              className="btn btn-link text-white p-1 d-lg-none border-0"
              onClick={toggleSearch}
              style={{ fontSize: "1.2rem" }}
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>

            <Link
              to="/cart"
              className="text-white text-decoration-none px-1"
              style={{ minWidth: "40px" }}
            >
              <div className="position-relative d-flex align-items-center justify-content-center">
                <img
                  src={shopcart}
                  alt="Cart"
                  style={{ width: "24px", height: "20px" }}
                />
                {getTotalQuantity() > 0 && (
                  <span
                    className="position-absolute badge rounded-pill bg-warning text-dark"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      top: "-8px",
                      right: "-15px",
                      minWidth: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getTotalQuantity() > 99 ? "99+" : getTotalQuantity()}
                  </span>
                )}
                <div className="d-none d-md-block ms-1">
                  <div style={{ fontSize: "0.7rem", lineHeight: "0.8" }}>
                    Cart
                  </div>
                </div>
              </div>
            </Link>

            <button
              className="btn btn-link text-white p-1 d-lg-none border-0"
              onClick={toggleMenu}
              style={{ fontSize: "1.2rem" }}
              type="button"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      {isSearchExpanded && (
        <div
          className="d-lg-none position-sticky top-0"
          style={{
            backgroundColor: "#232F3E",
            borderTop: "1px solid #3a4553",
            padding: "10px 15px",
            zIndex: 1001,
          }}
        >
          <form className="d-flex" role="search">
            <div className="input-group">
              <input
                type="search"
                placeholder="Search products..."
                className="form-control"
                style={{ fontSize: "0.9rem", border: "none" }}
                autoFocus
              />
              <button
                className="btn btn-warning search-btn"
                type="submit"
                style={{ fontSize: "0.9rem", color: "#232F3E", border: "none" }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="d-lg-none position-sticky top-0"
          style={{
            backgroundColor: "#232F3E",
            borderTop: "1px solid #3a4553",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1001,
          }}
        >
          <div className="container-fluid py-2">
            <div className="d-flex flex-column gap-2">
              <Link className="nav-link text-white" to="/" onClick={closeMenu}>
                <i className="fas fa-home me-2"></i>Home
              </Link>
              <Link
                className="nav-link text-white"
                to="/products"
                onClick={closeMenu}
              >
                <i className="fas fa-box me-2"></i>Products
              </Link>
              <Link
                className="nav-link text-white"
                to="/order"
                onClick={closeMenu}
              >
                <i className="fas fa-receipt me-2"></i>Orders
              </Link>
              <Link
                className="nav-link text-white"
                to="/address"
                onClick={closeMenu}
              >
                <i className="fas fa-map-marker-alt me-2"></i>Address
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AppContent = () => {
  return (
    <>
      <NavbarWithCart />

      <Routes>
        {/* Home page with slider and products */}
        <Route
          path="/"
          element={
            <>
              <Slider />
              <ProductList />
            </>
          }
        />
        {/* Optional /home route with same layout */}
        <Route
          path="/home"
          element={
            <>
              <Slider />
              <ProductList />
            </>
          }
        />
        {/* Other pages */}
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
