import { useNavigate } from "react-router-dom";

function DistributorLayout({ children }) {

  const navigate = useNavigate();

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
            navigate("/distributor")
          }
        >
          📊 Dashboard
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/distributor/add-product")
          }
        >
          ➕ Add Product
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/distributor-orders")
          }
        >
          🚚 Orders
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/products")
          }
        >
          📦 Products
        </div>

        <div
          className="menu-item"
        >
          📈 Analytics
        </div>

        <div
          className="menu-item"
        >
          ⚙ Settings
        </div>
        <div
  className="menu-item"
  onClick={() =>
    navigate("/distributor/profile")
  }
>
  👤 Profile
</div>


          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        <div
          style={{
            marginTop: "auto"
          }}
        >

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">

        {children}

      </div>

    </div>

  );

}

export default DistributorLayout;