import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import emptycart from "/src/assets/emptycart.png";
import "./Cart.css"; // Add custom styles here

export const Cart: React.FC = () => {
  const { cart, plusQuantity, minusQuantity } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div className="empty-cart-alert shadow-sm border border-danger p-4 rounded text-center bg-light w-100 max-w-500">
          <img
            src={emptycart}
            alt="Empty Cart"
            className="img-fluid mb-3"
            style={{ maxWidth: "80px" }}
          />
          <h5 className="mb-2 text-danger">Your cart is empty!</h5>
          <p className="mb-0 text-secondary">
            Looks like you haven’t added anything yet.
          </p>
        </div>
      </div>
    );

  return (
    <div className="container py-3">
      <h5 className="text-primary text-center mb-4">My Cart</h5>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-info">
            <tr>
              <th>Item</th>
              <th className="text-center">Image</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.item}</td>
                <td className="text-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      className="img-fluid rounded"
                      style={{ maxWidth: "70px", height: "auto" }}
                      alt={item.item}
                    />
                  ) : (
                    <div className="no-image-box">No Image</div>
                  )}
                </td>
                <td className="text-center">₹{item.price.toFixed(2)}</td>
                <td className="text-center">
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => minusQuantity(item.id)}
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => plusQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-end">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5 className="text-end text-success mt-3">Total: ₹{total.toFixed(2)}</h5>

      <div className="d-flex flex-wrap gap-2 mt-4 justify-content-between">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

        <button
          className="btn btn-warning flex-grow-1"
          onClick={() => navigate("/address")}
        >
          Proceed to Address
        </button>

        <button
          className="btn btn-primary flex-grow-1"
          onClick={() => navigate("/order")}
        >
          Place the Order
        </button>
      </div>
    </div>
  );
};
