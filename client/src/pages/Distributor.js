import { useEffect } from "react";
import API from "../api";
import "../distributor.css";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { fetchPrices }
from "../redux/priceSlice";

function Distributor() {

  const dispatch = useDispatch();

  const { prices, loading } =
    useSelector((state) => state.prices);
    console.log(prices);

  const token = localStorage.getItem("token");

  useEffect(() => {

    dispatch(fetchPrices());

  }, [dispatch]);


  // UPDATE PRICE

  const handleUpdate = async (id) => {

    const newPrice =
      prompt("Enter new price");

    if (!newPrice) return;

    try {

      await API.put(
        `/api/prices/${id}`,
        {
          price: newPrice
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Price updated");

      dispatch(fetchPrices());

    } catch (err) {

      alert("Update failed");

    }
  };


  // DELETE PRODUCT

  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/api/prices/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Deleted");

      dispatch(fetchPrices());

    } catch (err) {

      alert("Delete failed");

    }
  };


  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">
          PriceCompare
        </h2>

        <div className="menu-section">

          <p className="menu-title">
            MAIN
          </p>

          <div className="menu-item active">
            Dashboard
          </div>

          <div className="menu-item">
            Compare Prices
          </div>

          <div className="menu-item">
            My Watchlist
          </div>

        </div>

      </div>


      {/* MAIN */}

      <div className="main-content">


        {/* TOP */}

        <div className="top-bar">

          <div>

            <h1>
              Good morning, Distributor
            </h1>

            <p>
              Manage products and distributor prices
            </p>

          </div>

          <div className="top-actions">

            <button className="btn-outline">
              Import CSV
            </button>

            <button
              className="btn-blue"
              onClick={() =>
                window.location.href =
                  "/distributor/add-product"
              }
            >
              + Add Product
            </button>

          </div>

        </div>


        {/* STATS */}

        <div className="stats">

          <div className="stat-card">

            <div className="stat-label">
              Total products
            </div>

            <div className="stat-val">
              {prices.length}
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-label">
              In stock
            </div>

            <div className="stat-val">

              {
                prices.filter(
                  p => p.itemId?.quantity > 10
                ).length
              }

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-label">
              Low stock
            </div>

            <div className="stat-val">

              {
                prices.filter(
                  p => p.itemId?.quantity <= 10
                ).length
              }

            </div>

          </div>

        </div>


        {/* TABLE */}

        <div className="table-wrap">

          <table className="tbl">

            <thead>

              <tr>

                <th>Product</th>
                <th>Your Price</th>
                <th>MRP</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="6">
                    Loading...
                  </td>
                </tr>

              ) : (

                prices.map((p) => (

                  <tr key={p._id}>

                    <td>

                      <div className="prod-name">
                        {p.itemId?.name}
                      </div>

                    </td>

                    <td>
                      ₹{p.price}
                    </td>

                    <td>
                      ₹{p.itemId?.mrp}
                    </td>

                    <td>
                      {p.itemId?.quantity}
                    </td>

                    <td>

                      <span
                        className={
                          p.itemId?.quantity > 10
                            ? "status-pill active"
                            : "status-pill low"
                        }
                      >

                        {
                          p.itemId?.quantity > 10
                            ? "Active"
                            : "Low Stock"
                        }

                      </span>

                    </td>

                    <td>

                      <button
                        className="btn-edit"
                        onClick={() =>
                          handleUpdate(p._id)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn-remove"
                        onClick={() =>
                          handleDelete(p._id)
                        }
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Distributor;