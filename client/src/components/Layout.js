import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#fff",
        borderRight: "1px solid #ddd",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2>SmartStock</h2>

        <p onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          Dashboard
        </p>
        <div
  className="menu-item"
  onClick={() =>
    window.location.href =
      "/order-products"
  }
>

  Order Products

</div>

        <p>Compare Prices</p>
        <p>Watchlist</p>

        <hr />

        <p>Distributors</p>
        <div
  className="menu-item"
  onClick={() =>
    window.location.href =
      "/my-orders"
  }
>

  My Orders

</div>

        <hr />

        <p>Settings</p>

        {/* 🔥 Login / Logout button */}
        <div style={{ marginTop: "auto" }}>
          {token ? (
            <button
              onClick={handleLogout}
              style={btnStyle}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              style={btnStyle}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "20px",
        background: "#f5f6fa"
      }}>
        {children}
      </div>

    </div>
  );
}

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#3B6D11",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Layout;