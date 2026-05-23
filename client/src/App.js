import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ComparePrices from "./pages/ComparePrices";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Distributor from "./pages/Distributor";
import "./App.css";
import Register from "./pages/Register";
import OrderProducts from "./pages/OrderProducts";
import AddProduct from "./pages/AddProduct";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* auto redirect */}
        <Route path="/"element={ token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route
  path="/distributor/add-product"
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>
<Route
  path="/compare"
  element={
    <ProtectedRoute>
      <ComparePrices />
    </ProtectedRoute>
  }
/>
        <Route
          path="/distributor"
          element={
            <ProtectedRoute>
              <Distributor />
            </ProtectedRoute>
          }
        />
        <Route
  path="/order-products"
  element={
    <ProtectedRoute>
      <OrderProducts />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;