import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [role, setRole] = useState("shop"); // shop or dist
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);


      // redirect based on role
      if (res.data.role === "distributor") {
        navigate("/distributor");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT SIDE */}
      <div style={{
        flex: 1,
        background: "#f5f6fa",
        padding: "40px"
      }}>
        <h2>PriceCompare</h2>

        <h4>Select Role</h4>

        {/* Shopkeeper */}
        <div
          onClick={() => setRole("shop")}
          style={{
            padding: "15px",
            border: role === "shop" ? "2px solid green" : "1px solid #ccc",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          <strong>Shopkeeper</strong>
          <p>Compare prices & manage stock</p>
        </div>

        {/* Distributor */}
        <div
          onClick={() => setRole("dist")}
          style={{
            padding: "15px",
            border: role === "dist" ? "2px solid blue" : "1px solid #ccc",
            cursor: "pointer"
          }}
        >
          <strong>Distributor</strong>
          <p>Manage pricing & catalog</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{
        flex: 1,
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <h2>
          {role === "shop"
            ? "Shopkeeper Login"
            : "Distributor Login"}
        </h2>

        <input
          placeholder="Email"
          style={input}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          style={{
            ...button,
            background: role === "shop" ? "green" : "blue"
          }}
        >
          Login
        </button>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
  <p>
    New user?{" "}
    <Link to="/register" style={{ color: "#3B6D11", fontWeight: "bold" }}>
      Create an account
    </Link>
  </p>
</div>
      </div>
    </div>
  );
}

const input = {
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const button = {
  padding: "10px",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Login;