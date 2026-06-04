import { useNavigate } from "react-router-dom";

function Layout({ children }) {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="layout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">
          SmartStock
        </h2>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          🏠 Dashboard
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/order-products")
          }
        >
          🛒 Order Products
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/cart")
          }
        >
          🛍 Cart
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/my-orders")
          }
        >
          📋 My Orders
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/add-product")
          }
        >
          ➕ Add Product
        </div>

        <hr />

        <div
          className="menu-item"
        >
          📊 Compare Prices
        </div>

        <div
          className="menu-item"
        >
          ⭐ Watchlist
        </div>

        <div
          className="menu-item"
        >
          🚚 Distributors
        </div>

        <div
          className="menu-item"
        >
          ⚙️ Settings
        </div>

        {/* LOGIN / LOGOUT */}

        <div
          style={{
            marginTop: "auto"
          }}
        >

          {token ? (

            <button
              onClick={
                handleLogout
              }
              className="logout-btn"
            >
              Logout
            </button>

          ) : (

            <button
              onClick={() =>
                navigate("/login")
              }
              className="logout-btn"
            >
              Login
            </button>

          )}

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">

        {children}

      </div>

    </div>

  );
}

export default Layout;