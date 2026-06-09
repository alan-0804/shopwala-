import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ComparePrices from "./pages/ComparePrices";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Distributor from "./pages/Distributor";
import "./App.css";
import Products from "./pages/Products";
import Register from "./pages/Register";
import OrderProducts from "./pages/OrderProducts";
import AddProduct from "./pages/AddProduct";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import DistributorOrders from "./pages/DistributorOrders";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
function App() {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTO REDIRECT */}

        <Route
          path="/"
          element={

            token

              ? (

                role ===
                "distributor"

                  ? (
                    <Navigate
                      to="/distributor"
                    />
                  )

                  : (
                    <Navigate
                      to="/dashboard"
                    />
                  )

              )

              : (
                <Navigate
                  to="/login"
                />
              )

          }
        />

        {/* AUTH */}

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        {/* SHOPKEEPER */}

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute
              role="shopkeeper"
            >

              <Dashboard />

            </ProtectedRoute>

          }
        />

        <Route
          path="/compare"
          element={

            <ProtectedRoute
              role="shopkeeper"
            >

              <ComparePrices />

            </ProtectedRoute>

          }
        />

        <Route
          path="/order-products"
          element={

            <ProtectedRoute
              role="shopkeeper"
            >

              <OrderProducts />

            </ProtectedRoute>

          }
        />

        <Route
          path="/my-orders"
          element={

            <ProtectedRoute
              role="shopkeeper"
            >

              <MyOrders />

            </ProtectedRoute>

          }
        />

        <Route
          path="/cart"
          element={

            <ProtectedRoute
              role="shopkeeper"
            >

              <Cart />

            </ProtectedRoute>

          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="shopkeeper">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute role="shopkeeper">
              <EditProfile />
            </ProtectedRoute>
          }
        />
        {/* DISTRIBUTOR */}

        <Route
          path="/distributor"
          element={

            <ProtectedRoute
              role="distributor"
            >

              <Distributor />

            </ProtectedRoute>

          }
        />

        <Route
          path="/distributor/add-product"
          element={

            <ProtectedRoute
              role="distributor"
            >

              <AddProduct />

            </ProtectedRoute>

          }
        />

        <Route
          path="/distributor-orders"
          element={

            <ProtectedRoute
              role="distributor"
            >

              <DistributorOrders />

            </ProtectedRoute>

          }
        />

        <Route
          path="/products"
          element={

            <ProtectedRoute
              role="distributor"
            >

              <Products />

            </ProtectedRoute>

          }
        />
      <Route
  path="/distributor/profile"
  element={

    <ProtectedRoute
      role="distributor"
    >

      <Profile />

    </ProtectedRoute>

  }
/>
      </Routes>

    </BrowserRouter>

  );
}

export default App;