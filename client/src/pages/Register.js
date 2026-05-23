import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("shopkeeper");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { ...form, role }
      );

      alert("Registered successfully");
      navigate("/login");

    } catch (err) {
      alert("Error registering");
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
        <h2>Select Role</h2>

        <div onClick={() => setRole("shopkeeper")} style={card(role==="shopkeeper","green")}>
          Shopkeeper
        </div>

        <div onClick={() => setRole("distributor")} style={card(role==="distributor","blue")}>
          Distributor
        </div>

        <div onClick={() => setRole("admin")} style={card(role==="admin","black")}>
          Admin
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
        <h2>{role.toUpperCase()} Registration</h2>

        <input
          placeholder="Name"
          style={input}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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
          onClick={handleRegister}
          style={{
            ...button,
            background:
              role === "shopkeeper"
                ? "green"
                : role === "distributor"
                ? "blue"
                : "black"
          }}
        >
          Register
        </button>
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

const card = (active, color) => ({
  padding: "15px",
  margin: "10px 0",
  border: active ? `2px solid ${color}` : "1px solid #ccc",
  cursor: "pointer"
});

export default Register;